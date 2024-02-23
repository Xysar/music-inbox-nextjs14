import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const mbid: string | null = searchParams.get("mbid");
  const albumInfo = await prisma.album.findUnique({
    where: {
      id: mbid!,
    },
    include: {
      reviews: {
        select: {
          rating: true,
          text: true,
          user: {
            select: {
              image: true,
              name: true,
            },
          },
        },
      },
    },
  });

  return NextResponse.json({ albumInfo });
}
