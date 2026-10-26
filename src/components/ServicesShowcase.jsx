import React, { useRef } from "react";
import { motion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SHOWCASE = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
    ),
    title: "SEO Services",
    line: "Rank where it",
    line2: "counts",
    img: "/images/new-seo.jpg",
    desc: "Technical audits, keyword strategy and content that steadily climb the rankings — measured, sustainable and built to last.",
    bullets: ["Technical SEO audits", "Keyword & content strategy", "Local SEO & link building"],
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>
    ),
    title: "Digital Marketing",
    line: "Growth you can",
    line2: "measure",
    img: "/images/new-marketing.jpg",
    desc: "Performance campaigns across Google and Meta, tuned with real data to turn spend into customers.",
    bullets: ["Google & Meta ads", "Landing page funnels", "CRO & attribution"],
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>
    ),
    title: "Software & App Development",
    line: "Products that",
    line2: "scale",
    img: "/images/new-software.jpg",
    desc: "From web apps to native mobile apps — robust architecture, clean code and experiences users love.",
    bullets: ["Full-stack web apps", "iOS & Android", "Cloud & integrations"],
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19 7-7 3 3-7 7-3-3z" /><path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" /><path d="m2 2 7.586 7.586" /><circle cx="11" cy="11" r="2" /></svg>
    ),
    title: "UI/UX Design",
    line: "Interfaces people",
    line2: "understand",
    img: "/images/new-uiux.jpg",
    desc: "Research-backed, accessible and delightful. We turn messy problems into clean, intuitive flows.",
    bullets: ["UX research & flows", "Design systems", "Prototyping & testing"],
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
    ),
    title: "n8n Automation",
    line: "Manual work,",
    line2: "automated",
    img: "/images/new-automation.jpg",
    desc: "We connect your apps and remove repetitive work with n8n workflows — freeing your team for what matters.",
    bullets: ["Workflow automation", "App integrations (400+)", "AI-powered agent flows"],
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" /></svg>
    ),
    title: "AI-Powered Solutions",
    line: "Smarter ways to",
    line2: "work",
    img: "/images/new-ai.jpg",
    desc: "Custom AI assistants, chatbots and content pipelines that bring the power of modern AI into your everyday operations.",
    bullets: ["Custom AI assistants", "Chatbots & copilots", "AI content pipelines"],
  },
];

export function ServicesShowcase() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  React.useEffect(() => {
    const ctx = gsap.context(() => {

      // parallax on each showcase image
      gsap.utils.toArray("[data-parallax]").forEach((el) => {
        gsap.fromTo(
          el.querySelector("img"),
          { y: -30 },
          {
            y: 30,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      });

      // staggered reveal of showcase rows
      gsap.utils.toArray("[data-show-row]").forEach((row, i) => {
        gsap.from(row, {
          y: 70,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: row,
            start: "top 85%",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section showcase-section" id="deep-services" ref={sectionRef}>
      {/* Compact Services Movement Band (height reduced, live continuous movement) */}
      <div className="world-band services-movement-band" ref={contentRef}>
        <div className="world-band-glow" />
        <div className="services-movement-inner">
          <div className="services-movement-track">
            {[0, 1].map((setIdx) => (
              <span className="services-movement-group" key={setIdx}>
                {[
                  "Website & Web App Development",
                  "iOS & Android Mobile Applications",
                  "Custom Enterprise ERP Systems",
                  "Technical SEO & Search Visibility",
                  "Performance Marketing & Ads",
                  "UI/UX Product Design Systems",
                  "n8n Workflow Automation",
                  "AI Assistants & Copilots",
                  "Cloud Infrastructure & DevOps",
                ].map((item, i) => (
                  <span className="services-movement-item" key={i}>
                    <span className="srv-spark">✦</span>
                    <span className="srv-name">{item}</span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="wrap showcase-list">
        {SHOWCASE.map((s) => (
          <div className="showcase-row" key={s.title} data-show-row>
            <div className="showcase-media" data-parallax>
              <img src={s.img} alt={s.title} loading="lazy" />
              <span className="showcase-index">{s.icon}</span>
            </div>
            <div className="showcase-text">
              <span className="eyebrow">
                <span className="eyebrow-spark">✦</span>
                <span>{s.title}</span>
              </span>
              <h3 className="showcase-title">
                {s.line} <em className="italic-serif">{s.line2}</em>
              </h3>
              <p>{s.desc}</p>
              <ul>
                {s.bullets.map((b) => (
                  <li key={b}>
                    <span className="tick">✦</span> {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}