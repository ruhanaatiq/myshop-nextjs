"use client";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const authed = status === "authenticated";

  return (
    <nav className="border-b">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-semibold text-lg">MyShop</Link>

        <div className="flex items-center gap-4 text-sm">
          <Link href="/products" className="hover:underline">Products</Link>
          {authed && (
            <Link href="/dashboard/add-product" className="hover:underline">
              Add Product
            </Link>
          )}

          {status === "loading" ? (
            <span className="opacity-70">…</span>
          ) : authed ? (
            <>
              <span className="hidden sm:inline">
                Hi, {session?.user?.name || session?.user?.email}
              </span>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="px-3 py-1 border rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => signIn(undefined, { callbackUrl: "/products" })}
              className="px-3 py-1 border rounded"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
