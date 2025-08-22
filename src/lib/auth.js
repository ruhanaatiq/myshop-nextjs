import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

export const authOptions = {
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    // Social login (free)
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // Demo credentials (optional)
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
      return url?.startsWith("/") ? `${baseUrl}${url}` : `${baseUrl}/products`;
    },
  },
};
