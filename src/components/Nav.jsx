import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Magnetic from "./reactbits/Magnetic.jsx";

// Clean SVGs for navigation (zero emojis)
const NavCodeIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
);
const NavGlobeIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" x2="22" y1="12" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
);
const NavMobileIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>
);
const NavAppIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="18" height="14" x="3" y="3" rx="2"/><line x1="3" x2="21" y1="9" y2="9"/><line x1="9" x2="9" y1="21" y2="9"/></svg>
);
const NavDesignIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19 7-7 3 3-7 7-3-3z"/><path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="m2 2 7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>
);
const NavBrandIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/></svg>
);
const NavGrowthIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
);
const NavCloudIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M12 12v9"/><path d="m8 17 4 4 4-4"/></svg>
);
const NavDownloadIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
);
const NavLinkIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
);
const NavBriefcaseIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
);
const NavFolderIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/></svg>
);
const NavDocIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/></svg>
);
const NavLightbulbIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-7 7c0 2.5 1.5 4.5 3 6h8c1.5-1.5 3-3.5 3-6a7 7 0 0 0-7-7z"/></svg>
);
const MailIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: 6, verticalAlign: "-2px" }}><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
);
const PhoneIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: 6, verticalAlign: "-2px" }}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
);

const NavHomeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
);
const NavAboutIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);
const NavWhatWeDoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
);
const NavResourcesIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
);
const NavContactIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
);

