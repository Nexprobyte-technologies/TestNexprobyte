import React, { useRef, useState, useEffect } from "react";
import "./reactbits.css";

/**
 * ReactBits Magnetic Component
 * Pulls elements toward cursor with smooth spring physics.
 */
export default function Magnetic({
  children,
  strength = 28, // Max offset in px
  radius = 90,   // Active hover distance in px
  className = "",
}) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);

      if (dist < radius) {
        const factor = (1 - dist / radius);
        const offsetX = ((e.clientX - centerX) / (rect.width / 2)) * strength * factor;
        const offsetY = ((e.clientY - centerY) / (rect.height / 2)) * strength * factor;
        setPosition({ x: offsetX, y: offsetY });
      } else {
        setPosition({ x: 0, y: 0 });
      }
    };

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (el) el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [strength, radius]);

  return (
    <div
      ref={ref}
      className={`magnetic-wrap ${className}`}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: position.x === 0 && position.y === 0
          ? "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)"
          : "transform 0.15s ease-out",
      }}
    >
      {children}
    </div>
  );
}
