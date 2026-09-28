import { useEffect } from "react";

import {
  ArrowRight,
  BarChart3,
  Brain,
  ChevronDown,
  FileText,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";
import "./App.css";

function App() {
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="site-shell">
      {/* Navigation */}
      <header className="navbar">
        <div className="nav-inner">
          <button
            className="brand"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className="brand-lockup">

  <span className="brand-mark" aria-hidden="true">
    <svg
      viewBox="0 0 40 40"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 5h14c7 0 11 4 11 9 0 4-2 7-6 8l7 13h-8l-6-12h-5v12H8V5Zm8 7v5h5c3 0 4-1 4-3s-1-2-4-2h-5Z"
        fill="currentColor"
      />
      <rect
        x="5"
        y="29"
        width="7"
        height="7"
        fill="var(--gold)"
      />
    </svg>
  </span>

  <span className="brand-copy">
    <span className="brand-name">RECON BRIEF</span>
    <span className="brand-tagline">
      MARKETS <i>|</i> COMPETITORS <i>|</i> OPPORTUNITIES
    </span>
  </span>

</div>
          </button>

          <nav className="nav-links">
            <button onClick={() => scrollToSection("about")}>About</button>
            <button onClick={() => scrollToSection("how-it-works")}>
              How It Works
            </button>
            <button onClick={() => scrollToSection("features")}>
              Features
            </button>
            <button onClick={() => scrollToSection("demo")}>Demo</button>
          </nav>

          <a
            className="nav-cta"
            href="https://recon-brief.vercel.app/"
            target="_blank"
            rel="noreferrer"
          >
            Launch Recon
            <ArrowRight size={15} />
          </a>
        </div>
      </header>

      {/* Hero */}
      <main>
        <section className="hero">
          <div className="hero-grid" />

          <div className="hero-content">
            <div className="eyebrow">
              <span className="status-dot" />
              COMPETITIVE INTELLIGENCE PLATFORM
            </div>

            <h1>
              Competitive intelligence,
              <br />
              <span>without the guesswork.</span>
            </h1>

            <p className="hero-description">
              Recon Brief turns scattered market information into structured,
              evidence-backed competitive intelligence — so you can understand
              the landscape before making your next move.
            </p>

            <div className="hero-actions">
              <a
                className="button button-primary"
                href="https://recon-brief.vercel.app/"
                target="_blank"
                rel="noreferrer"
              >
                Start a Recon
                <ArrowRight size={17} />
              </a>

              <button
                className="button button-secondary"
                onClick={() => scrollToSection("how-it-works")}
              >
                Explore how it works
              </button>
            </div>

            <div className="hero-meta">
              <div>
                <span>01</span>
                Research
              </div>
              <div>
                <span>02</span>
                Analyze
              </div>
              <div>
                <span>03</span>
                Decide
              </div>
            </div>
          </div>

          {/* Intelligence card */}
<div className="hero-visual">

  <div className="signal-map" aria-hidden="true">
    <div className="signal-line line-one" />
    <div className="signal-line line-two" />
    <div className="signal-line line-three" />
    <div className="signal-line line-four" />
    <div className="signal-line line-five" />

    <div className="signal-node node-market">
      <span />
      <label>MARKET</label>
    </div>

    <div className="signal-node node-brand">
      <span />
      <label>BRAND</label>
    </div>

    <div className="signal-node node-target">
      <span />
      <label>TARGET</label>
    </div>

    <div className="signal-node node-digital">
      <span />
      <label>DIGITAL</label>
    </div>

    <div className="signal-node node-pricing">
      <span />
      <label>PRICING</label>
    </div>
  </div>

  <div className="intel-card">
              <div className="intel-top">
                <span>RECON / 001</span>
                <span className="live-indicator">LIVE</span>
              </div>

              <div className="intel-title">
                <span className="intel-label">TARGET COMPANY</span>
                <strong>MARKET LANDSCAPE</strong>
              </div>

              <div className="intel-bars">
                <div className="intel-row">
                  <span>Brand Position</span>
                  <div className="bar">
                    <i style={{ width: "86%" }} />
                  </div>
                  <b>86</b>
                </div>

                <div className="intel-row">
                  <span>Market Presence</span>
                  <div className="bar">
                    <i style={{ width: "74%" }} />
                  </div>
                  <b>74</b>
                </div>

                <div className="intel-row">
                  <span>Digital Reach</span>
                  <div className="bar">
                    <i style={{ width: "68%" }} />
                  </div>
                  <b>68</b>
                </div>

                <div className="intel-row">
                  <span>Competitive Pressure</span>
                  <div className="bar">
                    <i style={{ width: "57%" }} />
                  </div>
                  <b>57</b>
                </div>
              </div>

              <div className="intel-bottom">
                <div>
                  <span>Sources verified</span>
                  <strong>24</strong>
                </div>

                <div>
                  <span>Competitors</span>
                  <strong>04</strong>
                </div>

                <div>
                  <span>Confidence</span>
                  <strong>HIGH</strong>
                </div>
              </div>
            </div>

            <div className="floating-tag tag-one">
              <ShieldCheck size={14} />
              Evidence-backed
            </div>

            <div className="floating-tag tag-two">
              <Sparkles size={14} />
              AI-assisted
            </div>
          </div>

          <button
            className="scroll-indicator"
            onClick={() => scrollToSection("about")}
            aria-label="Scroll to learn more"
          >
            <span>SCROLL TO EXPLORE</span>
            <ChevronDown size={17} />
          </button>
        </section>

        {/* About */}
        <section className="section about-section reveal" id="about">
          <div className="section-label">01 / THE PROBLEM</div>

          <div className="about-grid">
            <div>
              <h2>
                Businesses don't lack information.
                <br />
                <em>They lack structured intelligence.</em>
              </h2>
            </div>

            <div className="about-copy">
              <p>
                Competitive research is often buried across websites, reports,
                news articles, product pages and scattered market data.
              </p>

              <p>
                Recon Brief brings those signals together, analyzes the
                competitive landscape and turns them into a clear intelligence
                brief built for decision-making.
              </p>

              <div className="statement">
                <span>THE SHIFT</span>
                <strong>FROM INFORMATION → INTELLIGENCE</strong>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="section process-section reveal" id="how-it-works">
          <div className="section-label">02 / THE PROCESS</div>

          <div className="section-heading">
            <h2>From question to competitive clarity.</h2>
            <p>
              A structured workflow designed to move from research to useful
              business intelligence.
            </p>
          </div>

          <div className="process-grid">
            <ProcessCard
              number="01"
              icon={<Target size={22} />}
              title="Define"
              description="Identify the target company, competitors and the questions that matter."
            />

            <ProcessCard
              number="02"
              icon={<Search size={22} />}
              title="Research"
              description="Gather information across relevant public sources and market signals."
            />

            <ProcessCard
              number="03"
              icon={<Brain size={22} />}
              title="Analyze"
              description="Structure findings into competitive themes, evidence and strategic signals."
            />

            <ProcessCard
              number="04"
              icon={<Zap size={22} />}
              title="Decide"
              description="Turn the intelligence into a concise brief that supports the next move."
            />
          </div>
        </section>

        {/* Features */}
        <section className="section features-section reveal" id="features">
          <div className="section-label">03 / CAPABILITIES</div>

          <div className="section-heading">
            <h2>Built for the questions behind the numbers.</h2>
            <p>
              Recon Brief combines research, analysis and reporting into one
              focused intelligence workflow.
            </p>
          </div>

          <div className="features-grid">
            <FeatureCard
              icon={<Search size={21} />}
              title="AI-Powered Research"
              text="Accelerate the collection and synthesis of competitive market information."
            />

            <FeatureCard
              icon={<BarChart3 size={21} />}
              title="Competitor Intelligence"
              text="Compare positioning, capabilities, presence and competitive signals."
            />

            <FeatureCard
              icon={<ShieldCheck size={21} />}
              title="Evidence-Backed Insights"
              text="Connect important findings to sources so intelligence can be reviewed."
            />

            <FeatureCard
              icon={<FileText size={21} />}
              title="Multiple Report Modes"
              text="Generate concise briefs or deeper analyst-style intelligence depending on the task."
            />

            <FeatureCard
              icon={<Sparkles size={21} />}
              title="Strategic Signals"
              text="Surface opportunities, vulnerabilities, differentiators and emerging patterns."
            />

            <FeatureCard
              icon={<Zap size={21} />}
              title="Exportable Reports"
              text="Turn research into structured reports that are ready to share and review."
            />
          </div>
        </section>

        {/* Why Recon Brief */}
        <section className="section why-section reveal" id="why-recon">
          <div className="section-label">04 / WHY RECON BRIEF</div>

          <div className="why-intro">
            <div>
              <span className="why-kicker">THE INTELLIGENCE GAP</span>
              <h2>
                Less searching.
                <br />
                <em>More signal.</em>
              </h2>
            </div>

            <p>
              Competitive intelligence shouldn't end with a folder full of
              links. Recon Brief turns scattered research into structured
              insight that is easier to understand, compare and act on.
            </p>
          </div>

          <div className="why-grid">
            <article className="why-card">
              <div className="why-number">01</div>

              <div className="why-line" />

              <h3>Faster Research</h3>

              <p>
                Spend less time jumping between websites, reports and market
                sources. Recon Brief brings the research workflow into one
                focused environment.
              </p>

              <div className="why-footer">
                <span>TIME → SIGNAL</span>
                <ArrowRight size={15} />
              </div>
            </article>

            <article className="why-card">
              <div className="why-number">02</div>

              <div className="why-line" />

              <h3>Structured Intelligence</h3>

              <p>
                Move beyond isolated facts. Organize competitive information
                into themes, evidence, comparisons and strategic signals.
              </p>

              <div className="why-footer">
                <span>DATA → CONTEXT</span>
                <ArrowRight size={15} />
              </div>
            </article>

            <article className="why-card">
              <div className="why-number">03</div>

              <div className="why-line" />

              <h3>Decision-Ready Output</h3>

              <p>
                Get a clear intelligence brief instead of another pile of
                research. Designed to support conversations, analysis and the
                next business move.
              </p>

              <div className="why-footer">
                <span>INSIGHT → ACTION</span>
                <ArrowRight size={15} />
              </div>
            </article>
          </div>

          <div className="why-bottom">
            <span>THE RECON PRINCIPLE</span>
            <strong>INFORMATION IS EVERYWHERE. INTELLIGENCE ISN'T.</strong>
          </div>
        </section>

        {/* Demo */}
        <section className="section demo-section reveal" id="demo">
          <div className="section-label">04 / EXAMPLE OUTPUT</div>

          <div className="demo-header">
            <div>
              <span className="demo-kicker">DEMO INTELLIGENCE BRIEF</span>
              <h2>A glimpse inside a Recon.</h2>
            </div>

            <span className="demo-badge">EXAMPLE DATA</span>
          </div>

          <div className="report-window">
            <div className="report-sidebar">
              <div className="report-logo">R</div>

              <span className="active">Overview</span>
              <span>Market</span>
              <span>Competitors</span>
              <span>Evidence</span>
              <span>Signals</span>
            </div>

            <div className="report-main">
              <div className="report-header">
                <div>
                  <span>COMPETITIVE INTELLIGENCE</span>
                  <h3>Example Market Brief</h3>
                </div>

                <div className="confidence">
                  <span>CONFIDENCE</span>
                  <strong>HIGH</strong>
                </div>
              </div>

              <div className="report-metrics">
                <Metric label="Market Position" value="82" />
                <Metric label="Brand Strength" value="76" />
                <Metric label="Digital Presence" value="71" />
                <Metric label="Competitive Pressure" value="64" />
              </div>

              <div className="report-columns">
                <div className="report-panel">
                  <span className="panel-label">KEY FINDING</span>
                  <h4>
                    Strong brand presence, but growing pressure from digitally
                    aggressive competitors.
                  </h4>
                  <p>
                    Example intelligence derived from publicly available market
                    signals and structured for demonstration purposes.
                  </p>
                </div>

                <div className="report-panel">
                  <span className="panel-label">COMPETITIVE SIGNALS</span>

                  <div className="signal">
                    <i />
                    Brand visibility remains strong
                  </div>

                  <div className="signal">
                    <i />
                    Digital acquisition is accelerating
                  </div>

                  <div className="signal">
                    <i />
                    Differentiation is becoming more important
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="cta-section reveal">
          <div className="cta-grid" />

          <span className="section-label">05 / NEXT MOVE</span>

          <h2>
            Stop searching.
            <br />
            <em>Start reconning.</em>
          </h2>

          <p>
            Turn competitive information into intelligence you can actually
            use.
          </p>

          <a
            className="button button-primary cta-button"
            href="https://recon-brief.vercel.app/"
            target="_blank"
            rel="noreferrer"
          >
            Run your first Recon
            <ArrowRight size={17} />
          </a>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div>
          <div className="footer-brand">
            <span className="brand-mark" aria-hidden="true">
<svg
  viewBox="0 0 44 44"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M10 6h15.5c6.2 0 10.5 3.4 10.5 8.7 0 4.1-2.3 7-6.4 8.3L37 37h-8.2l-6.1-12.3H18V37h-8V6Zm8 6.5v6.2h6.1c2.7 0 4.2-1.1 4.2-3.1 0-2-1.5-3.1-4.2-3.1H18Z"
    fill="currentColor"
  />
  <path
    d="M7 39h14"
    stroke="var(--gold)"
    stroke-width="2"
    stroke-linecap="square"
  />
</svg>
</span>
            RECON BRIEF
          </div>
          <p>Competitive intelligence, without the guesswork.</p>
        </div>

        <div className="footer-right">
          <span>© 2026 Recon Brief</span>
          <a
            href="https://recon-brief.vercel.app/"
            target="_blank"
            rel="noreferrer"
          >
            Launch App <ArrowRight size={14} />
          </a>
        </div>
      </footer>
    </div>
  );
}

function ProcessCard({ number, icon, title, description }) {
  return (
    <article className="process-card">
      <div className="card-top">
        <span>{number}</span>
        <div className="card-icon">{icon}</div>
      </div>

      <h3>{title}</h3>
      <p>{description}</p>

      <div className="card-arrow">
        <ArrowRight size={16} />
      </div>
    </article>
  );
}

function FeatureCard({ icon, title, text }) {
  return (
    <article className="feature-card">
      <div className="feature-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
      <ArrowRight className="feature-arrow" size={16} />
    </article>
  );
}

function Metric({ label, value }) {
  return (
    <div className="metric">
      <span>{label}</span>
      <strong>{value}</strong>
      <div className="metric-line">
        <i style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}


export default App;