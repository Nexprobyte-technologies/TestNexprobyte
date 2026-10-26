import React, { useEffect, useState, useRef } from "react";

/**
 * ReactBits CountUp Component
 * Smoothly animates numbers when entering the viewport.
 */
export default function CountUp({
  to,
  from = 0,
  duration = 1.8,
  prefix = "",
  suffix = "",
  decimals = 0,
  className = "",
}) {
  const [count, setCount] = useState(from);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let startTime = null;

          const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
            // Ease out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = from + (to - from) * easeOut;

            setCount(current);

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setCount(to);
            }
          };

          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [to, from, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
}
