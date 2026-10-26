import React from "react";
import "./reactbits.css";

/**
 * ReactBits ShinyText Component
 * Applies a smooth metallic/luminous sheen sweep across text.
 */
export default function ShinyText({
  children,
  className = "",
  theme = "default", // 'default' (navy/blue) or 'white'
  speed = 4,
  style = {},
}) {
  const themeClass = theme === "white" ? "shiny-text-white" : "shiny-text";

  return (
    <span
      className={`${themeClass} ${className}`}
      style={{
        animationDuration: `${speed}s`,
        ...style,
      }}
    >
      {children}
    </span>
  );
}
