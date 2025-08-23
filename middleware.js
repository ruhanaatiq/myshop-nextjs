// middleware.ts (or .js) at repo root
import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: { signIn: "/login" },      // ensure it goes to your login page
  callbacks: {
    authorized({ token, req }) {
      // Only requirement: have a session token.
      // If you need role-based checks later, add them *here* (and ensure they don't bounce to another protected page).
      return !!token;
    },
  },
});

// Protect only dashboard; keep login & auth routes unguarded
export const config = {
  matcher: ["/dashboard/:path*"],
};
