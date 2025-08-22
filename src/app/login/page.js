"use client";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  async function handleCredentials(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = form.email.value;
    const password = form.password.value;
    await signIn("credentials", { email, password, callbackUrl: "/products" });
  }

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <h1 className="text-2xl font-semibold mb-6">Login</h1>

      <button
        onClick={() => signIn("google", { callbackUrl: "/products" })}
        className="w-full px-4 py-2 border rounded mb-4"
      >
        Continue with Google
      </button>

      <form onSubmit={handleCredentials} className="space-y-3">
        <input name="email" type="email" placeholder="Email" className="w-full border rounded px-3 py-2" />
        <input name="password" type="password" placeholder="Password" className="w-full border rounded px-3 py-2" />
        <button className="w-full px-4 py-2 bg-black text-white rounded">Login with Credentials</button>
      </form>

      <p className="text-xs text-gray-500 mt-3">
        Demo: <code>demo@example.com</code> / <code>password123</code>
      </p>
    </div>
  );
}
