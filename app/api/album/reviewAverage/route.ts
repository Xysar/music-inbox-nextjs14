import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const trendingAlbums = await prisma.album.findMany({
    take: 5,
    orderBy: {
      reviews: {
        _count: "desc",
      },
    },
  });

  const jsonData = await trendingAlbums.json();
  console.log(jsonData);
  return NextResponse.json({ jsonData });
}
