import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(request: NextRequest) {
  const { updatedReview: review } = await request.json();

  const updatedReview = await prisma.review.update({
    where: { id: review.albumId },
    data: {
      rating: review.rating,
      text: review.text,
      albumId: review.albumId,
      userId: review.userId,
    },
  });
  return NextResponse.json({ updatedReview });
}
