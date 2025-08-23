// src/app/page.js
import Link from "next/link";
import Image from "next/image";
import HeroSlider from "@/components/HeroSlider";

export default function HomePage() {
  return (
    <div>
     
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-3">Welcome to MyShop</h1>
        <p className="text-gray-600 mb-6">
          Browse our products, and after logging in, manage your own.
        </p>
        <div className="flex gap-3">
          <Link href="/products" className="px-4 py-2 bg-black text-white rounded">
            View Products
          </Link>
          <Link href="/login" className="px-4 py-2 border rounded">
            Login
          </Link>
        </div>
      </section>

  {/* 🔹 Banner Section */}
<HeroSlider></HeroSlider>      
      {/* Product Highlights */}
      <section className="bg-gray-50 border-y">
        <div className="max-w-5xl mx-auto px-4 py-12 grid gap-6 sm:grid-cols-3">
          <div className="rounded border p-4 bg-white">
            <h3 className="font-semibold mb-1 text-blue-950">Fast & Simple</h3>
            <p className="text-sm text-gray-600">Next.js App Router + Tailwind.</p>
          </div>
          <div className="rounded border p-4 bg-white">
            <h3 className="font-semibold mb-1 text-blue-950">Public Pages</h3>
            <p className="text-sm text-gray-600">Landing, product list, details.</p>
          </div>
          <div className="rounded border p-4 bg-white">
            <h3 className="font-semibold mb-1 text-blue-950">Protected Dashboard</h3>
            <p className="text-sm text-gray-600">Add products after sign-in.</p>
          </div>
        </div>
      </section>
      <section className="py-16 bg-gray-100">
  <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
    <div>
      <h3 className="text-3xl font-bold text-blue-600">500+</h3>
      <p className="text-gray-600">Products Available</p>
    </div>
    <div>
      <h3 className="text-3xl font-bold text-blue-600">1,200+</h3>
      <p className="text-gray-600">Happy Customers</p>
    </div>
    <div>
      <h3 className="text-3xl font-bold text-blue-600">24/7</h3>
      <p className="text-gray-600">Support</p>
    </div>
  </div>
</section>
    </div>
  );
}
