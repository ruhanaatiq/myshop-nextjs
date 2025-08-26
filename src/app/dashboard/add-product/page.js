// src/app/dashboard/add-product/page.js
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // <-- v4 options object
import { redirect } from "next/navigation";
import AddProductForm from "@/components/AddProductForm";

export const dynamic = "force-dynamic";

export default async function AddProductPage() {
  const session = await getServerSession(authOptions); // v4 way
  if (!session?.user) {
    redirect("/login?callbackUrl=/dashboard/add-product");
  }

  return (
    <div className="max-w-md mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-6">Add Product</h1>
      <AddProductForm />
    </div>
  );
}
