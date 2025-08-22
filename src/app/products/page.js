// src/app/products/page.js
// Shows: image + name + price, and a "Details" button
import Link from "next/link";
import dbConnect from "@/lib/mongoose";
import Product from "@/models/Product";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  await dbConnect();

  const docs = await Product.find().sort({ createdAt: -1 }).lean();
  const products = docs.map((d) => ({
    id: d._id.toString(),
    name: d.name,
    price: Number(d.price),
    thumbnail: d.thumbnail ?? null,
  }));

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-6">Products</h1>

      {products.length === 0 ? (
        <p className="text-gray-600">No products yet.</p>
      ) : (
        <ul className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
          {products.map((p) => {
            const src = p.thumbnail || `https://picsum.photos/seed/${p.id}/600/400`;
            return (
              <li key={p.id} className="border rounded overflow-hidden bg-white">
                <img src={src} alt={p.name} className="w-full h-40 object-cover" />
                <div className="p-3">
                  <h3 className="font-semibold truncate">{p.name}</h3>
                  <div className="mt-2 flex items-center justify-between">
                    <p className="font-medium">${p.price.toFixed(2)}</p>
                    <Link
                      href={`/products/${p.id}`}
                      className="text-sm underline"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
