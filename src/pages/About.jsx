import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { PageHero } from "../components/PageHero.jsx";
import { SectionHead, FadeIn } from "../components/Reveal.jsx";
import CountUp from "../components/reactbits/CountUp.jsx";
import Magnetic from "../components/reactbits/Magnetic.jsx";

const PRINCIPLES = [
  {
    id: "honest",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: "Honest work",
    desc: "No magic promises. Clear scopes, real timelines and straight answers — even when the truth isn't easy to hear.",
  },
  {
    id: "outcome",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>
      </svg>
    ),
    title: "Own the outcome",
    desc: "We treat every project like our own business. If it doesn't grow revenue or save time, it doesn't ship.",
  },
  {
    id: "lasting",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>
      </svg>
    ),
    title: "Built to last",
    desc: "Clean code, documented decisions and scalable architecture — so the work keeps paying off long after launch.",
  },
  {
    id: "care",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
      </svg>
    ),
    title: "Client-first care",
    desc: "A dedicated point of contact, weekly updates and a team that picks up the phone. No layers, no noise.",
  },
];

const STATS = [
  { num: "40+", val: 40, suffix: "+", label: "Projects delivered" },
  { num: "5+", val: 5, suffix: "+", label: "Years of experience" },
  { num: "100%", val: 100, suffix: "%", label: "Client-first approach" },
  { num: "24/7", label: "Support on retainer" },
];

export default function About() {
  const [aboutData, setAboutData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api/about")
      .then((res) => res.json())
      .then((data) => setAboutData(data))
      .catch((e) => console.error(e));
  }, []);

  const title = aboutData?.title ? [aboutData.title] : ["The people behind", "the pixels"];
  const sub = aboutData?.subtitle || "We're a Coimbatore-based digital solutions studio helping startups and SMEs grow with technology, design and marketing — since day one, strategy first.";
  const story = aboutData?.story || "Nexprobyte was founded with a simple belief: small and mid-sized businesses deserve the same digital firepower as enterprises. We bridge that gap with a senior, honest team that ships.";
  const statsList = aboutData?.stats?.length > 0 ? aboutData.stats : STATS;

  return (
    <>
      <PageHero
        num="About"
        label="Nexprobyte Technologies"
        title={title}
        sub={sub}
        media={
          <div className="about-hero-card">
            <div className="about-hero-image-wrap">
              <img
                src="/images/about-team.jpg"
                alt="Nexprobyte engineering and design team in Coimbatore studio"
                className="about-hero-img"
              />
              <div className="about-hero-badge about-badge-top">
                <span className="live-radar-dot" style={{ width: 7, height: 7 }}>
                  <span className="live-radar-ring" />
                </span>
                <span>Coimbatore Studio • In-House Team</span>
              </div>
              <div className="about-hero-badge about-badge-bottom">
                <span className="about-badge-spark">✦</span>
                <span>50+ Digital Products Shipped</span>
              </div>
            </div>
          </div>
        }
      />

      <section className="section wrap">
        <SectionHead label="Our story" title="Built on principles" />

        <div className="detail-cols" style={{ paddingBottom: 0 }}>
          <div>
            <p className="lead-p" style={{ marginTop: 8 }}>
              {story}
            </p>
          </div>
          <ul className="check-list">
            {[
              "Strategy-first engagements",
              "Senior team, no hand-offs",
              "Design, code & marketing under one roof",
              "Measurable results on every project",
            ].map((f, i) => (
              <motion.li
                key={f}
                initial={{ opacity: 0, x: -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: 0.04 * i, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="tick">✦</span> {f}
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* Studio Culture & Engineering Visual Band */}
      <section className="section wrap" style={{ paddingTop: 0, paddingBottom: "clamp(32px, 4vw, 56px)" }}>
        <motion.div
          className="about-studio-banner"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="about-studio-grid">
            <div className="about-studio-image-box">
              <img
                src="/images/about-workspace.jpg"
                alt="Nexprobyte engineering workstation in Coimbatore"
                className="about-studio-photo"
              />
              <span className="about-studio-tag">Coimbatore Tech Hub</span>
            </div>
            <div className="about-studio-content">
              <span className="eyebrow">
                <span className="eyebrow-spark">✦</span>
                <span>Crafted in Coimbatore</span>
              </span>
              <h3>Built by Engineers Who Take Pride in Code & Architecture.</h3>
              <p>
                From clean API design and responsive frontends to scalable enterprise databases and cloud automations — we write code that lasts. No outsourced junior layers. Every project is planned, reviewed, and shipped by senior talent right here in Coimbatore.
              </p>
              <div className="about-studio-badges">
                <span className="studio-pill">Modern React & TypeScript</span>
                <span className="studio-pill">Enterprise Databases</span>
                <span className="studio-pill">Custom ERP Workflows</span>
                <span className="studio-pill">n8n Automation</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="section wrap" style={{ paddingTop: 0 }}>
        <div className="grid cols-2">
          {PRINCIPLES.map((p, i) => (
            <motion.div
              key={p.id}
              className="cell"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="principle-icon">{p.icon}</span>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="section wrap" style={{ paddingTop: 0 }}>
        <div className="about-stats">
          {statsList.map((s, i) => (
            <motion.div
              key={s.label || i}
              className="about-stat"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: 0.06 * i, ease: [0.22, 1, 0.36, 1] }}
            >
              <b>
                {s.val ? (
                  <CountUp to={s.val} suffix={s.suffix || ""} duration={1.8} />
                ) : (
                  s.value || s.num
                )}
              </b>
              <span>{s.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="section wrap" style={{ paddingTop: 0 }}>
        <FadeIn className="services-cta">
          <h2>
            Let's build what's next for your business.
          </h2>
          <Magnetic strength={20} radius={75}>
            <Link to="/contact" className="btn btn-solid">
              Start a project <span className="arr">→</span>
            </Link>
          </Magnetic>
        </FadeIn>
      </section>
    </>
  );
}