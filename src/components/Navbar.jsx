// src/components/Navbar.jsx (no "use client")
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <nav className="border-b">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-semibold text-lg">MyShop</Link>
        <div className="flex items-center gap-4 text-sm">
          <Link href="/products" className="hover:underline">Products</Link>

          {session ? (
            <>
              <Link href="/dashboard" className="hover:underline">Dashboard</Link>
              <Link href="/api/auth/signout" className="hover:underline">Logout</Link>
            </>
          ) : (
            <Link href="/login" className="hover:underline">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
