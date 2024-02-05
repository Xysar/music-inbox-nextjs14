import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import authOptions from "@/lib/options";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
