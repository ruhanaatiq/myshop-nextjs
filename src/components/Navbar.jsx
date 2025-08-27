// src/components/Navbar.jsx  (Server Component — no "use client")
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // v4 options object
import ThemeToggle from "@/components/ThemeToggle";
export default async function Navbar() {
  const session = await getServerSession(authOptions); // v4 way

  return (
    <nav className="border-b bg-white text-black">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-semibold text-lg">MyShop</Link>
        <ThemeToggle></ThemeToggle>
          
        <div className="flex items-center gap-4 text-sm">
          <Link href="/products" className="hover:bg-blue-600">Products</Link>

          {session?.user ? (
            <>
              <Link href="/dashboard" className="hover:underline">Dashboard</Link>
              {/* GET shows a confirm page. To skip confirm, create a small client button that calls signOut(). */}
              <Link href="/api/auth/signout?callbackUrl=/" className="hover:underline">
                Logout
              </Link>
            </>
          ) : (
            <Link href="/login" className="hover:bg-blue-600">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
