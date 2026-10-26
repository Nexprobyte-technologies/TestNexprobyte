import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import SpotlightCard from "./reactbits/SpotlightCard.jsx";
import ShinyText from "./reactbits/ShinyText.jsx";
import Magnetic from "./reactbits/Magnetic.jsx";
import CountUp from "./reactbits/CountUp.jsx";

// Clean SVGs for industry domains
const FactoryIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H2z" />
    <path d="M17 18h1" />
    <path d="M12 18h1" />
    <path d="M7 18h1" />
  </svg>
);

const CncIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const RocketIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
);

const BuildingIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
    <path d="M9 22v-4h6v4" />
    <path d="M8 6h.01" />
    <path d="M16 6h.01" />
    <path d="M12 6h.01" />
    <path d="M12 10h.01" />
    <path d="M12 14h.01" />
    <path d="M16 10h.01" />
    <path d="M16 14h.01" />
    <path d="M8 10h.01" />
    <path d="M8 14h.01" />
  </svg>
);

const CartIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="8" cy="21" r="1" />
    <circle cx="19" cy="21" r="1" />
    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const INDUSTRY_DATA = [
  {
    id: "mfg",
    name: "Manufacturing",
    icon: <FactoryIcon />,
    badge: "Smart Factory Operations",
    headline: "Real-Time Shop Floor Intelligence & Custom ERP Systems",
    desc: "Replace fragmented paper registers and manual spreadsheets with connected operator tablets, live machine utilization tracking, inventory batch audits, and automated dispatch workflows.",
    metricNum: 40,
    metricSuffix: "%",
    metricLabel: "Faster Production Cycles & Shift Turnaround",
    features: [
      "Batch & Raw Material Traceability",
      "Shop Floor Operator Dashboards",
      "Automated Machine Downtime Alerts",
      "Dispatched Goods & Invoice ERP Sync",
    ],
    pipeline: [
      { step: "Order Ingestion", desc: "PO Auto-Synced to Inventory" },
      { step: "Floor Scheduling", desc: "Machine Allocation & Shifts" },
      { step: "QC Inspection", desc: "Digital Tolerance Verification" },
      { step: "Dispatch Logistics", desc: "Auto E-Way Bill & Delivery" },
    ],
    tech: ["PostgreSQL", "React", "Node.js", "Docker", "WebSockets"],
  },
  {
    id: "cnc",
    name: "CNC & Engineering",
    icon: <CncIcon />,
    badge: "Precision Machining & Job-Order",
    headline: "Instant CAD-to-Quote Calculation & Live Job-Card Telemetry",
    desc: "Empower Coimbatore and global engineering manufacturers with automated quotation portals that calculate tooling hours, material cost, setup allowances, and delivery timelines in minutes.",
    metricNum: 3.5,
    metricDecimals: 1,
    metricSuffix: "x",
    metricLabel: "Faster RFQ & Client Quotation Turnaround",
    features: [
      "Instant Drawing & CAD Estimator",
      "Job-Card Lifecycle Tracking",
      "Vendor & Subcontractor Portals",
      "ISO 9001 Compliance Audit Logs",
    ],
    pipeline: [
      { step: "CAD/Drawing Upload", desc: "Tooling & Material Analyzed" },
      { step: "Auto RFQ Quoting", desc: "1-Click PDF Estimate to Client" },
      { step: "Spindle Job Cards", desc: "Operator Real-time Progress" },
      { step: "Customer Tracking", desc: "Live Order Status Transparency" },
    ],
    tech: ["React", "Express", "PostgreSQL", "AWS S3", "PDF Engine"],
  },
  {
    id: "startups",
    name: "High-Growth Startups",
    icon: <RocketIcon />,
    badge: "0 to 1 MVP & Scale",
    headline: "High-Velocity MVPs Built for Scale & Investor Readiness",
    desc: "From whiteboard architecture to a production-ready SaaS in 6 weeks. Complete with user authentication, Stripe/Razorpay billing, cloud infrastructure, and enterprise scalability.",
    metricNum: 6,
    metricSuffix: " Wks",
    metricLabel: "Average End-to-End MVP Launch Speed",
    features: [
      "Multi-Tenant SaaS Architecture",
      "Global Payment & Subscription Billing",
      "Scalable Serverless Cloud APIs",
      "Investor-Ready Tech Diligence",
    ],
    pipeline: [
      { step: "System Blueprint", desc: "Wireframes & Data Architecture" },
      { step: "Core Prototype", desc: "Working Engine & Test Suite" },
      { step: "Billing & Auth", desc: "Subscriptions & Role Security" },
      { step: "Cloud Deployment", desc: "High-Availability CI/CD" },
    ],
    tech: ["Next.js", "TypeScript", "Tailwind/CSS", "Stripe API", "Vercel"],
  },
  {
    id: "smes",
    name: "SMEs & Enterprises",
    icon: <BuildingIcon />,
    badge: "Workflow Automation",
    headline: "Unified Business Operations & Automated WhatsApp CRM",
    desc: "Consolidate customer inquiries, WhatsApp automated follow-ups, GST quotation generation, and internal team accountability into one clean, lightning-fast dashboard.",
    metricNum: 60,
    metricSuffix: "+ Hrs",
    metricLabel: "Saved Per Month on Manual Administrative Tasks",
    features: [
      "WhatsApp Automated Inquiries",
      "One-Click GST Quotations & Invoices",
      "Client Self-Service Account Portals",
      "Staff KPI & Task Accountability",
    ],
    pipeline: [
      { step: "Lead Capture", desc: "Web + WhatsApp Auto-Response" },
      { step: "Quote Sent", desc: "Professional PDF in 30 Seconds" },
      { step: "Payment Gateway", desc: "Auto-Reconciled Ledger" },
      { step: "Follow-Up Bot", desc: "Scheduled Retention Broadcast" },
    ],
    tech: ["React", "Node.js", "WhatsApp Cloud API", "PostgreSQL", "Cloud"],
  },
  {
    id: "ecommerce",
    name: "E-Commerce & Retail",
    icon: <CartIcon />,
    badge: "High-Conversion Commerce",
    headline: "Sub-Second Storefronts Engineered for Peak Conversions",
    desc: "Custom headless storefronts and multi-warehouse sync that load in under 1 second. Built with integrated payment gateways, abandoned cart recovery, and automated WhatsApp delivery alerts.",
    metricNum: 38,
    metricSuffix: "%",
    metricLabel: "Average Increase in Mobile Checkout Conversion",
    features: [
      "Sub-Second Page Load Speeds",
      "Multi-Warehouse Inventory Sync",
      "Direct WhatsApp Cart Recovery",
      "Frictionless Payment Gateways",
    ],
    pipeline: [
      { step: "Lightning Catalog", desc: "< 1s Instant Product Browsing" },
      { step: "Frictionless Checkout", desc: "UPI, Cards, EMI with 0% Drop" },
      { step: "Warehouse Auto-Sync", desc: "Real-time Stock Allocation" },
      { step: "Shipment Tracking", desc: "Automated WhatsApp Alerts" },
    ],
    tech: ["React / Shopify", "Razorpay / Stripe", "Redis", "Node.js"],
  },
];

