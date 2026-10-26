import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { PageHero } from "../components/PageHero.jsx";
import { JOBS } from "../data/content.js";

const PERKS = [
  "Competitive salary & yearly reviews",
  "Flexible hours & remote-friendly",
  "Learning budget for courses & tools",
  "Real client work from month one",
  "Friday demos & team builds",
  "Referral & performance bonuses",
];

function getJobMeta(title = "", dept = "") {
  const t = title.toLowerCase();

  if (t.includes("frontend") || t.includes("react")) {
    return {
      bg: "linear-gradient(135deg, #0284c7 0%, #0369a1 50%, #0c4a6e 100%)",
      glow: "0 8px 24px rgba(2, 132, 199, 0.4)",
      tag: "React / Web",
      iconSvg: (
        <svg width="34" height="34" viewBox="-11.5 -10.23174 23 20.46348" fill="none" stroke="#67e8f9" strokeWidth="1.3">
          <circle cx="0" cy="0" r="2.2" fill="#67e8f9" />
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </svg>
      ),
    };
  }

  if (t.includes("full stack") || t.includes("fullstack") || t.includes("backend") || t.includes("node")) {
    return {
      bg: "linear-gradient(135deg, #059669 0%, #0d9488 50%, #042f2e 100%)",
      glow: "0 8px 24px rgba(13, 148, 136, 0.4)",
      tag: "Full Stack",
      iconSvg: (
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#6ee7b7" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
          <line x1="14" y1="4" x2="10" y2="20" stroke="#ffffff" />
        </svg>
      ),
    };
  }

  if (t.includes("designer") || t.includes("ui") || t.includes("ux")) {
    return {
      bg: "linear-gradient(135deg, #f97316 0%, #ea580c 50%, #7c2d12 100%)",
      glow: "0 8px 24px rgba(249, 115, 22, 0.4)",
      tag: "UI / UX Design",
      iconSvg: (
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fed7aa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 19l7-7 3 3-7 7-3-3z" />
          <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
          <path d="M2 2l7.586 7.586" />
          <circle cx="11" cy="11" r="2" />
        </svg>
      ),
    };
  }

  if (t.includes("mobile") || t.includes("app") || t.includes("flutter") || t.includes("ios") || t.includes("android")) {
    return {
      bg: "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 50%, #3b0764 100%)",
      glow: "0 8px 24px rgba(139, 92, 246, 0.4)",
      tag: "Mobile / App",
      iconSvg: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ddd6fe" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="2" width="14" height="20" rx="3" />
          <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="3" strokeLinecap="round" />
        </svg>
      ),
    };
  }

  if (t.includes("marketing") || t.includes("seo") || t.includes("growth")) {
    return {
      bg: "linear-gradient(135deg, #ec4899 0%, #db2777 50%, #700732 100%)",
      glow: "0 8px 24px rgba(236, 72, 153, 0.4)",
      tag: "Marketing / SEO",
      iconSvg: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fbcfe8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
          <polyline points="16 7 22 7 22 13" />
        </svg>
      ),
    };
  }

  return {
    bg: "linear-gradient(135deg, #0284c7 0%, #0369a1 50%, #082f49 100%)",
    glow: "0 8px 24px rgba(2, 132, 199, 0.4)",
    tag: dept || "Engineering",
    iconSvg: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
  };
}

export default function Careers() {
  const [jobsList, setJobsList] = React.useState(JOBS);

  React.useEffect(() => {
    fetch("/api/jobs")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setJobsList(data.filter((j) => j.active !== false));
        }
      })
      .catch((e) => console.error(e));
  }, []);

  return (
    <>
      <PageHero
        num="Careers"
        label="Join the team"
        title={["Do great work,", "grow with it"]}
        sub="Nexprobyte is a small, senior-friendly team in Coimbatore. We value deep work, honest feedback and people who ship."
      />

      <section className="section wrap" style={{ paddingTop: 40 }}>
        <div className="detail-cols" style={{ paddingBottom: 48 }}>
          <div>
            <div className="eyebrow">
              <span className="num">✦</span>
              <span>Why join us</span>
            </div>
            <p className="lead-p" style={{ marginTop: 18 }}>
              You won't be a cog. You'll own real outcomes — from the first conversation to the
              final launch — and build the kind of portfolio that makes the next move easy.
            </p>
          </div>
          <ul className="check-list">
            {PERKS.map((f, i) => (
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

      <section className="section wrap" style={{ paddingTop: 0 }}>
        <div className="eyebrow" style={{ marginBottom: 20 }}>
          <span className="num">Open roles</span>
          <span>{jobsList.length} positions</span>
        </div>

        <div className="jobs-list">
          {jobsList.map((j, i) => {
            const meta = getJobMeta(j.title, j.dept);
            return (
              <motion.div
                key={j.slug || j.id || j._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: 0.06 * i, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link to={`/careers/${j.slug}`} className="job-row">
                  <div className="job-img">
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "14px",
                        background: meta.bg,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px",
                        boxShadow: meta.glow,
                        border: "1px solid rgba(255, 255, 255, 0.22)",
                        position: "relative",
                        overflow: "hidden",
                        padding: "8px 6px",
                      }}
                    >
                      {/* Top ambient glass sheen */}
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          height: "50%",
                          background: "linear-gradient(180deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0) 100%)",
                          pointerEvents: "none",
                        }}
                      />
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1 }}>
                        {meta.iconSvg}
                      </div>
                      <span
                        style={{
                          zIndex: 1,
                          fontSize: "11px",
                          fontWeight: 800,
                          color: "#ffffff",
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                          background: "rgba(0, 0, 0, 0.28)",
                          padding: "2px 8px",
                          borderRadius: "999px",
                          border: "1px solid rgba(255, 255, 255, 0.25)",
                          backdropFilter: "blur(6px)",
                          lineHeight: 1.15,
                          textAlign: "center",
                          maxWidth: "96%",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {meta.tag}
                      </span>
                    </div>
                  </div>
                  <div className="job-main">
                    <h3>{j.title}</h3>
                    <p>{j.excerpt}</p>
                  </div>
                  <div className="job-tags">
                    <span className="mini-tag">{j.dept}</span>
                    <span className="mini-tag">{j.location}</span>
                    <span className="mini-tag">{j.type}</span>
                  </div>
                  <span className="r-icon">↗</span>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="jobs-empty">
          <h2>
            Don't see your role? <em className="italic-serif">We still want to hear from you.</em>
          </h2>
          <p>
            Great people create roles. Send your portfolio and a short note about what you'd build
            here — we reply to every application.
          </p>
          <Link to="/careers/apply" className="btn btn-solid">
            Apply speculatively <span className="arr">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}