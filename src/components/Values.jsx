import React from "react";
import { motion } from "motion/react";
import { SectionHead } from "./Reveal.jsx";

// Clean SVG icons (zero emojis)
const TargetIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

const BulbIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18h6" />
    <path d="M10 22h4" />
    <path d="M12 2a7 7 0 0 0-7 7c0 2.5 1.5 4.5 3 6h8c1.5-1.5 3-3.5 3-6a7 7 0 0 0-7-7z" />
  </svg>
);

const SearchIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const AwardIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="6" />
    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
  </svg>
);

const LayersIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

const ChartIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </svg>
);

const VALUES = [
  { icon: <TargetIcon />, title: "Customer First", desc: "We listen, understand and build solutions that truly solve problems." },
  { icon: <BulbIcon />, title: "Innovation", desc: "We embrace new ideas and technologies to keep you ahead of the curve." },
  { icon: <SearchIcon />, title: "Transparency", desc: "Open communication and honest work in every engagement." },
  { icon: <AwardIcon />, title: "Quality", desc: "We are committed to delivering quality that you can rely on." },
  { icon: <LayersIcon />, title: "Simplicity", desc: "Simple processes and clean design for a better user experience." },
  { icon: <ChartIcon />, title: "Long-Term Growth", desc: "We grow together with our clients and their business goals." },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const cell = {
  hidden: { opacity: 0, y: 42 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

export function Values() {
  return (
    <section className="section wrap" id="about">
      <SectionHead label="What drives us" title="Built on principles" />
      <motion.div className="grid cols-3" variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.12 }}>
        {VALUES.map((v) => (
          <motion.div key={v.title} className="cell" variants={cell}>
            <div className="cell-top-row">
              <span className="values-card-icon">{v.icon}</span>
            </div>
            <h3>{v.title}</h3>
            <p>{v.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}