import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const name = searchParams.get("name");

  const response = await fetch(
    `https://ws.audioscrobbler.com/2.0/?method=album.search&album=${name}&limit=5&api_key=${process.env.NEXT_PUBLIC_LASTFM_KEY}&format=json`
  );
  const jsonData = await response.json();
  let albumMatches = null;
  if (jsonData.results) {
    albumMatches = jsonData.results.albummatches;
  }

  return NextResponse.json({ albumMatches });
}
