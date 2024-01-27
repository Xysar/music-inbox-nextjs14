import Image from "next/image";
import prisma from "@/lib/prisma";
import { useEffect } from "react";
import Post from "./components/Post";

async function getFeed() {
  const feed = await prisma.post.findMany({
    where: {
      published: true,
    },
    include: {
      author: {
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
    <div>
      <p className="">main menu</p>
      <Post feed={feed}></Post>
    </div>
  );
}
