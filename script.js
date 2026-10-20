
const header=document.querySelector('[data-header]');
const menuToggle=document.querySelector('.menu-toggle');
const mobileNav=document.querySelector('.mobile-nav');
const revealItems=document.querySelectorAll('.reveal');

function setHeader(){header?.classList.toggle('scrolled',window.scrollY>18)}
window.addEventListener('scroll',setHeader,{passive:true});setHeader();

menuToggle?.addEventListener('click',()=>{
  const open=mobileNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded',String(open));
});
mobileNav?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{
  mobileNav.classList.remove('open');menuToggle?.setAttribute('aria-expanded','false');
}));

const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.isIntersecting){entry.target.classList.add('is-visible');revealObserver.unobserve(entry.target)}
}),{threshold:.16,rootMargin:'0px 0px -40px'});
revealItems.forEach(item=>revealObserver.observe(item));

const stages=[
  {index:'01',title:'A sharper question',callout:'Your question becomes a research brief.',progress:'20%'},
  {index:'02',title:'A wider source field',callout:'Recon searches across the evidence base.',progress:'40%'},
  {index:'03',title:'A traceable evidence chain',callout:'Claims stay connected to what supports them.',progress:'60%'},
  {index:'04',title:'A defensible point of view',callout:'Signals become patterns, gaps, and implications.',progress:'80%'},
  {index:'05',title:'A decision-ready report',callout:'The work becomes clear enough to share.',progress:'100%'}
];
const stageIndex=document.getElementById('stage-index');const stageTitle=document.getElementById('stage-title');const stageCallout=document.getElementById('stage-callout');const stageProgress=document.getElementById('stage-progress');
function setStage(index){
  const stage=stages[index];
  document.querySelectorAll('.workflow-step').forEach((button,i)=>{const active=i===index;button.classList.toggle('active',active);button.setAttribute('aria-selected',String(active))});
  [stageIndex,stageTitle,stageCallout].forEach(el=>{if(el){el.animate([{opacity:0,transform:'translateY(5px)'},{opacity:1,transform:'none'}],{duration:320,easing:'cubic-bezier(.16,1,.3,1)'});}});
  if(stageIndex)stageIndex.textContent=stage.index;if(stageTitle)stageTitle.textContent=stage.title;if(stageCallout)stageCallout.textContent=stage.callout;if(stageProgress)stageProgress.style.width=stage.progress;
}
document.querySelectorAll('.workflow-step').forEach(button=>button.addEventListener('click',()=>setStage(Number(button.dataset.stage))));
let autoStage=0;setInterval(()=>{if(document.visibilityState==='visible'){autoStage=(autoStage+1)%stages.length;setStage(autoStage)}},5200);

document.querySelectorAll('.output-item').forEach(item=>item.addEventListener('click',()=>{document.querySelectorAll('.output-item').forEach(other=>other.classList.remove('active'));item.classList.add('active')}));

document.querySelectorAll('a[href^="#"]').forEach(link=>link.addEventListener('click',event=>{const target=document.querySelector(link.getAttribute('href'));if(target){event.preventDefault();target.scrollIntoView({behavior:'smooth',block:'start'})}}));

// Small pointer parallax on the hero instrument; it is disabled for touch and reduced-motion users.
const instrument=document.querySelector('.hero-instrument');
if(instrument&&!matchMedia('(prefers-reduced-motion: reduce)').matches&&matchMedia('(pointer:fine)').matches){instrument.addEventListener('pointermove',event=>{const rect=instrument.getBoundingClientRect();const x=(event.clientX-rect.left)/rect.width-.5;const y=(event.clientY-rect.top)/rect.height-.5;instrument.style.setProperty('--tilt-x',`${x*5}deg`);instrument.style.setProperty('--tilt-y',`${y*-4}deg`)});instrument.addEventListener('pointerleave',()=>{instrument.style.setProperty('--tilt-x','0deg');instrument.style.setProperty('--tilt-y','0deg')})}


// Guided sample brief: a deterministic product demonstration for the public site.
const demoForm=document.getElementById('demo-form');
const demoQuestion=document.getElementById('demo-question');
const demoState=document.getElementById('demo-state');
const demoProgressLine=document.getElementById('demo-progress-line');
const demoProgressLabel=document.getElementById('demo-progress-label');
const demoFinding=document.getElementById('demo-finding');
const demoSupport=document.getElementById('demo-support');
const demoOutputStatus=document.getElementById('demo-output-status');
const demoStages=document.querySelectorAll('.demo-stage');
let demoTimer;
const demoCopy=[
  ['The question becomes a brief with a clear point of view.','Recon turns an open question into a focused research frame.'],
  ['The source field widens without losing the thread.','Relevant material is organized around the question, not left as a pile of tabs.'],
  ['The claim now has somewhere to point.','Sources, excerpts, and supporting material stay close to the evidence they support.'],
  ['Signals become patterns, gaps, and implications.','Recon separates what is observed from what is interpreted.'],
  ['The finding is ready to leave the room.','The finished brief keeps its evidence trail so a team can review and act.']
];
function resetDemo(){clearInterval(demoTimer);demoStages.forEach(stage=>stage.classList.remove('active'));demoStages[0]?.classList.add('active');if(demoProgressLine)demoProgressLine.style.width='0%';if(demoProgressLabel)demoProgressLabel.textContent='0 / 5 stages';if(demoState)demoState.textContent='Sample preview ready';if(demoOutputStatus)demoOutputStatus.textContent='Illustrative';if(demoFinding)demoFinding.textContent='The question becomes a brief with a clear point of view.';if(demoSupport)demoSupport.textContent='Recon keeps the source trail close, so the eventual answer is easier to inspect, challenge, and share.'}
function runDemo(){
  clearInterval(demoTimer);let step=0;const question=demoQuestion?.value.trim()||'your research question';
  if(demoState)demoState.textContent='Working on “'+question.slice(0,34)+(question.length>34?'…':'')+'”';
  if(demoOutputStatus)demoOutputStatus.textContent='Previewing';
  const advance=()=>{const copy=demoCopy[step];demoStages.forEach((stage,index)=>stage.classList.toggle('active',index===step));if(demoProgressLine)demoProgressLine.style.width=((step+1)*20)+'%';if(demoProgressLabel)demoProgressLabel.textContent=(step+1)+' / 5 stages';if(demoFinding)demoFinding.textContent=copy[0];if(demoSupport)demoSupport.textContent=copy[1];if(step===4){if(demoState)demoState.textContent='Sample path complete';if(demoOutputStatus)demoOutputStatus.textContent='Illustrative';clearInterval(demoTimer)}step+=1};
  advance();demoTimer=setInterval(advance,850);
}
demoForm?.addEventListener('submit',event=>{event.preventDefault();runDemo()});
document.querySelectorAll('[data-question]').forEach(button=>button.addEventListener('click',()=>{if(demoQuestion){demoQuestion.value=button.dataset.question;demoQuestion.focus()}}));


// Keep the native disclosure state reflected for assistive technologies.
document.querySelectorAll('details[data-faq]').forEach(item=>{
  const summary=item.querySelector('summary');
  const syncExpanded=()=>summary?.setAttribute('aria-expanded',String(item.open));
  syncExpanded();
  item.addEventListener('toggle',syncExpanded);
});
