import Image from "next/image";
import prisma from "@/lib/prisma";
import { useEffect } from "react";
import Post from "./components/Post";
import Navbar from "./components/Navbar";

async function getFeed() {
  const feed = await prisma.review.findMany({
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  });
  return {
    props: { feed },
    revalidate: 10,
  };
}

export default async function Home() {
  const feed = await getFeed();

  return (
    <div className=" ">
      <p className="">main menu</p>
      <Post feed={feed}></Post>
    </div>
  );
}
