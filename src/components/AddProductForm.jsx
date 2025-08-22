"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProductForm() {
  const r = useRouter();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [thumbPreview, setThumbPreview] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    setLoading(true);

    const f = e.currentTarget;
    const name = f.name.value.trim();
    const brand = f.brand.value.trim();
    const description = f.description.value.trim();
    const price = parseFloat(f.price.value);
    const thumbnail = f.thumbnail.value.trim() || null;
    const imagesRaw = f.images.value.trim();
    const images = imagesRaw
      ? imagesRaw.split(",").map((s) => s.trim()).filter(Boolean)
      : [];

    if (!name || !brand || !description || Number.isNaN(price)) {
      setErr("Please fill name, brand, description and a valid price.");
      setLoading(false);
      return;
    }

    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name, brand, description, price,
        category: "gadget",
        thumbnail,
        images,
      }),
    });

    setLoading(false);

    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      setErr(j?.error || "Failed to create product");
      return;
    }

    r.push("/products");
    r.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <input name="name" placeholder="Product name" className="w-full border rounded px-3 py-2" />
      <input name="brand" placeholder="Brand (e.g., Sony)" className="w-full border rounded px-3 py-2" />
      <textarea name="description" placeholder="Description" rows={3} className="w-full border rounded px-3 py-2" />
      <input name="price" type="number" step="0.01" placeholder="Price" className="w-full border rounded px-3 py-2" />

      <input
        name="thumbnail"
        placeholder="Thumbnail image URL (optional)"
        className="w-full border rounded px-3 py-2"
        onChange={(e) => setThumbPreview(e.target.value.trim())}
      />

      {/* quick preview */}
      {thumbPreview && (
        <img
          src={thumbPreview}
          alt="Thumbnail preview"
          className="w-full h-40 object-cover rounded border"
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
      )}

      <textarea
        name="images"
        placeholder="Additional image URLs, comma-separated (optional)"
        rows={2}
        className="w-full border rounded px-3 py-2"
      />

      {err && <p className="text-sm text-red-600">{err}</p>}
      <button disabled={loading} className="px-4 py-2 bg-black text-white rounded">
        {loading ? "Saving..." : "Add Product"}
      </button>
    </form>
  );
}
