import { headers } from "next/headers";

async function getProducts() {
  const h = headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "http";
  const url = `${proto}://${host}/api/products`;

  const res = await fetch(url, { cache: "no-store" }); // or next: { revalidate: 0 }
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export default async function DashboardProducts() {
  const products = await getProducts();
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Products</h1>
      <div className="overflow-x-auto border rounded">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-left text-blue-950">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Brand</th>
              <th className="p-3">Price</th>
              <th className="p-3">Thumbnail</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id} className="border-t">
                <td className="p-3">{p.name}</td>
                <td className="p-3">{p.brand || "-"}</td>
                <td className="p-3">${p.price}</td>
                <td className="p-3">
                  {p.thumbnail ? (
                    <img src={p.thumbnail} alt={p.name} className="h-10 w-14 object-cover rounded" />
                  ) : (
                    "-"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
