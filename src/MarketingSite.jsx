import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  BookOpenCheck,
  Check,
  ChevronDown,
  FileDown,
  FileSearch,
  Globe2,
  Layers3,
  Menu,
  Network,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  X,
} from "lucide-react";
import "./MarketingSite.css";

const appUrl = "https://recon-brief.vercel.app/";

const capabilities = [
  { icon: <FileSearch size={19} />, number: "01", title: "AI-powered research", description: "Research companies and competitors using current sources." },
  { icon: <Network size={19} />, number: "02", title: "Competitive landscape", description: "Understand positioning, strengths, weaknesses and market pressure." },
  { icon: <ShieldCheck size={19} />, number: "03", title: "Evidence & citations", description: "Trace important findings back to supporting sources." },
  { icon: <Target size={19} />, number: "04", title: "SWOT intelligence", description: "Turn research into structured strategic analysis." },
  { icon: <BarChart3 size={19} />, number: "05", title: "Competitive scoring", description: "Compare companies across meaningful dimensions." },
  { icon: <FileDown size={19} />, number: "06", title: "Exportable reports", description: "Turn completed intelligence into professional Word/PDF reports." },
];

const workflow = [
  { number: "01", icon: <Target size={18} />, title: "Define", description: "Choose your target company, competitors and objective." },
  { number: "02", icon: <Search size={18} />, title: "Research", description: "Recon Brief gathers and researches relevant sources." },
  { number: "03", icon: <Sparkles size={18} />, title: "Analyze", description: "AI structures the evidence into competitive intelligence." },
  { number: "04", icon: <TrendingUp size={18} />, title: "Decide", description: "Use the resulting brief to understand the market and act." },
];

const advantages = [
  { icon: <Layers3 size={18} />, title: "Research + analysis", description: "More than a chatbot response: a structured research workflow." },
  { icon: <ShieldCheck size={18} />, title: "Evidence-backed", description: "Important claims connect to research sources for review." },
  { icon: <BarChart3 size={18} />, title: "Multiple intelligence depths", description: "Choose Quick, Standard, Analyst Deep Dive or Executive Brief." },
  { icon: <FileDown size={18} />, title: "Export-ready", description: "Take completed intelligence into Word and PDF workflows." },
];

const audiences = ["Marketing teams", "Sales teams", "Business development", "Founders", "Strategy teams", "Researchers"];

const faqs = [
  { question: "What is Recon Brief?", answer: "Recon Brief is an AI-powered competitive intelligence and market research tool. It researches companies and competitors, organizes findings and creates structured briefs to support business decisions." },
  { question: "How does competitive research work?", answer: "Set a target company, competitors and a research objective. Recon Brief gathers relevant public information, analyzes the evidence and organizes the findings into a report." },
  { question: "Where does the research come from?", answer: "Research is based on relevant public sources. Findings are presented with supporting evidence so you can review the context behind them." },
  { question: "What is the difference between the report modes?", answer: "Quick Brief, Standard Brief, Analyst Deep Dive and Executive Brief provide different levels of depth and detail for different research needs." },
  { question: "Can I export my report?", answer: "Recon Brief is designed to produce reports for Word and PDF workflows. Available export options are shown in the product." },
  { question: "Can I research multiple competitors?", answer: "Yes. You can include multiple competitors in an analysis and compare their positioning, capabilities and market signals." },
];

const navigation = [["About", "about"], ["How It Works", "how-it-works"], ["Features", "features"], ["Demo", "demo"]];

function Brand({ footer = false }) {
  return (
    <a className={`brand${footer ? " brand-footer" : ""}`} href="#top" aria-label="Recon Brief home">
      <span className="brand-mark" aria-hidden="true">
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 6.5h13.3c6.7 0 10.7 3.6 10.7 9.1 0 4.4-2.4 7.5-6.8 8.8L33 34H24l-5.8-8.7h-1.1V34H9V6.5Zm8.1 6.8v5.4h5c2 0 3-.9 3-2.7s-1-2.7-3-2.7h-5Z" fill="currentColor" />
          <path d="M5 31h7" stroke="currentColor" strokeWidth="2" />
        </svg>
      </span>
      <span className="brand-name">RECON BRIEF</span>
    </a>
  );
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <div className="nav-wrap">
        <Brand />
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}
        </nav>
        <div className="nav-actions">
          <a className="button button-small button-light nav-launch" href={appUrl} target="_blank" rel="noreferrer">Launch Recon <ArrowUpRight size={15} /></a>
          <button className="mobile-menu-toggle" type="button" aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {menuOpen && <nav className="mobile-nav" aria-label="Mobile navigation">
        {navigation.map(([label, id]) => <a key={id} href={`#${id}`} onClick={closeMenu}>{label}</a>)}
        <a className="mobile-nav-cta" href={appUrl} target="_blank" rel="noreferrer" onClick={closeMenu}>Launch Recon <ArrowUpRight size={15} /></a>
      </nav>}
    </header>
  );
}

