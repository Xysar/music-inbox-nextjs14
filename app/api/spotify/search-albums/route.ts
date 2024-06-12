import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getAccessToken, searchAlbums } from "@/lib/spotify";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const query = searchParams.get("query")!;
  let items = await searchAlbums(query);
  console.log(items);
  return NextResponse.json(items);
}