export function Industries() {
  const [activeTab, setActiveTab] = useState(0);
  const cur = INDUSTRY_DATA[activeTab];

  return (
    <section className="industries-section" id="industries">
      <div className="wrap">
        {/* Header with clean pill badge and ShinyText */}
        <div className="industries-head">
        <div className="industries-badge">
          <span className="live-radar-dot" style={{ width: 7, height: 7 }} />
          <span>Sectors We Empower • Industry Solutions</span>
        </div>

        <h2 className="industries-title">
          From Shop Floors to Digital Storefronts, We Build for{" "}
          <ShinyText className="italic-serif" style={{ fontSize: "1.08em" }}>
            Real Workflows.
          </ShinyText>
        </h2>

        <p className="industries-sub">
          We don't build generic static sites. We engineer operational web portals, custom
          estimating engines, and high-velocity commerce systems designed specifically for
          Coimbatore's industrial leaders and forward-thinking enterprises.
        </p>
      </div>

      {/* Interactive Sector Tabs (ReactBits inspired selector bar) */}
      <div className="industries-tabs" role="tablist" aria-label="Select Industry">
        {INDUSTRY_DATA.map((ind, i) => {
          const isActive = activeTab === i;
          return (
            <button
              key={ind.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTab(i)}
              className={`industry-tab ${isActive ? "is-active" : ""}`}
            >
              <span className="industry-tab-icon">{ind.icon}</span>
              <span>{ind.name}</span>
            </button>
          );
        })}
      </div>

      {/* Active Industry Showcase with ReactBits SpotlightCard & Magnetic Button */}
      <AnimatePresence mode="wait">
        <motion.div
          key={cur.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <SpotlightCard
            className="industry-showcase-card"
            contentClassName="industry-showcase-grid"
            spotlightColor="rgba(8, 125, 193, 0.16)"
            spotlightSize={420}
          >
            {/* Left Column: Solution Detail & Metric */}
            <div className="industry-main-info">
              <div>
                <div className="industry-tag-row">
                  <span className="industry-badge">{cur.badge}</span>
                  <span className="industry-live-status">
                    <span className="industry-live-dot" />
                    Production Ready Architecture
                  </span>
                </div>

                <h3 className="industry-headline" style={{ marginTop: 14 }}>
                  {cur.headline}
                </h3>

                <p className="industry-desc" style={{ marginTop: 12 }}>
                  {cur.desc}
                </p>
              </div>

              {/* Key Business Metric Banner with ReactBits CountUp */}
              <div className="industry-stat-box">
                <div className="industry-stat-val">
                  <CountUp
                    to={cur.metricNum}
                    decimals={cur.metricDecimals || 0}
                    suffix={cur.metricSuffix}
                    duration={1.6}
                  />
                </div>
                <div className="industry-stat-label">
                  <b>{cur.metricLabel}</b>
                  <div style={{ fontSize: 11.5, opacity: 0.8, marginTop: 2 }}>
                    Proven benchmark across client deployments
                  </div>
                </div>
              </div>

              {/* Features List */}
              <div className="industry-features-grid">
                {cur.features.map((feat, idx) => (
                  <div key={idx} className="industry-feat-item">
                    <span className="industry-feat-tick">
                      <CheckIcon />
                    </span>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Magnetic CTA Button */}
              <div style={{ paddingTop: 8 }}>
                <Magnetic strength={22} radius={75}>
                  <Link to="/contact" className="btn btn-solid">
                    <span>Engineer for {cur.name}</span>
                    <span className="arr">
                      <ArrowRight />
                    </span>
                  </Link>
                </Magnetic>
              </div>
            </div>

            {/* Right Column: Workflow Pipeline Architecture Simulation */}
            <div className="industry-pipeline-panel">
              <div>
                <div className="pipeline-header">
                  <span>Operational Pipeline Simulation</span>
                  <span style={{ color: "#10b981", fontSize: 11, fontWeight: 700 }}>
                    • System Active
                  </span>
                </div>

                <div className="pipeline-steps" style={{ marginTop: 16 }}>
                  {cur.pipeline.map((p, idx) => (
                    <div key={idx} className="pipeline-step-item">
                      <div className="pipeline-step-left">
                        <span className="pipeline-step-idx" aria-hidden="true">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </span>
                        <div>
                          <div className="pipeline-step-title">{p.step}</div>
                          <div style={{ fontSize: 11.5, color: "var(--muted)", marginTop: 2 }}>
                            {p.desc}
                          </div>
                        </div>
                      </div>
                      <span className="pipeline-step-badge">Active</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verified Tech Stack Chips */}
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>
                  Core Technology Stack
                </div>
                <div className="pipeline-tech-row">
                  {cur.tech.map((t, idx) => (
                    <span key={idx} className="pipeline-tech-tag">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </SpotlightCard>
        </motion.div>
      </AnimatePresence>
      </div>
    </section>
  );
}