function ReconBuilderPreview() {
  const competitors = [["A", "Adidas"], ["P", "Puma"], ["N", "New Balance"], ["U", "Under Armour"]];
  return (
    <div className="builder-window" aria-label="Example Recon Brief analysis setup">
      <div className="window-topbar">
        <div className="window-brand"><span className="window-brand-mark">R</span> RECON BRIEF</div>
        <div className="window-top-meta"><span className="window-dot" /> NEW ANALYSIS</div>
        <span className="window-step">01 <i>/</i> 03</span>
      </div>
      <div className="builder-body">
        <div className="builder-heading">
          <div><span className="micro-label">ANALYSIS WORKSPACE</span><h2>Build your Recon</h2></div>
          <span className="builder-ready"><span /> Ready to configure</span>
        </div>
        <div className="builder-fields">
          <div className="builder-field target-field">
            <span className="field-label">TARGET COMPANY</span>
            <div className="field-value"><span className="nike-mark">N</span> Nike <ChevronDown size={15} /></div>
          </div>
          <div className="builder-field competitors-field">
            <span className="field-label">COMPETITORS <span className="field-count">04</span></span>
            <div className="competitor-list">{competitors.map(([initial, name]) => <span className="competitor-chip" key={name}><i>{initial}</i>{name}<Check size={12} /></span>)}</div>
          </div>
          <div className="builder-field objective-field">
            <span className="field-label">PRIMARY OBJECTIVE</span>
            <div className="field-value">Competitive positioning <ChevronDown size={15} /></div>
          </div>
          <div className="builder-field mode-field">
            <span className="field-label">REPORT MODE</span>
            <div className="field-value">Analyst Deep Dive <ChevronDown size={15} /></div>
          </div>
        </div>
        <div className="builder-footer">
          <div className="builder-footer-note"><ShieldCheck size={15} /><span>Evidence-backed research<br /><b>Built for clear decisions</b></span></div>
          <a className="button button-primary" href={appUrl} target="_blank" rel="noreferrer">Run Recon <ArrowRight size={16} /></a>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-atmosphere" aria-hidden="true" />
      <div className="hero-content">
        <div className="eyebrow"><span className="eyebrow-line" />COMPETITIVE INTELLIGENCE PLATFORM</div>
        <h1>Know your competitors.<br /><span>Before they move.</span></h1>
        <p>Recon Brief researches companies, maps competitors, validates evidence and turns scattered market signals into a structured intelligence brief.</p>
        <div className="hero-actions">
          <a className="button button-primary" href={appUrl} target="_blank" rel="noreferrer">Start a Recon <ArrowRight size={17} /></a>
          <a className="button button-quiet" href="#how-it-works">See How It Works <ArrowRight size={16} /></a>
        </div>
      </div>
      <div className="builder-stage reveal"><ReconBuilderPreview /></div>
      <div className="hero-footnote"><span>01 / RESEARCH</span><span>02 / ANALYSIS</span><span>03 / INTELLIGENCE</span></div>
    </section>
  );
}

function SignalStrip() {
  const signals = ["LIVE SOURCES", "COMPETITOR INTELLIGENCE", "EVIDENCE-BACKED", "AI-ASSISTED", "EXPORT READY"];
  return <section className="signal-strip" aria-label="Recon Brief capabilities"><span className="signal-strip-title">SIGNAL, NOT NOISE</span><div className="signal-strip-items">{signals.map((signal) => <span key={signal}><i />{signal}</span>)}</div></section>;
}

function ProblemSection() {
  return (
    <section className="section problem-section" id="about">
      <div className="section-heading section-heading-split reveal">
        <div><div className="eyebrow"><span className="eyebrow-line" />THE RESEARCH GAP</div><h2>Competitive research<br />shouldn’t feel like <span>detective work.</span></h2></div>
        <div className="section-intro"><p>Information is everywhere — competitor websites, reports, news, product pages, market data and scattered signals.</p><p>Recon Brief brings those signals together and turns them into structured intelligence.</p></div>
      </div>
      <div className="signal-flow reveal">
        <div className="signal-sources"><span className="flow-label">SCATTERED SIGNALS</span>
          <div className="source-item"><Globe2 size={16} /><span>Company websites</span><i>PUBLIC</i></div>
          <div className="source-item"><FileSearch size={16} /><span>Reports & news</span><i>RESEARCH</i></div>
          <div className="source-item"><BarChart3 size={16} /><span>Market indicators</span><i>DATA</i></div>
          <div className="source-item"><Layers3 size={16} /><span>Product signals</span><i>OFFERING</i></div>
        </div>
        <div className="flow-connector" aria-hidden="true"><span /><span /><span /><ArrowRight size={18} /></div>
        <div className="signal-output">
          <div className="output-heading"><span className="output-icon"><BookOpenCheck size={17} /></span><div><span className="flow-label">STRUCTURED INTELLIGENCE</span><strong>One decision-ready brief</strong></div><span className="output-status"><i /> ORGANIZED</span></div>
          <div className="output-line"><span>Competitive position</span><i><b style={{ width: "82%" }} /></i></div>
          <div className="output-line"><span>Market signals</span><i><b style={{ width: "67%" }} /></i></div>
          <div className="output-line"><span>Evidence map</span><i><b style={{ width: "91%" }} /></i></div>
          <div className="output-bottom"><span><ShieldCheck size={14} /> Source-linked findings</span><span>READY TO REVIEW <ArrowUpRight size={13} /></span></div>
        </div>
      </div>
    </section>
  );
}

