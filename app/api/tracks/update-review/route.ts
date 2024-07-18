import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(request: NextRequest) {
  const review = await request.json();
  const updatedReview = await prisma.trackReview.update({
    where: { id: review.reviewId },
    data: {
      timeStamp: review.timeStamp,
      text: review.textValue,
    },
  });
  return NextResponse.json({ updatedReview });
}
