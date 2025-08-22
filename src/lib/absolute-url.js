// src/lib/absolute-url.js
import { headers } from "next/headers";

export function absoluteUrl(path = "") {
  const h = headers();
  const proto = h.get("x-forwarded-proto") ?? "http";
  const host = h.get("host");
  return `${proto}://${host}${path}`;
}
