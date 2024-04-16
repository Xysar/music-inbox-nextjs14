import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(request: NextRequest) {
  const { reviewId } = await request.json();
  console.log(reviewId);
  const deletedReview = await prisma.review.delete({
    where: {
      id: reviewId,
    },
  });
  return NextResponse.json({ deletedReview });
}
