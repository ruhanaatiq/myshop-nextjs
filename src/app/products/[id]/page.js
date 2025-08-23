// src/app/products/[id]/page.js
import Link from "next/link";
import dbConnect from "@/lib/mongoose";
import Product from "@/models/Product";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Simple ObjectId validator (no mongoose import needed)
const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);

export default async function ProductDetails({ params }) {
  const { id } = params;

  if (!isValidObjectId(id)) {
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

  const price =
    typeof d.price === "number"
      ? d.price.toFixed(2)
      : Number(d.price || 0).toFixed(2);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Link href="/products" className="underline text-sm">&larr; Back</Link>

      <h1 className="text-3xl font-bold mt-2">{d.name}</h1>

      <div className="mt-4 space-y-2">
        <p><span className="font-semibold">Brand:</span> {d.brand || "—"}</p>
        <p><span className="font-semibold">Price:</span> ${price}</p>

        {d.thumbnail && (
          <div className="mt-4">
            <img
              src={d.thumbnail}
              alt={d.name}
              className="h-48 w-72 object-cover rounded border"
            />
          </div>
        )}

        {d.description && (
          <p className="mt-4 text-gray-700">{d.description}</p>
        )}
      </div>
    </div>
  );
}
