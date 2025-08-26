"use client";

import { useState, useEffect, Suspense } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

// same-origin only redirect helper
function safeRedirect(url, origin) {
  try {
    const u = new URL(url, origin);
    if (u.origin !== origin) return "/products";
    if (u.pathname.startsWith("/login") || u.pathname.startsWith("/api/auth")) {
      return "/products";
    }
    return u.pathname + u.search + u.hash;
  } catch {
    return "/products";
  }
}

function SignupInner() {
  const { status } = useSession();
  const router = useRouter();
  const params = useSearchParams();

  const raw = params.get("callbackUrl") || params.get("redirect") || "/products";
  const redirectTo =
    typeof window === "undefined" ? "/products" : safeRedirect(raw, window.location.origin);

  useEffect(() => {
    if (status === "authenticated") {
      router.replace(redirectTo);
    }
  }, [status, redirectTo, router]);

  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    setLoading(true);

    const f = e.currentTarget;
    const name = f.name.value.trim();
    const email = f.email.value.trim();
    const password = f.password.value;

    // Create account
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      setErr(j?.error || "Registration failed");
      setLoading(false);
      return;
    }

    // Auto sign-in with the same credentials
    const si = await signIn("credentials", {
      email,
      password,
      redirect: false, // we will route manually
    });

    setLoading(false);

    if (si?.error) {
      // account created but sign-in failed (shouldn't normally happen)
      router.push(`/login?callbackUrl=${encodeURIComponent(redirectTo)}`);
      return;
    }

    router.replace(redirectTo);
  }

  return (
    <div className="container px-6 md:px-24 mx-auto py-24">
      <div className="max-w-xl mx-auto border-2 p-8 md:p-12 rounded-lg">
        <h1 className="text-3xl font-semibold text-center mb-8">Create Account</h1>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">Name (optional)</label>
            <input id="name" name="name" className="mt-2 w-full input input-bordered" placeholder="Your name" />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium">Email</label>
            <input id="email" name="email" type="email" required className="mt-2 w-full input input-bordered" placeholder="you@example.com" />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium">Password</label>
            <input id="password" name="password" type="password" required minLength={6} className="mt-2 w-full input input-bordered" placeholder="••••••••" />
          </div>

          {err && <p className="text-sm text-red-600">{err}</p>}

          <button disabled={loading} type="submit" className="w-full btn btn-primary mt-4">
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-primary font-semibold">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="p-12 text-center">Loading…</div>}>
      <SignupInner />
    </Suspense>
  );
}
