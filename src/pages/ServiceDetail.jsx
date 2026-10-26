import React from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "motion/react";
import { PageHero, Breadcrumb } from "../components/PageHero.jsx";
import { SERVICES } from "../data/content.js";
import { useSEO } from "../hooks/useSEO.js";

const EASE = [0.22, 1, 0.36, 1];

export default function ServiceDetail() {
  const { slug } = useParams();
  const s = SERVICES.find((x) => x.slug === slug);

  useSEO({
    title: s
      ? `${s.title} Coimbatore — Nexprobyte Technologies | Digital Agency`
      : undefined,
    description: s?.blurb,
    keywords: `${s?.title || "software"} Coimbatore, ${s?.title || "digital marketing"} services, software company Coimbatore`,
  });

  if (!s) return <Navigate to="/services" replace />;

  return (
    <>
      <PageHero
        num="Core Service"
        label={s.title}
        title={[s.serif, "that ships"]}
        sub={s.blurb}
        media={
          <div className="service-hero-card">
            <div className="service-hero-image-wrap">
              <img
                src={s.image}
                alt={s.title}
                className="service-hero-img"
              />
              <div className="service-hero-badge service-badge-top">
                <span className="live-radar-dot" style={{ width: 7, height: 7 }}>
                  <span className="live-radar-ring" />
                </span>
                <span>{s.title} • In-House Team</span>
              </div>
              <div className="service-hero-badge service-badge-bottom">
                <span className="service-badge-spark">✦</span>
                <span>{s.deliverables[0]} & More</span>
              </div>
            </div>
            <div className="service-hero-meta">
              <div className="service-hero-stats">
                <div className="sh-stat">
                  <span className="sh-stat-num">100%</span>
                  <span className="sh-stat-label">Custom Scope</span>
                </div>
                <div className="sh-stat-divider" />
                <div className="sh-stat">
                  <span className="sh-stat-num">Fast</span>
                  <span className="sh-stat-label">Turnaround</span>
                </div>
                <div className="sh-stat-divider" />
                <div className="sh-stat">
                  <span className="sh-stat-num">Direct</span>
                  <span className="sh-stat-label">Team Access</span>
                </div>
              </div>
            </div>
          </div>
        }
      >
        <Breadcrumb
          items={[
            { label: "Home", to: "/" },
            { label: "Services", to: "/services" },
            { label: s.title },
          ]}
        />
      </PageHero>

      <section className="section wrap" style={{ paddingTop: 30 }}>
        <div className="detail-top">
          <motion.div
            className="detail-art"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
          >
            <div className="detail-scope-card">
              <div className="scope-card-header">
                <div className="scope-card-badge">
                  <span className="live-radar-dot" style={{ width: 6, height: 6 }}>
                    <span className="live-radar-ring" />
                  </span>
                  <span>Execution & Delivery Scope</span>
                </div>
                <span className="scope-tag">Standard Sprint: 2–4 Wks</span>
              </div>
              <div className="scope-card-body">
                <div className="scope-item">
                  <span className="scope-icon">✦</span>
                  <div>
                    <strong>Engineered to Convert</strong>
                    <p>Clean architecture, responsive performance and enterprise stability.</p>
                  </div>
                </div>
                <div className="scope-item">
                  <span className="scope-icon">✦</span>
                  <div>
                    <strong>Senior In-House Team</strong>
                    <p>Direct communication with engineers and designers in Coimbatore studio.</p>
                  </div>
                </div>
                <div className="scope-item">
                  <span className="scope-icon">✦</span>
                  <div>
                    <strong>Post-Launch Warranty</strong>
                    <p>Included handover training, maintenance support and code ownership.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            className="detail-summary"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
          >
            <div className="eyebrow" style={{ marginBottom: 14 }}>
              <span className="eyebrow-spark">✦</span>
              <span>Overview & Strategy</span>
            </div>
            <h2 className="detail-headline">{s.headline || s.title}</h2>
            <p className="detail-desc">{s.overview}</p>
            <div className="btn-row">
              <Link to="/contact" className="btn btn-solid">
                Start this project <span className="arr">→</span>
              </Link>
              <Link to="/work" className="btn btn-ghost">
                See our work
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="detail-cols" style={{ paddingTop: 64 }}>
          <div>
            <div className="eyebrow">
              <span className="eyebrow-spark">✦</span>
              <span>What's included</span>
            </div>
            <ul className="check-list">
              {s.features.map((f, i) => (
                <motion.li
                  key={f}
                  initial={{ opacity: 0, x: -18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6, delay: 0.05 * i, ease: EASE }}
                >
                  <span className="tick">✦</span> {f}
                </motion.li>
              ))}
            </ul>
          </div>
          <div>
            <div className="eyebrow">
              <span className="eyebrow-spark">✦</span>
              <span>What you receive</span>
            </div>
            <div className="deliver-grid">
              {s.deliverables.map((d, i) => (
                <motion.div
                  key={d}
                  className="deliver"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6, delay: 0.06 * i, ease: EASE }}
                >
                  <span className="deliver-bullet">✦</span>
                  {d}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="other-services">
          <div className="eyebrow">
            <span className="eyebrow-spark">✦</span>
            <span>Explore other services</span>
          </div>
          <div className="pill-row">
            {SERVICES.filter((x) => x.slug !== slug).map((x) => (
              <Link key={x.slug} to={`/services/${x.slug}`} className="pill">
                {x.title} <span className="arr">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}