"use client";

export default function FeatureCards() {
  const Card = ({ title, desc, Illustration }) => (
    <div className="group relative rounded-xl border border-base-300 bg-base-100 p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1">
      {/* soft animated glow */}
      <div className="pointer-events-none absolute -top-6 -right-6 h-24 w-24 rounded-full opacity-20 blur-2xl bg-primary/40 transition group-hover:opacity-40" />
      <div className="flex items-start gap-4">
        <div className="shrink-0 mt-1">
          <Illustration />
        </div>
        <div>
          <h3 className="font-semibold text-lg text-primary">{title}</h3>
          <p className="text-sm text-base-content/70">{desc}</p>
        </div>
      </div>
    </div>
  );

  return (
    <section className="bg-base-200 border-y border-base-300">
      <div className="max-w-5xl mx-auto px-4 py-12 grid gap-6 sm:grid-cols-3">
        <Card
          title="Fast & Simple"
          desc="SSR/ISR friendly. Lean UI powered by Next.js App Router + Tailwind."
          Illustration={Rocket}
        />
        <Card
          title="Public Pages"
          desc="Landing, product list & details — optimized for crawl & share."
          Illustration={Layers}
        />
        <Card
          title="Protected Dashboard"
          desc="Role-aware routes with secure actions after sign-in."
          Illustration={Shield}
        />
      </div>
    </section>
  );
}

/* --- Minimal inline SVGs with tiny motion --- */
function Rocket() {
  return (
    <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
      <svg
        className="h-8 w-8 transition-transform duration-300 group-hover:-translate-y-1"
        viewBox="0 0 24 24" fill="none" stroke="currentColor"
      >
        <path d="M5 13c-1 3-1 5-1 5s2 0 5-1l10-10a5 5 0 0 0-7-7L5 13z" strokeWidth="1.5"/>
        <path d="M15 9l-6 6" strokeWidth="1.5"/>
        <path d="M5 13l6 6" strokeWidth="1.5"/>
        <circle cx="16" cy="8" r="1.5" />
      </svg>
    </div>
  );
}

function Layers() {
  return (
    <div className="p-3 rounded-xl bg-secondary/10 border border-secondary/20">
      <svg
        className="h-8 w-8 transition-transform duration-300 group-hover:rotate-3"
        viewBox="0 0 24 24" fill="none" stroke="currentColor"
      >
        <path d="M12 3l9 4.5-9 4.5L3 7.5 12 3z" strokeWidth="1.5"/>
        <path d="M21 12l-9 4.5L3 12" strokeWidth="1.5"/>
        <path d="M21 16.5l-9 4.5-9-4.5" strokeWidth="1.5"/>
      </svg>
    </div>
  );
}

function Shield() {
  return (
    <div className="p-3 rounded-xl bg-accent/10 border border-accent/20">
      <svg
        className="h-8 w-8 transition-transform duration-300 group-hover:scale-105"
        viewBox="0 0 24 24" fill="none" stroke="currentColor"
      >
        <path d="M12 3l7 3v6c0 4.5-3 8.5-7 9-4-0.5-7-4.5-7-9V6l7-3z" strokeWidth="1.5"/>
        <path d="M9.5 12.5l2 2 4-4" strokeWidth="1.5"/>
      </svg>
    </div>
  );
}
