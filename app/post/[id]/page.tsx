import React from "react";
import prisma from "@/lib/prisma";
import Post from "@/app/components/Post";

async function findPostById(postId: string) {
  const post = await prisma.post.findUnique({
    where: {
      id: String(postId),
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return {
    props: post,
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  const currentPost = await findPostById(params.id);

  return (
    <div>
      <Post feed={currentPost} />
    </div>
  );
}
