import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth"; // v4 style options object

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
