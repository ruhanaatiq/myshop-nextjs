import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

export const authOptions = {
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      name: "Credentials",
      credentials: { email: { type: "email" }, password: { type: "password" } },
      async authorize(c) {
        if (c?.email === "demo@example.com" && c?.password === "password123") {
          return { id: "demo-1", name: "Demo User", email: "demo@example.com" };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      try {
        // Normalize to absolute against baseUrl
        const u = new URL(url, baseUrl);

        // Same-origin only
        if (u.origin !== baseUrl) return baseUrl;

        // Never redirect back to auth endpoints or /login (prevents loops)
        if (
          u.pathname.startsWith("/login") ||
          u.pathname.startsWith("/api/auth")
        ) {
          // send to a safe default (home or your products page)
          return `${baseUrl}/products`;
        }

        // allow clean, same-origin targets
        return u.pathname + u.search + u.hash;
      } catch {
        // if url is malformed, go to a safe default
        return `${baseUrl}/products`;
      }
    },
  },
};
