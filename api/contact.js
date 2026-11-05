// Recon Brief contact form endpoint (Vercel serverless function, Node runtime, ES module).
// Sends an enquiry notification to support@reconbrief.in and a confirmation to the visitor
// through the Zoho CPaaS Email API. The API key is read from the environment only.
import { createHash, randomUUID } from 'node:crypto';

const CFG = () => ({
  url: process.env.ZOHO_CPAAS_API_URL || 'https://cpaas.zoho.in/v1.1/email',
  key: process.env.ZOHO_CPAAS_API_KEY || '',
  from: process.env.CONTACT_FROM_EMAIL || 'support@reconbrief.in',
  to: process.env.CONTACT_TO_EMAIL || 'support@reconbrief.in',
});

const ENQUIRY_TYPES = ['General Enquiry', 'Product Support', 'Business Enquiry', 'Partnership', 'Feedback', 'Other'];
const MAX_BODY_BYTES = 20 * 1024;
const ZOHO_TIMEOUT_MS = 10000;
const HONEYPOT_FIELD = 'hp_company_site';
const MIN_FILL_MS = 2500; // a person cannot read and complete this form faster than this

// ---------- small helpers ----------
const log = (event, data = {}) => console.log(JSON.stringify({ svc: 'contact', event, ...data })); // never log PII or secrets

function send(res, status, body, extra = {}) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  for (const [k, v] of Object.entries(extra)) res.setHeader(k, v);
  res.end(JSON.stringify(body));
}

