"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const slides = [
  { src: "/photo-camera-still-life.jpg", h1: "Big Sale Today!", p: "Grab the best deals before they’re gone.", cta: { href: "/products", label: "Shop Now" } },
  { src: "/top-view-photo-camera-indoors-still-life.jpg", h1: "New Arrivals", p: "Fresh styles, fresh picks.", cta: { href: "/products?tag=new", label: "Explore" } },
  { src: "/professional-camera-blurred.jpg", h1: "Member Perks", p: "Extra 10% off after login.", cta: { href: "/login", label: "Sign In" } },
];

export default function HeroSlider({ interval = 4000 }) {
  const [index, setIndex] = useState(0);
  const timer = useRef(null);

  const goto = (i) => setIndex((i + slides.length) % slides.length);
  const next = () => goto(index + 1);
  const prev = () => goto(index - 1);

  // autoplay
  useEffect(() => {
    timer.current = setInterval(next, interval);
    return () => clearInterval(timer.current);
  }, [index, interval]);

  // pause on hover
  const pause = () => clearInterval(timer.current);
  const resume = () => (timer.current = setInterval(next, interval));

  return (
    <section
      className="relative w-full h-[400px] md:h-[520px] overflow-hidden"
      onMouseEnter={pause}
      onMouseLeave={resume}
      aria-roledescription="carousel"
    >
      {/* track */}
      <div
        className="h-full flex transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((s, i) => (
          <div key={i} className="relative w-full shrink-0 h-full">
            <Image src={s.src} alt={s.h1} fill className="object-cover" priority={i === 0} />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
              <h2 className="text-3xl md:text-5xl font-bold mb-3">{s.h1}</h2>
              <p className="text-base md:text-lg mb-6 opacity-90">{s.p}</p>
              {s.cta && (
                <Link href={s.cta.href} className="bg-white text-black px-6 py-3 rounded font-semibold">
                  {s.cta.label}
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* arrows */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white px-3 py-2"
      >
        ‹
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white px-3 py-2"
      >
        ›
      </button>

      {/* dots */}
      <div className="absolute bottom-4 w-full flex justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goto(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2.5 w-2.5 rounded-full ${i === index ? "bg-white" : "bg-white/60 hover:bg-white/80"}`}
          />
        ))}
      </div>
    </section>
  );
}
