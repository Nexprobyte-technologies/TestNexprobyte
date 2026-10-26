import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { RevealLines } from "./Reveal.jsx";
import Magnetic from "./reactbits/Magnetic.jsx";
import ShinyText from "./reactbits/ShinyText.jsx";

export function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section className="hero wrap" id="top" ref={ref}>
      <div className="hero-background">
        <div className="hero-glow-beam" />
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-accent" />
      </div>
      <div className="hero-grid">
        <motion.div className="hero-left-col" style={{ opacity: fade, position: "relative", zIndex: 2 }}>
          <motion.div
            className="eyebrow hero-live-badge"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="live-radar-dot">
              <span className="live-radar-ring" />
            </span>
            <span className="live-badge-icon" aria-hidden="true" style={{ display: "inline-flex", alignItems: "center" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 21s-6-5.373-6-10a6 6 0 0 1 12 0c0 4.627-6 10-6 10z" />
                <circle cx="12" cy="11" r="2" />
              </svg>
            </span>
            <span>Coimbatore HQ • Serving All Tamil Nadu</span>
          </motion.div>

          <h1 className="hero-headline h-display">
            <RevealLines
              lines={["We Build", "Digital Solutions"]}
              delay={0.25}
              className="h-display"
              lineClass="h-display"
            />
            <span style={{ display: "block", overflow: "hidden", paddingTop: "0.02em" }}>
              <motion.span
                style={{ display: "inline-block" }}
                initial={{ y: "115%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                That Help{" "}
                <ShinyText className="italic-serif" style={{ fontSize: "1.1em" }}>
                  Businesses
                </ShinyText>{" "}
                Grow
              </motion.span>
            </span>
          </h1>

          <div className="hero-sub">
            <p style={{ maxWidth: "54ch" }}>
              Nexprobyte Technologies is a digital marketing agency and software development company in
              Coimbatore — helping startups and SMEs grow with web development, SEO, performance ads and
              AI automation.
            </p>
            <div className="hero-cta">
              <Magnetic strength={20} radius={75}>
                <a href="#contact" className="btn btn-solid">
                  Contact Us <span className="arr">→</span>
                </a>
              </Magnetic>
              <Magnetic strength={18} radius={75}>
                <a href="#work" className="btn btn-ghost">
                  Explore More
                </a>
              </Magnetic>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="hero-right-col"
          style={{ y, scale }}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="hero-video-card">
            <div className="hero-video-topbar">
              <div className="hero-video-dots">
                <span className="dot dot-red" />
                <span className="dot dot-yellow" />
                <span className="dot dot-green" />
              </div>
              <span className="hero-video-title">
                <span className="live-radar-dot" style={{ width: 6, height: 6 }}>
                  <span className="live-radar-ring" />
                </span>
                Custom ERP & Management Software
              </span>
              <span className="hero-video-badge">Live System</span>
            </div>
            <div className="hero-video-wrapper">
              <video
                src="/images/datas.mp4"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className="hero-video-element"
              />
            </div>
            <div className="hero-video-footer">
              <span className="hero-video-tag">Production Demo</span>
              <span className="hero-video-meta">Real-Time Sync • Cloud Ready</span>
            </div>
          </div>
          <div className="hero-media-tags">
            <span className="tag">Est. Coimbatore</span>
            <span className="coords">Coimbatore • Tamil Nadu</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
