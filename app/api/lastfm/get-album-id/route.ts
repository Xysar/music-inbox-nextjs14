import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const { searchParams } = request.nextUrl;
  const mbid = searchParams.get("mbid");
  const album = await fetch(
    `https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${process.env.NEXT_PUBLIC_LASTFM_KEY}&mbid=${mbid}&format=json`
  );
  const albumData = await album.json();
  return NextResponse.json({ albumData });
};
