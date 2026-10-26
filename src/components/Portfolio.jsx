import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SectionHead } from "./Reveal.jsx";
import SpotlightCard from "./reactbits/SpotlightCard.jsx";
import ShinyText from "./reactbits/ShinyText.jsx";

const EASE = [0.22, 1, 0.36, 1];

// Clean SVGs (zero emojis)
const BagIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

const HospitalIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M12 8v8" />
    <path d="M8 12h8" />
  </svg>
);

const UtensilsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2v20" />
    <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
    <path d="M7 2v20" />
  </svg>
);

const BuildingIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <path d="M9 22v-4h6v4" />
    <path d="M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01" />
  </svg>
);

const FactoryIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
    <path d="M17 18h1" />
    <path d="M12 18h1" />
    <path d="M7 18h1" />
  </svg>
);

const GraduationIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);

const PinIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 21s-6-5.373-6-10a6 6 0 0 1 12 0c0 4.627-6 10-6 10z" />
    <circle cx="12" cy="11" r="2" />
  </svg>
);

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

const SIGNATURE_BUILDS = [
  {
    name: "Tirupur Garments E-commerce Platform",
    short: "E-commerce Platform",
    location: "Tirupur • Garments Hub",
    city: "Tirupur",
    desc: "B2B wholesale portal connecting Tirupur mills to buyers across India with bulk ordering & Razorpay gateway.",
    stack: ["React", "Node.js", "MongoDB", "Razorpay"],
    metric: "300%",
    metricLabel: "Sales Increase",
    category: "Web",
    year: "2024",
    headerBg: "linear-gradient(135deg, #12385F 0%, #087DC1 100%)",
    icon: <BagIcon />,
  },
  {
    name: "Care Hospital Management System",
    short: "Hospital Management System",
    location: "Coimbatore • Healthcare",
    city: "Coimbatore",
    desc: "EMR, digital appointments, pharmacy inventory, and lab reports automation for multi-speciality clinics.",
    stack: ["Next.js", "PostgreSQL", "Node.js", "Socket.io"],
    metric: "25+",
    metricLabel: "Clinics Live",
    category: "Software",
    year: "2024",
    headerBg: "linear-gradient(135deg, #087DC1 0%, #12385F 100%)",
    icon: <HospitalIcon />,
  },
  {
    name: "Spice Route Restaurant Chain App",
    short: "Restaurant Chain App",
    location: "Chennai & Coimbatore • F&B",
    city: "Chennai",
    desc: "Online ordering, customer loyalty points, live table booking & kitchen display system for multi-outlet dining.",
    stack: ["Flutter", "Firebase", "Node.js", "Google Maps"],
    metric: "10k+",
    metricLabel: "Downloads",
    category: "App",
    year: "2024",
    headerBg: "linear-gradient(135deg, #12385F 0%, #F07816 100%)",
    icon: <UtensilsIcon />,
  },
  {
    name: "Salem Property Real Estate Portal",
    short: "Real Estate Portal",
    location: "Salem • PropTech",
    city: "Salem",
    desc: "Verified residential listings, virtual 3D walkthroughs, broker CRM and automated lead generation.",
    stack: ["React", "Laravel", "MySQL", "Mapbox"],
    metric: "500+",
    metricLabel: "Property Listings",
    category: "Web",
    year: "2023",
    headerBg: "linear-gradient(135deg, #087DC1 0%, #38a5e0 100%)",
    icon: <BuildingIcon />,
  },
  {
    name: "Erode Textile ERP Software",
    short: "Textile ERP Software",
    location: "Erode • Textile Belt",
    city: "Erode",
    desc: "End-to-end ERP digitizing yarn procurement, weaving, dyeing batches, packing, and dispatch tracking.",
    stack: ["React", "Node.js", "PostgreSQL", "AWS"],
    metric: "50+",
    metricLabel: "Factories Managed",
    category: "Software",
    year: "2023",
    headerBg: "linear-gradient(135deg, #12385F 0%, #087DC1 100%)",
    icon: <FactoryIcon />,
  },
  {
    name: "Madurai Scholars LMS Platform",
    short: "Education LMS Platform",
    location: "Madurai • EdTech",
    city: "Madurai",
    desc: "High-definition video lectures, live interactive classrooms, online test series, and real-time parent reports.",
    stack: ["Next.js", "Flutter", "Node.js", "AWS S3"],
    metric: "5000+",
    metricLabel: "Active Students",
    category: "Web",
    year: "2023",
    headerBg: "linear-gradient(135deg, #087DC1 0%, #12385F 100%)",
    icon: <GraduationIcon />,
  },
];

