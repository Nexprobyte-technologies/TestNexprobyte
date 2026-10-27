import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";

const EASE = [0.22, 1, 0.36, 1];

const CATEGORIES = [
  { id: "all", label: "All Services", count: 8 },
  { id: "dev", label: "Development", count: 3 },
  { id: "growth", label: "Marketing & SEO", count: 3 },
  { id: "creative", label: "Design & Brand", count: 2 },
];

const SERVICES_DATA = [
  {
    slug: "website-development",
    num: "01",
    category: "dev",
    categoryLabel: "Web & E-Commerce",
    title: "Website Development",
    serif: "Performance",
    blurb: "Fast, responsive, and SEO-engineered websites that turn casual traffic into loyal paying clients.",
    image: "/images/portfolio-4.jpg",
    tags: ["React & Next.js", "Core Web Vitals 95+", "E-Commerce"],
    color: "#087DC1",
  },
  {
    slug: "application-development",
    num: "02",
    category: "dev",
    categoryLabel: "Custom Cloud & SaaS",
    title: "Application Development",
    serif: "Scalable",
    blurb: "High-performance enterprise web apps, internal CRM portals, and scalable cloud architectures.",
    image: "/images/portfolio-3.jpg",
    tags: ["React / Node / Python", "Microservices & APIs", "AWS Cloud Scale"],
    color: "#12385F",
  },
  {
    slug: "mobile-app-development",
    num: "03",
    category: "dev",
    categoryLabel: "iOS & Android",
    title: "Mobile App Development",
    serif: "Native Feel",
    blurb: "Sleek cross-platform and native mobile apps built with fluid motion and offline synchronization.",
    image: "/images/portfolio-2.jpg",
    tags: ["React Native & Flutter", "Store Publishing", "Offline Database"],
    color: "#087DC1",
  },
  {
    slug: "digital-marketing",
    num: "04",
    category: "growth",
    categoryLabel: "Growth & Performance",
    title: "Digital Marketing",
    serif: "Data-Driven",
    blurb: "High-converting Google & Meta ad campaigns relentlessly optimized for measurable revenue growth.",
    image: "/images/cover-marketing.jpg",
    tags: ["Google & Meta Ads", "CRO Landing Funnels", "Real ROI Tracking"],
    color: "#F07816",
  },
  {
    slug: "seo-services",
    num: "05",
    category: "growth",
    categoryLabel: "Search Authority",
    title: "SEO Services",
    serif: "Top Rankings",
    blurb: "Technical audits, targeted keywords, and authority backlinks to dominate Google #1 organic rankings.",
    image: "/images/cover-seo.jpg",
    tags: ["Technical Site Audits", "Keyword Dominance", "Google Map Pack"],
    color: "#12385F",
  },
  {
    slug: "social-media-marketing",
    num: "06",
    category: "growth",
    categoryLabel: "Viral & Brand Reach",
    title: "Social Media Marketing",
    serif: "Brand Voice",
    blurb: "High-engagement reels, creative content pipelines, and targeted paid amplification across platforms.",
    image: "/images/srv-mobile.jpg",
    tags: ["Engaging Reels", "30-Day Content Plan", "Community Growth"],
    color: "#087DC1",
  },
  {
    slug: "ui-ux-design",
    num: "07",
    category: "creative",
    categoryLabel: "User Experience",
    title: "UI/UX Design",
    serif: "Human-Centric",
    blurb: "Intuitive user journeys, design systems, and clickable Figma prototypes that delight users.",
    image: "/images/cover-design.jpg",
    tags: ["Figma Design System", "Interactive Prototype", "Conversion UX"],
    color: "#F07816",
  },
  {
    slug: "branding-identity",
    num: "08",
    category: "creative",
    categoryLabel: "Brand Identity",
    title: "Branding & Identity",
    serif: "Distinctive",
    blurb: "Iconic logos, memorable brand guidelines, and visual identity systems that leave lasting impressions.",
    image: "/images/cover-business.jpg",
    tags: ["Vector Logo Kit", "Brand Guidelines Deck", "Stationery & Social"],
    color: "#12385F",
  },
];

