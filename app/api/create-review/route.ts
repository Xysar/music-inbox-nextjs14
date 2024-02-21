import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const { newReview: review } = await request.json();
  await prisma.album.upsert({
    where: { id: review.albumId },
    update: {},
    create: {
      id: review.albumId,
      name: review.albumName,
    },
  });

  const createdReview = await prisma.review.create({
    data: {
      rating: review.rating,
      text: review.text,
      albumId: review.albumId,
      userId: review.userId,
    },
  });
  return NextResponse.json({ createdReview });
}
