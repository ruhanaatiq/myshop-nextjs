// src/lib/absolute-url.js
import { headers } from "next/headers";

export function getBaseUrl() {
  // Client: use the real origin
  if (typeof window !== "undefined") return window.location.origin;

  // Server (try request headers)
  try {
    const h = headers();
    const proto = h.get("x-forwarded-proto");
    const host = h.get("host");
    if (proto && host) return `${proto}://${host}`;
  } catch {
    // headers() not available during prerender/build
  }

  // Env fallbacks (in order of preference)
  const fromEnv =
    process.env.NEXT_PUBLIC_APP_URL || // e.g. https://my-app.vercel.app or custom domain
    process.env.NEXTAUTH_URL ||        // must be absolute if you set it
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null);

  return fromEnv || "http://localhost:3000";
}

export function absoluteUrl(path = "/", base = getBaseUrl()) {
  try {
    return new URL(path, base).toString(); // works with relative or absolute paths
  } catch {
    // As a last resort, return base
return base + (path.startsWith("/") ? path : `/${path}`);  }
}