export function Services() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredServices =
    activeTab === "all"
      ? SERVICES_DATA
      : SERVICES_DATA.filter((s) => s.category === activeTab);

  return (
    <section className="section services-visual-section" id="services">
      <div className="wrap">
        {/* Clean, Full-Width Header Block */}
        <div className="services-visual-header">
          <div className="services-header-top">
            <div className="services-eyebrow">
              <span className="services-status-dot" />
              <span>OUR EXPERTISE • FULL-SPECTRUM SOLUTIONS</span>
            </div>
            <h2 className="services-visual-title">
              What We Do <br />
              <span className="services-title-accent">For High-Growth Brands</span>
            </h2>
            <p className="services-visual-subtitle">
              From enterprise software and high-conversion websites to revenue-focused marketing — 
              we build digital systems that deliver real business outcomes.
            </p>
          </div>

          {/* Dedicated Single-Row Filter Bar (No line breaks / Never wraps awkwardly) */}
          <div className="services-filter-row">
            <div className="services-filter-bar">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  className={`services-filter-btn ${activeTab === cat.id ? "is-active" : ""}`}
                  onClick={() => setActiveTab(cat.id)}
                >
                  <span className="filter-label">{cat.label}</span>
                  <span className="filter-count">{cat.count}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Visual Cards Grid */}
        <motion.div layout className="services-visual-grid">
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, idx) => (
              <motion.div
                key={service.slug}
                layout
                initial={{ opacity: 0, scale: 0.94, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 20 }}
                transition={{ duration: 0.45, delay: idx * 0.05, ease: EASE }}
                className="service-visual-card"
              >
                <Link to={`/services/${service.slug}`} className="service-card-link-wrap">
                  {/* Visual Picture Banner */}
                  <div className="service-card-media">
                    <img
                      src={service.image}
                      alt={service.title}
                      loading="lazy"
                      className="service-card-img"
                      onError={(e) => {
                        e.target.src = "/images/srv-web.jpg";
                      }}
                    />
                    <div className="service-media-overlay" />
                    
                    {/* Top Floating Badges */}
                    <div className="service-media-top">
                      <span className="service-number-badge">{service.num}</span>
                      <span className="service-category-badge">{service.categoryLabel}</span>
                    </div>

                    {/* Interactive Arrow Disc */}
                    <div className="service-media-arrow">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="7" y1="17" x2="17" y2="7" />
                        <polyline points="7 7 17 7 17 17" />
                      </svg>
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="service-card-body">
                    <h3 className="service-card-title">
                      {service.title} <em className="service-serif">{service.serif}</em>
                    </h3>
                    <p className="service-card-blurb">{service.blurb}</p>

                    {/* Feature Chips */}
                    <div className="service-chips-row">
                      {service.tags.map((tag, tIdx) => (
                        <span className="service-chip" key={tIdx}>
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Link Footer */}
                    <div className="service-card-footer">
                      <span className="service-action-text">Explore service</span>
                      <span className="service-action-icon">→</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom Banner */}
        <div className="services-bottom-banner">
          <div className="bottom-banner-content">
            <div className="bottom-banner-badge">CUSTOM TAILORED ARCHITECTURE</div>
            <h3 className="bottom-banner-title">
              Need a custom software stack or dedicated engineering team?
            </h3>
            <p className="bottom-banner-desc">
              We collaborate closely with founders and enterprises to architect, design, and deploy 
              full-cycle solutions with strict delivery milestones.
            </p>
          </div>
          <div className="bottom-banner-actions">
            <Link to="/contact" className="btn btn-solid bottom-banner-cta">
              Discuss Your Project <span className="arr">→</span>
            </Link>
            <Link to="/services" className="bottom-banner-link">
              View Detailed Scope & Deliverables →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;