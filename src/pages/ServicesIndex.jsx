import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { PageHero } from "../components/PageHero.jsx";
import { SERVICES } from "../data/content.js";

const SERVICE_ICONS = {
  "website-development": (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>
  ),
  "application-development": (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="8" rx="2" /><rect x="2" y="14" width="20" height="8" rx="2" /><line x1="6" y1="6" x2="6.01" y2="6" /><line x1="6" y1="18" x2="6.01" y2="18" /></svg>
  ),
  "mobile-app-development": (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2" /><line x1="12" y1="18" x2="12.01" y2="18" /></svg>
  ),
  "ui-ux-design": (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19 7-7 3 3-7 7-3-3z" /><path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" /><path d="m2 2 7.586 7.586" /><circle cx="11" cy="11" r="2" /></svg>
  ),
  "branding-identity": (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
  ),
  "digital-marketing-seo": (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>
  ),
  "social-media-marketing": (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
  ),
};

export default function ServicesIndex() {
  return (
    <>
      <PageHero
        num="Services"
        label="What we do"
        title={["Everything you need,", "under one roof"]}
        sub="Six integrated disciplines. One accountable team. Strategy, design, development and marketing that work together instead of in silos."
        media={
          <div className="service-hero-card">
            <div className="service-hero-image-wrap">
              <img
                src="/images/srv-web.jpg"
                alt="Nexprobyte Digital Services"
                className="service-hero-img"
              />
              <div className="service-hero-badge service-badge-top">
                <span className="live-radar-dot" style={{ width: 7, height: 7 }}>
                  <span className="live-radar-ring" />
                </span>
                <span>Full-Stack Studio • In-House</span>
              </div>
              <div className="service-hero-badge service-badge-bottom">
                <span className="service-badge-spark">✦</span>
                <span>All Disciplines Under One Roof</span>
              </div>
            </div>
            <div className="service-hero-meta">
              <div className="service-hero-stats">
                <div className="sh-stat">
                  <span className="sh-stat-num">50+</span>
                  <span className="sh-stat-label">Projects Shipped</span>
                </div>
                <div className="sh-stat-divider" />
                <div className="sh-stat">
                  <span className="sh-stat-num">100%</span>
                  <span className="sh-stat-label">In-House Team</span>
                </div>
                <div className="sh-stat-divider" />
                <div className="sh-stat">
                  <span className="sh-stat-num">5.0 ★</span>
                  <span className="sh-stat-label">Client Rating</span>
                </div>
              </div>
            </div>
          </div>
        }
      />

      <section className="section wrap" style={{ paddingTop: 40 }}>
        <div className="rows">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.slug}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5, margin: "-40px" }}
              transition={{ duration: 0.8, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link to={`/services/${s.slug}`} className="row-exp row-link">
                <span className="r-icon-badge">{SERVICE_ICONS[s.slug] || <span className="tick">✦</span>}</span>
                <h3>
                  {s.title} <em className="serif-i">{s.serif}</em>
                </h3>
                <span className="r-desc">
                  {s.blurb}
                  <br />
                  <span className="link-hint">View service →</span>
                </span>
                <span className="r-icon">{s.icon}</span>
                <img className="row-thumb" src={s.image} alt={s.title} loading="lazy" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="section wrap">
        <div className="services-cta">
          <h2>
            Not sure what you need? <em className="italic-serif">Start with a conversation.</em>
          </h2>
          <Link to="/contact" className="btn btn-solid">
            Get a free consultation <span className="arr">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}