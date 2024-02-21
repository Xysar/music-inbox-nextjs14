import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const name = searchParams.get("name");

  const response = await fetch(
    `https://ws.audioscrobbler.com/2.0/?method=album.search&album=${name}&api_key=${process.env.NEXT_PUBLIC_LASTFM_KEY}&format=json`
  );
  const jsonData = await response.json();
  let album = null;
  if (jsonData.results) {
    album = jsonData.results.albummatches.album[0];
  }

  return NextResponse.json({ album });
}
