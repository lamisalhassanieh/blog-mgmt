
import { authOptions } from "@/app/shared/lib/AuthOptions";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST, handler as OPTIONS };