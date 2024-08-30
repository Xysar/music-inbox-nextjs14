import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import SpotifyProvider from "next-auth/providers/spotify";
var base64 = require("base-64");
const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENTID as string,
      clientSecret: process.env.SPOTIFY_SECRET as string,
      authorization:
        "https://accounts.spotify.com/authorize?scope=streaming+user-read-email+user-read-private+user-modify-playback-state",
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
      authorization:
        "https://accounts.spotify.com/authorize?scope=streaming+user-read-email+user-read-private+user-modify-playback-state",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENTID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
      authorization:
        "https://accounts.spotify.com/authorize?scope=streaming+user-read-email+user-read-private+user-modify-playback-state",
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      if (session?.user) {
        session.user.id = user.id;
      }
      const [spotifyAccount] = await prisma.account.findMany({
        where: { userId: user.id },
      });
      let responseTokens = null;
      if (spotifyAccount.expires_at! * 1000 < Date.now()) {
        try {
          const response = await fetch(
            "https://accounts.spotify.com/api/token",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Basic ${base64.encode(
                  `${process.env.SPOTIFY_CLIENTID}:${process.env.SPOTIFY_SECRET}`
                )}`,
              },
              body: new URLSearchParams({
                grant_type: "refresh_token",
                refresh_token: spotifyAccount.refresh_token!,
              }),
            }
          );
          responseTokens = await response.json();
          if (!response.ok) throw responseTokens;
          await prisma.account.update({
            where: {
              provider_providerAccountId: {
                provider: "spotify",
                providerAccountId: spotifyAccount.providerAccountId,
              },
            },
            data: {
              access_token: responseTokens.access_token,
              expires_at: Math.floor(
                Date.now() / 1000 + responseTokens.expires_in
              ),
              refresh_token:
                responseTokens.refresh_token ?? spotifyAccount.refresh_token,
            },
          });
        } catch (error) {
          console.error("Error refreshing access token", error);
          // The error property can be used client-side to handle the refresh token error
          session.error = "RefreshAccessTokenError";
        }
      }

      let accessToken: string | null = null;

      if (responseTokens) {
        accessToken = responseTokens.access_token;
      } else if (spotifyAccount) {
        accessToken = spotifyAccount.access_token;
      }
      session.user.token = accessToken;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

declare module "next-auth" {
  interface Session {
    error?: "RefreshAccessTokenError";
  }
}

export default authOptions;
