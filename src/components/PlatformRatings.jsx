import React from "react";
import { motion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1];

// 1. Google 4-Color SVG Icon
const GoogleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
    />
  </svg>
);

// 2. Clutch SVG Icon
const ClutchIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 3C7.03 3 3 7.03 3 12s4.03 9 9 9c3.8 0 7.05-2.36 8.35-5.73a1.2 1.2 0 0 0-1.12-1.63h-1.5c-.52 0-.98.34-1.13.84C15.82 17.2 14.04 18.5 12 18.5c-3.59 0-6.5-2.91-6.5-6.5S8.41 5.5 12 5.5c2.04 0 3.82 1.3 4.6 3.02.15.5.61.84 1.13.84h1.5a1.2 1.2 0 0 0 1.12-1.63C19.05 5.36 15.8 3 12 3z"
      fill="#FFFFFF"
    />
  </svg>
);

// 3. Justdial Text Logo
const JustdialIcon = () => (
  <span
    style={{
      color: "#FFFFFF",
      fontWeight: 900,
      fontSize: "17px",
      letterSpacing: "-0.5px",
      fontFamily: "system-ui, -apple-system, sans-serif",
      lineHeight: 1,
    }}
  >
    JD
  </span>
);

// 4. Facebook SVG Icon
const FacebookIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="#1877F2">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

// 5. Trustpilot SVG Icon
const TrustpilotIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="#00B67A">
    <path d="m12 1.5 3.09 6.26 6.91 1-5 4.87 1.18 6.87L12 17.27l-6.18 3.23 1.18-6.87-5-4.87 6.91-1L12 1.5z" />
    <path d="M15.09 7.76 12 1.5v15.77l6.18 3.23-1.18-6.87 5-4.87-6.91-1z" fill="#005128" opacity="0.25" />
  </svg>
);

// Gold Star SVG
const StarIcon = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#F59E0B" stroke="#F59E0B" strokeWidth="1">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

// Arrow Right SVG
const ArrowIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

export const PLATFORM_RATINGS = [
  {
    id: "google",
    name: "Google",
    subtitle: "Google Business Reviews",
    rating: "5.0",
    stars: 5,
    isPrimary: true,
    badgeText: "PRIMARY PLATFORM",
    iconType: "google",
    icon: <GoogleIcon />,
    linkText: "View on Google",
    url: "https://maps.google.com/?q=Nexprobyte+Technologies+Coimbatore",
  },
  {
    id: "clutch",
    name: "Clutch",
    subtitle: "B2B Ratings & Reviews",
    rating: "5.0",
    stars: 5,
    isPrimary: false,
    iconType: "clutch",
    icon: <ClutchIcon />,
    linkText: "View on Clutch",
    url: "https://clutch.co/profile/nexprobyte",
  },
  {
    id: "justdial",
    name: "Justdial",
    subtitle: "Business Directory & Reviews",
    rating: "4.8",
    stars: 5,
    ratingsCount: "317 Ratings",
    isPrimary: false,
    iconType: "justdial",
    icon: <JustdialIcon />,
    linkText: "View on Justdial",
    url: "https://www.justdial.com/Coimbatore/Nexprobyte-Technologies",
  },
  {
    id: "facebook",
    name: "Facebook",
    subtitle: "Official Page",
    rating: "4.8",
    stars: 5,
    isPrimary: false,
    iconType: "facebook",
    icon: <FacebookIcon />,
    linkText: "View on Facebook",
    url: "https://www.facebook.com/nexprobyte",
  },
  {
    id: "trustpilot",
    name: "Trustpilot",
    subtitle: "Verified Platform Reviews",
    rating: "4.9",
    stars: 5,
    isPrimary: false,
    iconType: "trustpilot",
    icon: <TrustpilotIcon />,
    linkText: "View on Trustpilot",
    url: "https://www.trustpilot.com/review/nexprobyte.com",
  },
];

export function PlatformRatings({ platforms = PLATFORM_RATINGS }) {
  return (
    <div className="platform-ratings-wrapper">
      <div className="platform-ratings-track">
        {platforms.map((platform, idx) => (
          <motion.div
            key={platform.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: idx * 0.08, ease: EASE }}
            className={`platform-rating-card ${platform.isPrimary ? "is-primary" : ""}`}
          >
            {/* Primary Platform Top Pill */}
            {platform.isPrimary && platform.badgeText && (
              <div className="platform-card-badge">{platform.badgeText}</div>
            )}

            {/* Platform Brand Header */}
            <div className="platform-card-header">
              <div className={`platform-icon-box ${platform.iconType}`}>
                {platform.icon}
              </div>
              <div>
                <div className="platform-card-title">{platform.name}</div>
                <div className="platform-card-subtitle">{platform.subtitle}</div>
              </div>
            </div>

            {/* Rating Score and Stars */}
            <div className="platform-card-body">
              <div className="platform-rating-row">
                <span className="platform-rating-number">{platform.rating}</span>
                <div className="platform-stars-wrap">
                  {Array.from({ length: platform.stars }).map((_, sIdx) => (
                    <StarIcon key={sIdx} />
                  ))}
                </div>
              </div>

              {platform.ratingsCount && (
                <div className="platform-meta-count">{platform.ratingsCount}</div>
              )}
            </div>

            {/* View on Platform Link */}
            <a
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className="platform-card-action"
            >
              <span>{platform.linkText}</span>
              <ArrowIcon />
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default PlatformRatings;
