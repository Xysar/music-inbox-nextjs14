import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const { newReview: review } = await request.json();
  await prisma.album.upsert({
    where: { id: review.albumId },
    update: {
      id: review.albumId,
      name: review.albumName,
      artists: review.albumArtist,
      imageId: review.albumImageId,
    },
    create: {
      id: review.albumId,
      artists: review.albumArtist,
      name: review.albumName,
      imageId: review.albumImageId,
    },
  });

  const createdReview = await prisma.albumReview.create({
    data: {
      rating: review.rating,
      text: review.text,
      albumId: review.albumId,
      userId: review.userId,
    },
  });
  return NextResponse.json({ createdReview });
}
