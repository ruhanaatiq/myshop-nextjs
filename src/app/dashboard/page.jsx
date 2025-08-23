export default function DashboardHome() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Overview</h1>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="border rounded p-4">All Products</div>
                <div className="border rounded p-4">Add Product</div>

        <div className="border rounded p-4">In Stock</div>
        <div className="border rounded p-4">Low Stock</div>
      </div>
    </div>
  );
}