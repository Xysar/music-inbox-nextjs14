import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const { trackReviewInput } = await request.json();
  await prisma.album.upsert({
    where: { id: trackReviewInput.albumId },
    update: {},
    create: {
      id: trackReviewInput.albumId,
      artists: trackReviewInput.albumArtist,
      name: trackReviewInput.albumName,
      imageId: trackReviewInput.albumImageId,
    },
  });

  await prisma.track.upsert({
    where: { id: trackReviewInput.trackId },
    update: {},
    create: {
      id: trackReviewInput.trackId,
      albumId: trackReviewInput.albumId,
      artists: trackReviewInput.trackArtists,
      name: trackReviewInput.trackName,
    },
  });

  const createdReview = await prisma.trackReview.create({
    data: {
      timeStamp: trackReviewInput.rating,
      text: trackReviewInput.text,
      trackId: trackReviewInput.trackId,
      userId: trackReviewInput.userId,
    },
  });
  return NextResponse.json({ createdReview });
}
