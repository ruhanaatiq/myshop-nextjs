"use client";

import Link from "next/link";

export default function ProductCard({ id, name, price, thumbnail }) {
  const fallback = `https://picsum.photos/seed/${id}/600/400`;

  return (
    <li className="border rounded overflow-hidden bg-white">
      <Link href={`/products/${id}`} className="block">
        <img
          src={thumbnail || fallback}
          alt={name}
          className="w-full h-40 object-cover"
          onError={(e) => {
            e.currentTarget.src = fallback;
          }}
        />
        <div className="p-3">
          <h3 className="font-semibold truncate">{name}</h3>
          <p className="mt-1 font-medium">${Number(price).toFixed(2)}</p>
        </div>
      </Link>
    </li>
  );
}