// strip control characters; single-line fields also lose line breaks (blocks header injection)
function clean(v, max, singleLine) {
  if (typeof v !== 'string') return '';
  let s = v.normalize('NFC').replace(/\u0000/g, '');
  s = singleLine ? s.replace(/[\u0000-\u001F\u007F\u2028\u2029]+/g, ' ') : s.replace(/\r\n?/g, '\n').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '');
  return s.trim().slice(0, max);
}
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
const headerName = (s) => s.replace(/["<>\\]/g, '').slice(0, 100) || 'Visitor';
const isEmail = (s) => s.length <= 254 && /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+$/.test(s) && !s.includes('..');
const sha = (s) => createHash('sha256').update(s).digest('hex').slice(0, 32);

// ---------- origin / CORS ----------
function allowedOrigins() {
  const set = new Set(['https://www.reconbrief.in', 'https://reconbrief.in']);
  for (const o of (process.env.CONTACT_ALLOWED_ORIGINS || '').split(',')) if (o.trim()) set.add(o.trim());
  for (const h of [process.env.VERCEL_URL, process.env.VERCEL_BRANCH_URL]) if (h) set.add('https://' + h);
  if (process.env.VERCEL_ENV !== 'production') { set.add('http://localhost:3000'); set.add('http://localhost:5173'); set.add('http://127.0.0.1:3000'); }
  return set;
}

// ---------- rate limiting: shared (Upstash/Vercel KV REST) when configured, per-instance fallback ----------
const memory = new Map();
function memoryHit(key, limit, windowSec) {
  const now = Date.now();
  const arr = (memory.get(key) || []).filter((t) => now - t < windowSec * 1000);
  arr.push(now); memory.set(key, arr);
  if (memory.size > 5000) for (const [k, v] of memory) if (!v.some((t) => now - t < 3600e3)) memory.delete(k);
  return arr.length <= limit;
}
async function sharedHit(key, limit, windowSec) {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null; // not configured
  const r = await fetch(url.replace(/\/$/, '') + '/pipeline', {
    method: 'POST', headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' },
    body: JSON.stringify([['INCR', key], ['EXPIRE', key, windowSec, 'NX']]), signal: AbortSignal.timeout(3000),
  });
  if (!r.ok) throw new Error('rate store ' + r.status);
  const out = await r.json();
  return Number(out?.[0]?.result) <= limit;
}
async function allow(key, limit, windowSec) {
  try {
    const shared = await sharedHit(key, limit, windowSec);
    if (shared !== null) return shared;
  } catch (e) { log('rate_store_error', { msg: String(e.message || e).slice(0, 80) }); }
  return memoryHit(key, limit, windowSec); // fallback only; shared storage is the real protection on serverless
}

// ---------- Zoho CPaaS ----------
async function zohoSend(payload) {
  const { url, key } = CFG();
  if (!key) { const e = new Error('not_configured'); e.code = 'not_configured'; throw e; }

  const startedAt = Date.now();
  const r = await fetch(url, {
    method: 'POST',
    headers: { Authorization: 'Zoho-enczapikey ' + key, 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload), signal: AbortSignal.timeout(ZOHO_TIMEOUT_MS),
  });

  // Read the response once, then safely extract diagnostic fields. Never log the
  // request payload, API key, visitor email, or message content.
  const raw = await r.text();
  let body = null;
  try { body = raw ? JSON.parse(raw) : null; } catch { /* Zoho may return non-JSON text */ }

  const firstData = Array.isArray(body?.data) ? body.data[0] : body?.data;
  const messageValue = body?.message || body?.error || body?.error_message ||
    firstData?.message || firstData?.error || firstData?.error_message ||
    (typeof body?.data === 'string' ? body.data : '');
  const codeValue = firstData?.code || firstData?.error_code || body?.code || body?.error_code || '';
  const requestIdValue = body?.request_id || body?.requestId || body?.data?.request_id || '';
  const message = typeof messageValue === 'string' ? messageValue.slice(0, 400) : JSON.stringify(messageValue).slice(0, 400);
  const code = String(codeValue || '').slice(0, 100);
  const ok = r.ok && body && String(body.message || '').toLowerCase() !== 'error' && !body.error && !firstData?.error;

  return {
    ok: Boolean(ok),
    status: r.status,
    requestId: String(requestIdValue || '').slice(0, 120),
    code,
    message,
    contentType: r.headers.get('content-type') || '',
    responsePreview: body ? '' : raw.slice(0, 300).replace(/[\r\n\t]+/g, ' '),
    durationMs: Date.now() - startedAt,
    endpointHost: new URL(url).host,
    endpointPath: new URL(url).pathname,
  };
}

const person = (address, name) => ({ email_address: { address, name: headerName(name) } });

function notificationMail(c, f, requestId) {
  const rows = [['Name', f.name], ['Email', f.email], ['Enquiry type', f.type], ['Subject', f.subject], ['Message', f.message],
    ['Privacy consent', 'Yes. The visitor ticked: "' + f.consentText + '"'], ['Consent sent by browser at', f.consentAt || 'not provided'],
    ['Received by server at', f.receivedAt], ['Privacy notice', f.privacyUrl || 'not provided'], ['Request ID', requestId]];
  const html = '<div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#14232B;max-width:640px"><h2 style="margin:0 0 12px">New website enquiry</h2><table style="border-collapse:collapse;width:100%">'
    + rows.map(([k, v]) => `<tr><td style="padding:8px 12px 8px 0;border-top:1px solid #e3e0d8;vertical-align:top;white-space:nowrap;color:#5c6d77">${esc(k)}</td><td style="padding:8px 0;border-top:1px solid #e3e0d8;white-space:pre-wrap">${esc(v)}</td></tr>`).join('')
    + '</table><p style="color:#5c6d77;margin-top:16px">Reply to this email to answer the visitor directly.</p></div>';
  const text = 'New website enquiry\n\n' + rows.map(([k, v]) => `${k}: ${v}`).join('\n') + '\n\nReply to this email to answer the visitor directly.';
  return { from: { address: c.from, name: 'Recon Brief Website Enquiry' }, to: [person(c.to, 'Recon Brief Support')], reply_to: [{ address: f.email, name: headerName(f.name) }],
    subject: 'New Website Enquiry \u2013 Recon Brief', htmlbody: html, textbody: text, client_reference: 'contact-' + requestId, track_opens: false, track_clicks: false };
}

function confirmationMail(c, f, requestId) {
  const text = 'Hello,\n\nThank you for contacting Recon Brief.\n\nWe have successfully received your message. Our team will review your enquiry and get back to you as soon as possible.\n\nRegards,\nTeam Recon Brief\nsupport@reconbrief.in';
  const html = '<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#14232B;max-width:560px"><p>Hello,</p><p>Thank you for contacting Recon Brief.</p><p>We have successfully received your message. Our team will review your enquiry and get back to you as soon as possible.</p><p>Regards,<br>Team Recon Brief<br>support@reconbrief.in</p></div>';
  return { from: { address: c.from, name: 'Recon Brief' }, to: [person(f.email, f.name)], subject: 'We received your enquiry \u2013 Recon Brief',
    htmlbody: html, textbody: text, client_reference: 'confirm-' + requestId, track_opens: false, track_clicks: false };
}

// ---------- request parsing ----------
async function readJson(req) {
  let body = req.body;
  if (body === undefined || body === null) { // no platform body parser: read the stream with a hard cap
    const chunks = []; let size = 0;
    for await (const ch of req) { size += ch.length; if (size > MAX_BODY_BYTES) { const e = new Error('too_large'); e.code = 413; throw e; } chunks.push(ch); }
    body = Buffer.concat(chunks).toString('utf8');
  }
  if (Buffer.isBuffer(body)) body = body.toString('utf8');
  if (typeof body === 'string') { if (Buffer.byteLength(body) > MAX_BODY_BYTES) { const e = new Error('too_large'); e.code = 413; throw e; } try { body = JSON.parse(body); } catch { const e = new Error('bad_json'); e.code = 400; throw e; } }
  if (!body || typeof body !== 'object' || Array.isArray(body)) { const e = new Error('bad_json'); e.code = 400; throw e; }
  if (Buffer.byteLength(JSON.stringify(body)) > MAX_BODY_BYTES) { const e = new Error('too_large'); e.code = 413; throw e; }
  return body;
}

function validate(b) {
  // fields are cleaned with a little headroom, then rejected (never silently cut) if they exceed their limit
  const f = {
    name: clean(b.name, 101, true), email: clean(b.email, 255, true).toLowerCase(), subject: clean(b.subject, 151, true),
    type: clean(b.type, 40, true), message: clean(b.message, 5001, false),
    consentText: clean(b.consent_text, 600, true), consentAt: clean(b.consent_at, 40, true), privacyUrl: clean(b.privacy_notice_url, 200, true),
    receivedAt: new Date().toISOString(),
  };
  const errors = {};
  if (f.name.length < 2 || f.name.length > 100) errors.name = 'Enter your full name (up to 100 characters).';
  if (!isEmail(f.email)) errors.email = 'Enter a valid email address.';
  if (f.subject.length < 3 || f.subject.length > 150) errors.subject = 'Enter a subject (up to 150 characters).';
  if (!ENQUIRY_TYPES.includes(f.type)) errors.type = 'Choose an enquiry type.';
  if (f.message.length < 10 || f.message.length > 5000) errors.message = 'Write a message of 10 to 5000 characters.';
  if (b.consent !== true || f.consentText.length < 10) errors.consent = 'Privacy consent is required.';
  if (f.consentAt && Number.isNaN(Date.parse(f.consentAt))) f.consentAt = '';
  return { f, errors };
}

// ---------- handler ----------
export default async function handler(req, res) {
  const requestId = randomUUID().slice(0, 8);
  const origin = req.headers?.origin;
  const allowedSet = allowedOrigins();
  if (origin && allowedSet.has(origin)) { res.setHeader('Access-Control-Allow-Origin', origin); res.setHeader('Vary', 'Origin'); }

  if (req.method === 'OPTIONS') {
    if (origin && !allowedSet.has(origin)) return send(res, 403, { ok: false, error: 'forbidden' });
    res.statusCode = 204; res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS'); res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); res.setHeader('Access-Control-Max-Age', '600'); res.setHeader('Cache-Control', 'no-store');
    return res.end();
  }
  if (req.method !== 'POST') return send(res, 405, { ok: false, error: 'method_not_allowed' }, { Allow: 'POST, OPTIONS' });
  if (origin && !allowedSet.has(origin)) { log('origin_rejected', { requestId }); return send(res, 403, { ok: false, error: 'forbidden' }); }
  if (!String(req.headers?.['content-type'] || '').toLowerCase().includes('application/json')) return send(res, 415, { ok: false, error: 'unsupported_media_type' });
  if (Number(req.headers?.['content-length'] || 0) > MAX_BODY_BYTES) return send(res, 413, { ok: false, error: 'too_large' });

  let body;
  try { body = await readJson(req); } catch (e) { return send(res, e.code === 413 ? 413 : 400, { ok: false, error: e.code === 413 ? 'too_large' : 'bad_request' }); }

  // spam: honeypot and impossible fill speed
  const filledAt = Number(body.ts);
  if (clean(String(body[HONEYPOT_FIELD] ?? ''), 200, true) !== '' || (Number.isFinite(filledAt) && filledAt > 0 && Date.now() - filledAt < MIN_FILL_MS)) {
    log('spam_rejected', { requestId }); return send(res, 400, { ok: false, error: 'rejected' });
  }

  const { f, errors } = validate(body);
  if (Object.keys(errors).length) { log('validation_failed', { requestId, fields: Object.keys(errors) }); return send(res, 400, { ok: false, error: 'invalid', fields: errors }); }

  // rate limits (hashed identifiers only)
  const ip = String(req.headers?.['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown').split(',')[0].trim();
  const ipKey = sha(ip), emailKey = sha(f.email);
  const okIp = await allow(`rb:contact:ip10m:${ipKey}`, 5, 600) && await allow(`rb:contact:ip1d:${ipKey}`, 20, 86400);
  const okEmail = okIp && await allow(`rb:contact:em1h:${emailKey}`, 3, 3600);
  if (!okIp || !okEmail) { log('rate_limited', { requestId }); return send(res, 429, { ok: false, error: 'rate_limited' }, { 'Retry-After': '600' }); }

  const cfg = CFG();
  // 1. internal enquiry notification: this decides success or failure for the visitor
  try {
    const r = await zohoSend(notificationMail(cfg, f, requestId));
    if (!r.ok) { log('notify_failed', { requestId, status: r.status, zohoCode: r.code, zohoMessage: r.message, zohoRequestId: r.requestId, contentType: r.contentType, responsePreview: r.responsePreview, durationMs: r.durationMs, endpointHost: r.endpointHost, endpointPath: r.endpointPath }); return send(res, 502, { ok: false, error: 'send_failed', requestId }); }
    log('notify_sent', { requestId, zohoRequestId: r.requestId });
  } catch (e) {
    log(e.code === 'not_configured' ? 'not_configured' : 'notify_error', { requestId, msg: e.code === 'not_configured' ? 'ZOHO_CPAAS_API_KEY missing' : String(e.name || 'error') });
    return send(res, e.code === 'not_configured' ? 503 : 502, { ok: false, error: e.code === 'not_configured' ? 'unavailable' : 'send_failed' });
  }
  // 2. visitor confirmation: independent; a failure here never turns the enquiry into a failure
  try {
    const r = await zohoSend(confirmationMail(cfg, f, requestId));
    log(r.ok ? 'confirm_sent' : 'confirm_failed', { requestId, status: r.status, zohoCode: r.code, zohoMessage: r.message, zohoRequestId: r.requestId, durationMs: r.durationMs });
  } catch (e) { log('confirm_error', { requestId, msg: String(e.name || 'error') }); }

  return send(res, 200, { ok: true });
}
