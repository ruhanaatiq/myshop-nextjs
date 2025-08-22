// Shows: name (title) + brand + price + description
import Link from "next/link";
import dbConnect from "@/lib/mongoose";
import Product from "@/models/Product";
import mongoose from "mongoose";

export default async function ProductDetails({ params }) {
  const { id } = params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-10">
        <p className="text-red-600">Product not found.</p>
        <Link href="/products" className="underline">Back to products</Link>
      </div>
    );
  }

  await dbConnect();
  const d = await Product.findById(id).lean();
  if (!d) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-10">
        <p className="text-red-600">Product not found.</p>
        <Link href="/products" className="underline">Back to products</Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Link href="/products" className="underline text-sm">&larr; Back</Link>
      <h1 className="text-3xl font-bold mt-2">{d.name}</h1>

      <div className="mt-4 space-y-2">
        <p><span className="font-semibold">Brand:</span> {d.brand || "—"}</p>
        <p><span className="font-semibold">Price:</span> ${Number(d.price).toFixed(2)}</p>
        <p className="mt-4 text-gray-700">{d.description}</p>
      </div>
    </div>
  );
}
