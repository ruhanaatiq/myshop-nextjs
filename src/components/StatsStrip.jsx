"use client";
import { useEffect, useRef, useState } from "react";

function useInViewOnce(options = { threshold: 0.3 }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    if (!ref.current || seen) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setSeen(true);
        obs.disconnect();
      }
    }, options);
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [seen, options]);

  return [ref, seen];
}

function CountUp({ to = 100, duration = 1200, prefix = "", suffix = "" }) {
  const [ref, seen] = useInViewOnce();
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!seen) return;
    let start = 0;
    const from = 0;
    const raf = (t) => {
      if (!start) start = t;
      const p = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // cubic easeOut
      setVal(Math.round(from + (to - from) * eased));
      if (p < 1) requestAnimationFrame(raf);
    };
    const id = requestAnimationFrame(raf);
    return () => cancelAnimationFrame(id);
  }, [seen, to, duration]);

  return (
    <div ref={ref} className="text-3xl font-bold text-primary tabular-nums">
      {prefix}{val.toLocaleString()}{suffix}
    </div>
  );
}

export default function StatsStrip() {
  return (
    <section className="py-16 bg-base-200 border-t border-base-300">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="rounded-xl bg-base-100 border border-base-300 p-6 shadow-sm hover:-translate-y-1 transition">
          <div className="mx-auto mb-2 h-10 w-10 rounded-full bg-primary/15 flex items-center justify-center">
            <span className="text-primary text-lg">🛒</span>
          </div>
          <CountUp to={500} suffix="+" />
          <p className="text-base-content/70">Products Available</p>
        </div>

        <div className="rounded-xl bg-base-100 border border-base-300 p-6 shadow-sm hover:-translate-y-1 transition">
          <div className="mx-auto mb-2 h-10 w-10 rounded-full bg-secondary/15 flex items-center justify-center">
            <span className="text-secondary text-lg">🎉</span>
          </div>
          <CountUp to={1200} suffix="+" />
          <p className="text-base-content/70">Happy Customers</p>
        </div>

        <div className="rounded-xl bg-base-100 border border-base-300 p-6 shadow-sm hover:-translate-y-1 transition">
          <div className="mx-auto mb-2 h-10 w-10 rounded-full bg-accent/15 flex items-center justify-center">
            <span className="text-accent text-lg">⚙️</span>
          </div>
          <div className="flex items-baseline justify-center gap-1">
            <CountUp to={24} />
            <span className="text-xl font-semibold text-base-content/70">/7</span>
          </div>
          <p className="text-base-content/70">Support</p>
        </div>
      </div>
    </section>
  );
}
