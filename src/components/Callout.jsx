import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Link } from "react-router-dom";
import ShinyText from "./reactbits/ShinyText.jsx";
import Magnetic from "./reactbits/Magnetic.jsx";

// Clean SVGs for methodology pillars
const CompassIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
  </svg>
);

const CodeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const RocketIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
  </svg>
);

const PILLARS = [
  {
    id: "discovery",
    icon: <CompassIcon />,
    title: "Strategic Discovery & Architecture",
    desc: "Auditing real workflow bottlenecks, target demographics, and database schemas before writing a single line of code.",
  },
  {
    id: "engineering",
    icon: <CodeIcon />,
    title: "Agile Production & Clean Code",
    desc: "Sprint-driven modular engineering, automated tests, zero technical debt, and weekly review deployments.",
  },
  {
    id: "scalability",
    icon: <RocketIcon />,
    title: "Continuous Scalability & Measurable ROI",
    desc: "High-availability cloud hosting, automated CI/CD pipelines, and systems tied directly to measurable revenue.",
  },
];

export function Callout() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section className="callout" id="approach" ref={ref}>
      <div className="wrap">
        <div className="callout-grid">
          {/* Left Column: Full Rich Content & 3 Methodology Pillars */}
          <div className="callout-text">
          <div className="callout-badge">
            <span className="live-radar-dot" style={{ width: 7, height: 7 }} />
            <span>The Nexprobyte Approach • Proven Methodology</span>
          </div>

          <h2 className="callout-title">
            Strategy First.{" "}
            <ShinyText className="callout-accent-word">
              Technology Always.
            </ShinyText>
          </h2>

          <p className="callout-desc">
            Every engagement starts with understanding your business before writing a single line of
            code. We shape scalable web technologies, design systems, and digital marketing around
            one singular metric: <strong>measurable commercial growth</strong>.
          </p>

          {/* 3 Process Pillars */}
          <div className="callout-pillars">
            {PILLARS.map((p) => (
              <div key={p.id} className="callout-pillar-item">
                <span className="callout-pillar-step" aria-hidden="true">{p.icon}</span>
                <div>
                  <h4 className="callout-pillar-title">{p.title}</h4>
                  <p className="callout-pillar-desc">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="callout-cta-row">
            <Magnetic strength={18} radius={75}>
              <a href="#services" className="btn btn-solid">
                Explore Core Services <span className="arr">→</span>
              </a>
            </Magnetic>
            <Magnetic strength={16} radius={75}>
              <Link to="/about" className="btn btn-ghost">
                Our Company Story
              </Link>
            </Magnetic>
          </div>
        </div>

        {/* Right Column: Proportional Frame with Floating Badges */}
        <div className="callout-media-wrapper">
          <motion.div className="callout-img-card" style={{ y }}>
            <img
              src="/images/callout.jpg"
              alt="Engineering and digital product strategy session at Nexprobyte"
              loading="lazy"
              className="callout-photo"
            />

            {/* Glassmorphic Verified Badge Overlay */}
            <div className="callout-float-badge callout-badge-top">
              <span className="callout-float-icon">✓</span>
              <div>
                <div style={{ fontWeight: 800, fontSize: 13, color: "var(--ink)" }}>40+ Systems Shipped</div>
                <div style={{ fontSize: 11, color: "var(--muted)" }}>Zero Downtime Architecture</div>
              </div>
            </div>

            <div className="callout-float-badge callout-badge-bottom">
              <span className="live-radar-dot" style={{ width: 8, height: 8 }} />
              <div>
                <div style={{ fontWeight: 800, fontSize: 12.5, color: "var(--ink)" }}>Coimbatore Studio</div>
                <div style={{ fontSize: 11, color: "var(--accent)" }}>Serving Global Clients</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      </div>
    </section>
  );
}