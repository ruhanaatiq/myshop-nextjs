import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // v4 style options
import { redirect } from "next/navigation";
import AddProductForm from "@/components/AddProductForm";

export const dynamic = "force-dynamic"; // render fresh

export default async function AddProductPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login?callbackUrl=/dashboard/add-product");
  }

  return (
    <div className="max-w-md mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-6">Add Product</h1>
      <AddProductForm />
    </div>
  );
}