const NAV_ITEMS = [
  { label: "Home", to: "/", icon: <NavHomeIcon /> },
  { label: "About", to: "/about", icon: <NavAboutIcon /> },
  {
    id: "services-products",
    label: "What We Do",
    icon: <NavWhatWeDoIcon />,
    isDropdown: true,
    activePrefixes: ["/services"],
    sections: [
      {
        title: "Services",
        items: [
          { label: "All Services", to: "/services", icon: <NavCodeIcon /> },
          { label: "Website Development", to: "/services/website-development", icon: <NavGlobeIcon /> },
          { label: "Mobile App Development", to: "/services/mobile-app-development", icon: <NavMobileIcon /> },
          { label: "Application Development", to: "/services/application-development", icon: <NavAppIcon /> },
          { label: "UI/UX Design", to: "/services/ui-ux-design", icon: <NavDesignIcon /> },
          { label: "Branding & Identity", to: "/services/branding-identity", icon: <NavBrandIcon /> },
          { label: "Digital Marketing & SEO", to: "/services/digital-marketing", icon: <NavGrowthIcon /> },
        ],
      },
      {
        title: "Our Products",
        items: [
          { label: "GO Drive", href: "#", icon: <NavCloudIcon />, isExternal: true },
          { label: "Download Android App", href: "#", icon: <NavDownloadIcon />, isExternal: true },
          { label: "Visit Site", href: "#", icon: <NavLinkIcon />, isExternal: true },
        ],
      },
    ],
  },
  {
    id: "careers-blog",
    label: "Resources",
    icon: <NavResourcesIcon />,
    isDropdown: true,
    activePrefixes: ["/careers", "/blog"],
    sections: [
      {
        title: "Careers",
        items: [
          {
            label: "Explore Opportunities",
            to: "/careers",
            icon: <NavBriefcaseIcon />,
            subtext: "Open tech roles & engineering positions",
          },
          {
            label: "Apply for a Role",
            to: "/careers",
            icon: <NavFolderIcon />,
            subtext: "Join our Coimbatore digital team",
          },
          {
            label: "Collect Interview Data",
            to: "/interview-data",
            icon: <NavDocIcon />,
            subtext: "Submit your details for an interview slot",
          },
        ],
      },
      {
        title: "Blog & Insights",
        items: [
          {
            label: "Tech & Case Studies",
            to: "/blog",
            icon: <NavDocIcon />,
            subtext: "Articles, insights & industry stories",
          },
          {
            label: "Digital Trends",
            to: "/blog",
            icon: <NavLightbulbIcon />,
            subtext: "SEO, AI & Modern Web Development",
          },
        ],
      },
    ],
  },
  { label: "Contact", to: "/contact", icon: <NavContactIcon /> },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState({});
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [open]);

  // Close mobile menu & dropdowns on route changes
  useEffect(() => {
    setOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  const toggleMobileGroup = (id) => {
    setMobileExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <>
      <header className={`nav ${scrolled ? "is-scrolled" : ""}`}>
        <div className="wrap nav-inner">
          <motion.span
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link to="/" className="logo" onClick={() => setOpen(false)}>
              <img
                src="/images/nxtpro-logo.png"
                alt="Nexprobyte"
                className="logo-img"
              />
            </Link>
          </motion.span>

          {/* Desktop Navigation */}
          <div className="nav-desktop">
            <div className="nav-contact">
              <a href="mailto:info@nexprobyte.com">
                <MailIcon />
                info@nexprobyte.com
              </a>
              <span className="nav-contact-sep">|</span>
              <a href="tel:+919500042426">
                <PhoneIcon />
                +91 95000 42426
              </a>
            </div>
            <hr className="nav-hr" />
            <nav className="nav-links" aria-label="Main">
              {NAV_ITEMS.map((item, i) =>
                item.isDropdown ? (
                  <motion.span
                    key={item.id}
                    initial={{ opacity: 0, y: -16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.05 * i + 0.1, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div
                      className={`nav-dropdown-wrapper ${activeDropdown === item.id ? "is-open" : ""}`}
                      onMouseEnter={() => setActiveDropdown(item.id)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <button
                        className={`nav-link nav-dropdown-btn ${
                          item.activePrefixes?.some((p) => location.pathname.startsWith(p))
                            ? "is-active"
                            : ""
                        }`}
                        aria-expanded={activeDropdown === item.id}
                        type="button"
                        onClick={() =>
                          setActiveDropdown((curr) => (curr === item.id ? null : item.id))
                        }
                      >
                        {item.label}
                        <span className={`nav-caret ${activeDropdown === item.id ? "is-open" : ""}`}>
                          ▼
                        </span>
                      </button>

                      <AnimatePresence>
                        {activeDropdown === item.id && (
                          <motion.div
                            className={`nav-dropdown ${
                              item.sections.length > 1 ? "nav-dropdown--wide" : ""
                            }`}
                            initial={{ opacity: 0, y: 10, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.98 }}
                            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                          >
                            {item.sections.map((sec, sIdx) => (
                              <div key={sec.title || sIdx} className="nav-dropdown-section">
                                {sec.title && (
                                  <div className="nav-dropdown-section-title">{sec.title}</div>
                                )}
                                <div className="nav-dropdown-items-group">
                                  {sec.items.map((sub) =>
                                    sub.isExternal ? (
                                      <a
                                        key={sub.label}
                                        href={sub.href}
                                        className="nav-dropdown-link"
                                        onClick={() => setActiveDropdown(null)}
                                      >
                                        <div className="nav-dropdown-link-left">
                                          <span className="nav-dropdown-icon">{sub.icon}</span>
                                          <div>
                                            <span className="nav-dropdown-label">{sub.label}</span>
                                            {sub.subtext && (
                                              <span className="nav-dropdown-subtext">
                                                {sub.subtext}
                                              </span>
                                            )}
                                          </div>
                                        </div>
                                        <span className="arr">→</span>
                                      </a>
                                    ) : (
                                      <Link
                                        key={sub.label}
                                        to={sub.to}
                                        className="nav-dropdown-link"
                                        onClick={() => setActiveDropdown(null)}
                                      >
                                        <div className="nav-dropdown-link-left">
                                          <span className="nav-dropdown-icon">{sub.icon}</span>
                                          <div>
                                            <span className="nav-dropdown-label">{sub.label}</span>
                                            {sub.subtext && (
                                              <span className="nav-dropdown-subtext">
                                                {sub.subtext}
                                              </span>
                                            )}
                                          </div>
                                        </div>
                                        <span className="arr">→</span>
                                      </Link>
                                    )
                                  )}
                                </div>
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.span>
                ) : (
                  <motion.span
                    key={item.to}
                    initial={{ opacity: 0, y: -16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.05 * i + 0.1, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <NavLink
                      to={item.to}
                      className={({ isActive }) => `nav-link ${isActive ? "is-active" : ""}`}
                    >
                      {item.label}
                    </NavLink>
                  </motion.span>
                )
              )}
            </nav>
          </div>

          {/* Right Hamburger / CTA Area */}
          <div className="nav-right">
            <Magnetic strength={16} radius={65}>
              <Link to="/contact" className="nav-cta-btn">
                <span>Get a Quote</span>
                <span className="nav-cta-arrow">→</span>
              </Link>
            </Magnetic>
            <button
              className="menu-btn"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              type="button"
            >
              <span className="menu-btn-icon">
                <span className="bar"></span>
                <span className="bar"></span>
              </span>
              <span className="menu-btn-label">Menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Navigation Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="mobile-menu-panel"
              initial={{ y: "-100%" }}
              animate={{ y: "0%" }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Mobile Header Top */}
              <div className="mobile-menu-head">
                <Link to="/" className="logo" onClick={() => setOpen(false)}>
                  <img
                    src="/images/nxtpro-logo.png"
                    alt="Nexprobyte"
                    className="logo-img"
                  />
                </Link>
                <button
                  type="button"
                  className="mobile-menu-close"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                >
                  <span>✕</span>
                  <span style={{ fontSize: 13, fontWeight: 700, marginLeft: 6 }}>Close</span>
                </button>
              </div>

              {/* Mobile Scrollable Menu Links */}
              <div className="mobile-menu-body">
                <nav className="mobile-nav-list">
                  {NAV_ITEMS.map((item, i) => (
                    <motion.div
                      key={item.label}
                      className="mobile-nav-item"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.08 + i * 0.04, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {item.isDropdown ? (
                        <div className="mobile-product-group">
                          <button
                            type="button"
                            className="mobile-link mobile-product-btn"
                            onClick={() => toggleMobileGroup(item.id)}
                          >
                            <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
                              <span className="mobile-item-icon">{item.icon}</span>
                              {item.label}
                            </span>
                            <span
                              className={`mobile-caret ${mobileExpanded[item.id] ? "is-open" : ""}`}
                            >
                              {mobileExpanded[item.id] ? "−" : "+"}
                            </span>
                          </button>

                          <AnimatePresence>
                            {mobileExpanded[item.id] && (
                              <motion.div
                                className="mobile-sub"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.25 }}
                              >
                                {item.sections.map((sec, sIdx) => (
                                  <div key={sec.title || sIdx} style={{ marginBottom: 12 }}>
                                    {sec.title && (
                                      <div
                                        style={{
                                          fontSize: 11,
                                          fontWeight: 700,
                                          letterSpacing: "0.08em",
                                          textTransform: "uppercase",
                                          color: "var(--accent)",
                                          marginBottom: 6,
                                        }}
                                      >
                                        {sec.title}
                                      </div>
                                    )}
                                    {sec.items.map((sub) =>
                                      sub.isExternal ? (
                                        <a
                                          key={sub.label}
                                          href={sub.href}
                                          className="mobile-sub-link"
                                          onClick={() => setOpen(false)}
                                        >
                                          <span style={{ marginRight: 8, display: "inline-flex" }}>{sub.icon}</span>
                                          <span>{sub.label}</span>
                                          <span className="arr">→</span>
                                        </a>
                                      ) : (
                                        <Link
                                          key={sub.label}
                                          to={sub.to}
                                          className="mobile-sub-link"
                                          onClick={() => setOpen(false)}
                                        >
                                          <span style={{ marginRight: 8, display: "inline-flex" }}>{sub.icon}</span>
                                          <span>{sub.label}</span>
                                          <span className="arr">→</span>
                                        </Link>
                                      )
                                    )}
                                  </div>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <NavLink
                          to={item.to}
                          className={({ isActive }) =>
                            `mobile-link ${isActive ? "is-active" : ""}`
                          }
                          onClick={() => setOpen(false)}
                          style={{ display: "inline-flex", alignItems: "center", gap: 10 }}
                        >
                          <span className="mobile-item-icon">{item.icon}</span>
                          {item.label}
                        </NavLink>
                      )}
                    </motion.div>
                  ))}
                </nav>

                {/* Mobile Bottom CTA & Quick Contacts */}
                <div className="mobile-menu-footer">
                  <Link
                    to="/contact"
                    className="btn btn-solid mobile-cta-btn"
                    onClick={() => setOpen(false)}
                  >
                    Get a quote <span className="arr">→</span>
                  </Link>

                  <div className="mobile-contacts-row">
                    <a href="tel:+919500042426" className="mobile-contact-pill">
                      <PhoneIcon />
                      +91 95000 42426
                    </a>
                    <a href="mailto:info@nexprobyte.com" className="mobile-contact-pill">
                      <MailIcon />
                      info@nexprobyte.com
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}