function Capabilities() {
  return (
    <section className="section capabilities-section" id="features">
      <div className="section-heading reveal"><div className="eyebrow"><span className="eyebrow-line" />BUILT FOR THE FULL PICTURE</div><h2>Research that gets<br /><span>to the point.</span></h2><p>From the first source to a finished report, every step has a purpose.</p></div>
      <div className="capability-grid">{capabilities.map((item) => <article className="capability-card reveal" key={item.number}>
        <div className="capability-top"><span className="capability-icon">{item.icon}</span><span className="capability-number">{item.number}</span></div>
        <div><h3>{item.title}</h3><p>{item.description}</p></div><ArrowUpRight className="capability-arrow" size={17} />
      </article>)}</div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="section workflow-section" id="how-it-works">
      <div className="workflow-heading reveal"><div><div className="eyebrow"><span className="eyebrow-line" />A CLEARER WAY FORWARD</div><h2>From question<br />to <span>competitive clarity.</span></h2></div><p>A considered workflow that turns research into a useful next move.</p></div>
      <div className="workflow-grid">{workflow.map((step, index) => <article className="workflow-step reveal" key={step.number} style={{ "--step-index": index }}>
        <div className="workflow-step-top"><span>{step.number}</span><span className="workflow-icon">{step.icon}</span></div><h3>{step.title}</h3><p>{step.description}</p>{index < workflow.length - 1 && <ArrowRight className="workflow-arrow" size={16} />}
      </article>)}</div>
    </section>
  );
}

function Score({ label, value }) {
  return <div className="report-score"><div><span>{label}</span><strong>{value}</strong></div><i><b style={{ width: `${value}%` }} /></i></div>;
}

function ReportPreview() {
  const competitorScores = [["Adidas", "78"], ["Puma", "64"], ["New Balance", "59"]];
  return (
    <section className="section demo-section" id="demo">
      <div className="demo-heading reveal"><div><div className="eyebrow"><span className="eyebrow-line" />A LOOK INSIDE</div><h2>Intelligence you<br />can <span>put to work.</span></h2></div><p>A sample of the structured view behind every Recon. Illustrative example data.</p></div>
      <div className="report-window reveal">
        <aside className="report-rail">
          <div className="report-rail-brand"><span>R</span><b>RECON<br />BRIEF</b></div>
          <div className="report-rail-nav"><span className="rail-active"><i />Overview</span><span>Landscape</span><span>Competitors</span><span>Evidence</span><span>Strategic signals</span></div>
          <div className="report-rail-foot"><span>REPORT MODE</span><b>ANALYST DEEP DIVE</b></div>
        </aside>
        <div className="report-content">
          <div className="report-header"><div><span className="report-id">RECON / 001 <i>·</i> EXAMPLE DATA</span><h3>Market landscape</h3><p>Target company <strong>Nike</strong><span className="report-divider">/</span> Competitive positioning</p></div><span className="report-export"><FileDown size={14} /> EXPORT</span></div>
          <div className="report-score-grid"><Score label="Brand position" value={86} /><Score label="Market presence" value={74} /><Score label="Digital reach" value={68} /><Score label="Competitive pressure" value={57} /></div>
          <div className="report-panels">
            <article className="report-panel report-swot"><div className="report-panel-head"><span>SWOT SNAPSHOT</span><ArrowUpRight size={14} /></div><div className="swot-grid"><div><i>S</i><span>Strength</span><b>Brand equity</b></div><div><i>W</i><span>Watch</span><b>Category pressure</b></div><div><i>O</i><span>Opportunity</span><b>Digital momentum</b></div><div><i>T</i><span>Threat</span><b>Fast challengers</b></div></div></article>
            <article className="report-panel report-competitors"><div className="report-panel-head"><span>COMPETITOR COMPARISON</span><span className="sample-note">SAMPLE</span></div>{competitorScores.map(([name, score]) => <div className="competitor-score" key={name}><span>{name}</span><i><b style={{ width: `${score}%` }} /></i><strong>{score}</strong></div>)}</article>
            <article className="report-panel report-evidence"><div className="report-panel-head"><span>EVIDENCE</span><span className="evidence-count"><ShieldCheck size={13} /> SOURCE-LINKED</span></div><div className="evidence-item"><span className="evidence-icon"><Globe2 size={14} /></span><div><b>Company & product signals</b><small>Public web research <i>↗</i></small></div><span className="evidence-type">PRIMARY</span></div><div className="evidence-item"><span className="evidence-icon"><FileSearch size={14} /></span><div><b>Market coverage</b><small>Industry reporting <i>↗</i></small></div><span className="evidence-type">CONTEXT</span></div></article>
            <article className="report-panel report-signals"><div className="report-panel-head"><span>STRATEGIC SIGNALS</span><span className="signal-strength">3 OBSERVATIONS</span></div><div className="strategic-signal"><i /><span>Positioning remains a key comparison dimension</span></div><div className="strategic-signal"><i /><span>Digital reach merits closer review</span></div><div className="strategic-signal"><i /><span>Track shifts across the competitor set</span></div></article>
          </div>
          <div className="report-disclaimer">Illustrative report preview. Scores and observations shown are sample data.</div>
        </div>
      </div>
    </section>
  );
}

