import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const { newReview: trackReviewInput } = await request.json();
  console.log(trackReviewInput);
  await prisma.album.upsert({
    where: { id: trackReviewInput.albumId },
    update: {},
    create: {
      id: trackReviewInput.albumId,
      artists: [trackReviewInput.albumArtist],
      name: trackReviewInput.albumName,
      imageId: trackReviewInput.albumImageId,
    },
  });

  await prisma.track.upsert({
    where: { id: trackReviewInput.track.id },
    update: {},
    create: {
      id: trackReviewInput.track.id,
      duration: trackReviewInput.track.duration_ms,
      artists: trackReviewInput.track.artists,
      albumId: trackReviewInput.albumId,
      name: trackReviewInput.track.name,
      trackNumber: trackReviewInput.track.number,
    },
  });

  const createdReview = await prisma.trackReview.create({
    data: {
      timeStamp: trackReviewInput.timeStamp,
      text: trackReviewInput.text,
      trackId: trackReviewInput.track.id,
      userId: trackReviewInput.userId,
    },
  });
  return NextResponse.json({ createdReview });
}
