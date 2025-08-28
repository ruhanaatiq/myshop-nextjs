// src/app/page.js
import Link from "next/link";
import HeroSlider from "@/components/HeroSlider";
import FeatureCards from "@/components/FeatureCards";
import StatsStrip from "@/components/StatsStrip";

export default function HomePage() {
  return (
    <div className="bg-base-100 text-base-content">
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-3">Welcome to MyShop</h1>
        <p className="mb-6 text-base-content/70">
          Browse our products, and after logging in, you will be able to add your own.
        </p>
        <div className="flex gap-3">
          <Link href="/products" className="btn btn-outline border-primary text-primary hover:bg-primary hover:text-white px-2 py-2">
            View Products
          </Link>
        
        </div>
      </section>

      {/* Banner */}
      <HeroSlider />

        {/* Product Highlights (animated) */}
      <FeatureCards></FeatureCards>

      {/* Stats (count-up) */}
      <StatsStrip></StatsStrip>
    </div>
  );
}
