import React, { useRef, useState, useCallback } from "react";
import "./reactbits.css";

/**
 * ReactBits SpotlightCard Component
 * Displays a dynamic luminous spotlight effect tracking the mouse pointer.
 */
export default function SpotlightCard({
  children,
  className = "",
  contentClassName = "",
  spotlightColor = "rgba(8, 125, 193, 0.16)",
  spotlightSize = 340,
  style = {},
  ...props
}) {
  const cardRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      setPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    },
    []
  );

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`spotlight-card ${className}`}
      style={style}
      {...props}
    >
      <div
        className="spotlight-card-spotlight"
        style={{
          background: `radial-gradient(${spotlightSize}px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`,
          opacity: isHovered ? 1 : 0,
        }}
      />
      <div className={`spotlight-card-content ${contentClassName}`}>{children}</div>
    </div>
  );
}
