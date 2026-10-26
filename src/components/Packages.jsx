import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { SectionHead } from "./Reveal.jsx";

const EASE = [0.22, 1, 0.36, 1];

const PACKAGES = [
  {
    name: "Essential Web",
    level: "Starting Tier",
    tag: "For startups, clinics, consultants & local shops",
    price: "₹18,999",
    per: "one-time investment*",
    turnaround: "7–10 Days Delivery",
    palette: "cobalt",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    summary: [
      "5-Page High-Performance Website",
      "Mobile-First Responsive Design",
      "WhatsApp Click-to-Chat & Contact Form",
      "Google Business Profile & Map Setup",
      "Free SSL & Speed Optimization",
      "1 Month Free Post-Launch Support",
    ],
    extra: {
      title: "What's included in Essential Web",
      bullets: [
        "Clean, modern UI designed in Figma",
        "On-page SEO meta tags & sitemap setup",
        "Domain & hosting setup assistance",
        "Cross-browser testing (Chrome, Safari, Edge)",
        "Full code ownership & zero vendor lock-in",
      ],
      note: "*Domain & hosting billed at actuals.",
    },
  },
  {
    name: "Growth Pro",
    level: "Mid-Level Tier",
    popular: true,
    badge: "Most Popular",
    tag: "For growing brands, services & high conversions",
    price: "₹38,999",
    per: "one-time investment*",
    turnaround: "14–18 Days Delivery",
    palette: "popular",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
    summary: [
      "Up to 10 Pages + Dynamic CMS / Blog",
      "Comprehensive On-Page & Technical SEO",
      "Lead Capture Funnel & WhatsApp Automation",
      "Speed & Core Web Vitals (90+ Score)",
      "Google Analytics 4 & Search Console Setup",
      "3 Months Priority Support & Maintenance",
    ],
    extra: {
      title: "Everything in Essential, plus",
      bullets: [
        "Custom interactive components & motion",
        "Catalog / product showcase integration",
        "Digital marketing launch readiness checklist",
        "Conversion rate optimization (CRO) structure",
        "Dedicated project lead in Coimbatore",
      ],
      note: "*Optional monthly marketing retainers available.",
    },
  },
  {
    name: "Enterprise Suite",
    level: "Premium Tier",
    tag: "For custom web apps, e-commerce & enterprise scale",
    price: "₹74,999",
    per: "starting from / custom scope",
    turnaround: "21–30 Days Delivery",
    palette: "enterprise",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
    summary: [
      "Custom Web App or E-Commerce Store",
      "Payment Gateway, Cart & User Accounts",
      "Custom REST API & PostgreSQL / Mongo DB",
      "Cloud Architecture & High-Security Auth",
      "Performance Marketing & Ad Funnel Setup",
      "6 Months Dedicated Maintenance Retainer",
    ],
    extra: {
      title: "Everything in Growth Pro, plus",
      bullets: [
        "Full-stack React / Node.js scalable architecture",
        "CRM / ERP / Webhook third-party integrations",
        "Weekly sprint reviews & staging environment",
        "Automated backup, CI/CD pipeline & CDN deployment",
        "Direct senior engineering team access",
      ],
      note: "*Custom scope tailored to your exact business specifications.",
    },
  },
];

function PackageCard({ pkg, i }) {
  const [more, setMore] = useState(false);

  return (
    <motion.article
      className={`package-card is-${pkg.palette} ${pkg.popular ? "is-popular" : ""}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay: 0.08 * i, ease: EASE }}
    >
      {pkg.badge && <span className="package-popular-badge">{pkg.badge}</span>}

      <div className="package-card-top">
        <div>
          <span className="package-level-tag">{pkg.level}</span>
          <h3>{pkg.name}</h3>
          <p>{pkg.tag}</p>
        </div>
        <span className="package-icon-wrap" aria-hidden="true">
          {pkg.icon}
        </span>
      </div>

      <div className="package-price">
        <span className="package-price-value">{pkg.price}</span>
        <span className="package-price-per">{pkg.per}</span>
      </div>

      <div className="package-turnaround">
        <span className="turnaround-dot">✦</span>
        <span>{pkg.turnaround}</span>
      </div>

      <ul className="package-summary">
        {pkg.summary.map((s) => (
          <li key={s}>
            <span className="tick">✦</span> {s}
          </li>
        ))}
      </ul>

      <AnimatePresence initial={false}>
        {more && (
          <motion.div
            className="package-extra"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <div className="package-extra-inner">
              <b>{pkg.extra.title}</b>
              <ul>
                {pkg.extra.bullets.map((b) => (
                  <li key={b}>
                    <span className="tick">✦</span> {b}
                  </li>
                ))}
              </ul>
              <p className="package-extra-note">{pkg.extra.note}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="package-footer-actions">
        <button
          type="button"
          className={`package-more ${more ? "is-open" : ""}`}
          onClick={() => setMore((v) => !v)}
          aria-expanded={more}
        >
          {more ? "Hide details" : "View full inclusions"} <span className="arr">{more ? "−" : "+"}</span>
        </button>

        <Link
          to="/contact"
          className={`btn ${pkg.popular ? "btn-solid" : "btn-ghost"} package-btn`}
        >
          Choose {pkg.name} <span className="arr">→</span>
        </Link>
      </div>
    </motion.article>
  );
}

export function Packages() {
  return (
    <section className="section wrap" id="pricing">
      <SectionHead
        label="Starting • Mid-Level • Premium"
        title="Simple, transparent plans"
      />
      <div className="packages">
        {PACKAGES.map((pkg, i) => (
          <PackageCard key={pkg.name} pkg={pkg} i={i} />
        ))}
      </div>
    </section>
  );
}