const CATEGORIES = ["All", "Web", "App", "Software"];

export function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredBuilds = SIGNATURE_BUILDS.filter(
    (item) => activeCategory === "All" || item.category === activeCategory
  );

  return (
    <section className="section signature-section" id="work">
      <div className="wrap">
        {/* Header Block */}
        <div className="signature-head">
          <div>
            <div className="signature-eyebrow">
              <span className="signature-badge">WORK • 6 SIGNATURE BUILDS • REAL RESULTS</span>
            </div>
            <h2 className="signature-title">
              Real Businesses.{" "}
              <ShinyText className="signature-title-accent">
                Real Results.
              </ShinyText>
            </h2>
            <p className="signature-sub">
              6 detailed case studies from Tirupur to Madurai — built by our 30+ team, running live in production today.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="signature-filter-wrap">
            <div className="signature-filters">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`signature-filter-btn ${activeCategory === cat ? "is-active" : ""}`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="signature-status">
              <span className="status-dot"></span>
              <span>Live filtering • 6 production builds</span>
            </div>
          </div>
        </div>

        {/* 6 Signature Builds Grid */}
        <motion.div layout className="signature-grid">
          <AnimatePresence>
            {filteredBuilds.map((build, i) => (
              <motion.div
                key={build.name}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: EASE }}
              >
                <SpotlightCard
                  className="signature-card"
                  spotlightColor="rgba(8, 125, 193, 0.16)"
                  spotlightSize={340}
                >
                  {/* Card Header with Soft Blue/Navy Gradient */}
                  <div className="signature-card-head" style={{ background: build.headerBg }}>
                    <div className="card-head-top">
                      <div className="card-icon-wrap">{build.icon}</div>
                      <div className="card-head-badges">
                        <span className="badge-year">{build.year} • {build.category.toUpperCase()}</span>
                        <span className="badge-city">
                          <PinIcon /> {build.city}
                        </span>
                      </div>
                    </div>

                    <div className="card-head-content">
                      <span className="card-location">{build.location}</span>
                      <h3 className="card-title">{build.short}</h3>
                      <p className="card-desc">{build.desc}</p>
                    </div>

                    {/* Metric Box */}
                    <div className="card-metric-row">
                      <div className="card-metric-box">
                        <div className="metric-number">{build.metric}</div>
                        <div className="metric-label">{build.metricLabel}</div>
                      </div>
                      <div className="card-metric-divider"></div>
                      <div className="card-metric-verified">
                        <span>Verified live</span>
                        <span>in production</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="signature-card-body">
                    <div className="tech-stack-label">TECH STACK</div>
                    <div className="tech-stack-tags">
                      {build.stack.map((tech) => (
                        <span key={tech} className="tech-tag">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="card-footer-row">
                      <a href="#contact" className="case-study-btn">
                        <span>View Case Study</span>
                        <span className="btn-arrow-circle">
                          <ArrowRight />
                        </span>
                      </a>
                      <span className="built-by-tag">Nexprobyte • Coimbatore</span>
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom Banner */}
        <div className="signature-banner">
          <div className="banner-left">
            <span className="banner-dot"></span>
            <span>All projects hosted in Coimbatore cluster • AWS Mumbai • 99.9% uptime</span>
          </div>
          <span className="banner-sep"></span>
          <a href="mailto:info@nexprobyte.com" className="banner-right">
            Need similar result? Talk to team: <strong>info@nexprobyte.com</strong> / <strong>9500042426</strong>
          </a>
        </div>
      </div>
    </section>
  );
}