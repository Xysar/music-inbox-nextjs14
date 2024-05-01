import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(request: NextRequest) {
  const review = await request.json();
  const updatedReview = await prisma.review.update({
    where: { id: review.reviewId },
    data: {
      rating: review.rating,
      text: review.textValue,
    },
  });
  return NextResponse.json({ updatedReview });
}