function WhyRecon() {
  return (
    <section className="section why-section"><div className="why-heading reveal"><div className="eyebrow"><span className="eyebrow-line" />WHY RECON BRIEF</div><h2>From information overload<br />to <span>competitive clarity.</span></h2></div>
      <div className="advantage-grid">{advantages.map((item, index) => <article className="advantage-item reveal" key={item.title} style={{ "--item-index": index }}><span className="advantage-icon">{item.icon}</span><div><h3>{item.title}</h3><p>{item.description}</p></div><span className="advantage-index">0{index + 1}</span></article>)}</div>
    </section>
  );
}

function AudienceSection() {
  return <section className="section audience-section"><div className="audience-heading reveal"><div className="eyebrow"><span className="eyebrow-line" />BUILT FOR PEOPLE WHO NEED TO KNOW</div><h2>Make the next conversation<br /><span>more informed.</span></h2></div>
    <div className="audience-list reveal">{audiences.map((audience, index) => <div className="audience-item" key={audience}><span>0{index + 1}</span><b>{audience}</b><ArrowUpRight size={16} /></div>)}</div>
  </section>;
}

function FAQ() {
  return <section className="section faq-section"><div className="faq-heading reveal"><div className="eyebrow"><span className="eyebrow-line" />GOOD TO KNOW</div><h2>Questions, <span>answered.</span></h2><p>A little more context before you start your first Recon.</p></div>
    <div className="faq-list reveal">{faqs.map((item, index) => <details className="faq-item" key={item.question} open={index === 0}><summary><span className="faq-number">0{index + 1}</span><span>{item.question}</span><ChevronDown size={18} /></summary><p>{item.answer}</p></details>)}</div>
  </section>;
}

function FinalCTA() {
  return <section className="final-cta reveal"><div className="cta-light" aria-hidden="true" /><div className="cta-content"><div className="eyebrow"><span className="eyebrow-line" />YOUR NEXT MOVE STARTS HERE</div><h2>Know the market.<br />Know the competition.<br /><span>Make the next move.</span></h2><p>Turn scattered competitive information into structured intelligence with Recon Brief.</p><a className="button button-primary" href={appUrl} target="_blank" rel="noreferrer">Start a Recon <ArrowRight size={17} /></a></div><div className="cta-index">RECON BRIEF <span>INTELLIGENCE, IN FOCUS</span></div></section>;
}

function Footer() {
  return <footer className="site-footer"><div className="footer-main"><div className="footer-about"><Brand footer /><p>Structured, evidence-backed competitive intelligence for your next decision.</p></div><div className="footer-links"><div><span className="footer-label">EXPLORE</span>{navigation.map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}</div><div><span className="footer-label">PRODUCT</span><a href={appUrl} target="_blank" rel="noreferrer">Launch Recon <ArrowUpRight size={14} /></a></div></div></div><div className="footer-bottom"><span>© 2026 Recon Brief</span><span>MARKETS <i>·</i> COMPETITORS <i>·</i> OPPORTUNITIES</span><a href="#top">BACK TO TOP ↑</a></div></footer>;
}

function MarketingSite() {
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return undefined;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return <div className="site-shell"><Navbar /><main><Hero /><SignalStrip /><ProblemSection /><Capabilities /><HowItWorks /><ReportPreview /><WhyRecon /><AudienceSection /><FAQ /><FinalCTA /></main><Footer /></div>;
}

export default MarketingSite;
