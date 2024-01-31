import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

const authOptions = {
  secret: process.env.NEXTAUTH_SECRET ?? "",
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, authOptions };
