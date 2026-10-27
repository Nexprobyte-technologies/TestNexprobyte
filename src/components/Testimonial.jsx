import React from "react";
import { motion } from "motion/react";
import { FadeIn } from "./Reveal.jsx";
import { PlatformRatings } from "./PlatformRatings.jsx";

const EASE = [0.22, 1, 0.36, 1];

// Clean SVGs (zero emojis)
const StarIcon = ({ filled = true }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill={filled ? "#F07816" : "none"} stroke="#F07816" strokeWidth="1.5">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const PinIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 21s-6-5.373-6-10a6 6 0 0 1 12 0c0 4.627-6 10-6 10z" />
    <circle cx="12" cy="11" r="2" />
  </svg>
);

const QuoteIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" opacity="0.12">
    <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
  </svg>
);

const REVIEWS = [
  {
    name: "Rajesh Kumar",
    company: "RK Textiles",
    city: "Tirupur",
    rating: 5,
    initials: "RK",
    color: "#F07816",
    text: "Nexprobyte team sema fast da! E-commerce portal 45 days la mudichitanga. En sales 3x increase aayiduchu. Support also super, night 10PM ku kooda reply pannuvanga.",
  },
  {
    name: "Dr. Priya S.",
    company: "Care Hospital",
    city: "Coimbatore",
    rating: 5,
    initials: "DP",
    color: "#087DC1",
    text: "Hospital software super-uh irukku. Appointment to billing full automate pannitanga. Staff training also gave properly. Now 25 clinics use same system, no tension.",
  },
  {
    name: "Arun M.",
    company: "Spice Route Restaurants",
    city: "Chennai & Coimbatore",
    rating: 5,
    initials: "AM",
    color: "#12385F",
    text: "App sema smooth. Customer order pannina direct kitchen la display varuthu. 10k+ downloads in 3 months! Coimbatore team but Chennai la irundhu work panna easy.",
  },
  {
    name: "Senthil Velan",
    company: "Salem Properties",
    city: "Salem",
    rating: 5,
    initials: "SV",
    color: "#F07816",
    text: "Real estate portal la 500+ listings irukku. Clients Google la search panni en site thaan varuthu. SEO work vera level. Lead quality improve aayiduchu, thanks Nexprobyte!",
  },
  {
    name: "Mohan Babu",
    company: "Erode Weaving Mills",
    city: "Erode",
    rating: 5,
    initials: "MB",
    color: "#12385F",
    text: "Textile ERP nala en 50+ factory management easy aayiduchu. Yarn stock to delivery tracking full digital. Before Excel la thaan, ippo one-click report. Worth every rupee.",
  },
  {
    name: "Karthik Pandian",
    company: "Madurai Scholars Academy",
    city: "Madurai",
    rating: 5,
    initials: "KP",
    color: "#087DC1",
    text: "LMS platform la 5000 students padikiranga. Live class, test, doubt section ellam irukku. Parents app la progress pakalam. Students ku pidichirukku, fees collection 2x fast!",
  },
];

export function Testimonial() {
  return (
    <section className="section reviews-section" id="reviews">
      <div className="wrap">
        {/* Top Header Block */}
        <div className="reviews-header-row">
          <div>
            <div className="reviews-eyebrow">
              <span className="reviews-status-dot"></span>
              <span>CLIENT LOVE • TAMIL NADU WIDE</span>
            </div>
            <h2 className="reviews-title">
              What Our Clients Say <br />
              <span className="reviews-title-accent">Across Tamil Nadu</span>
            </h2>
          </div>

          <div className="reviews-verified-pill">
            <div className="verified-pill-dot"></div>
            <div>
              <div className="verified-pill-score">4.9/5 Overall Rating</div>
              <div className="verified-pill-sub">Verified on Google, Clutch, Justdial & Facebook</div>
            </div>
          </div>
        </div>

        {/* Platform Ratings Options (Google, Clutch, Justdial, Facebook, Trustpilot) */}
        <PlatformRatings />

        <div className="reviews-sub-note">
          <span className="sub-note-badge">Tanglish reviews • Real clients • Verified business outcomes</span>
        </div>

        {/* 6 Reviews Grid */}
        <div className="reviews-grid">
          {REVIEWS.map((rev, i) => (
            <motion.div
              key={rev.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: EASE }}
              className="review-card"
            >
              <div className="review-card-inner">
                {/* Reviewer Header */}
                <div className="review-header">
                  <div className="reviewer-info">
                    <div className="reviewer-avatar" style={{ background: rev.color }}>
                      {rev.initials}
                    </div>
                    <div>
                      <div className="reviewer-name">{rev.name}</div>
                      <div className="reviewer-company">{rev.company}</div>
                      <div className="reviewer-city">
                        <PinIcon /> {rev.city}
                      </div>
                    </div>
                  </div>
                  <div className="review-quote-icon">
                    <QuoteIcon />
                  </div>
                </div>

                {/* Star Rating */}
                <div className="review-stars">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <StarIcon key={idx} filled={idx < rev.rating} />
                  ))}
                </div>

                {/* Review Text */}
                <p className="review-text">"{rev.text}"</p>

                {/* Verified Footer */}
                <div className="review-card-footer">
                  <span className="review-verified-badge">VERIFIED CLIENT • 2024</span>
                  <span className="review-rating-check">5.0 Star Rating</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}