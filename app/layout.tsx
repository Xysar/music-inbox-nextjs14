import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionProvider from "./components/SessionProvider";

import { getServerSession } from "next-auth";
import authOptions from "@/lib/options";

import Navbar from "./components/Navbar";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Music Inbox",
  description: "Music Inbox Website",
  icons: {
    icon: "/record.svg",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className="bg-slate-900">
        <SessionProvider session={session}>
          <Navbar />
          <main className="mx-auto max-w-[1300px]">{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
