import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getAccessToken, getAlbum } from "@/lib/spotify";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const query = searchParams.get("query")!;
  const token = await getAccessToken().catch((error) => {
    return NextResponse.json(error);
  });

  let items = await getAlbum(query);
  return NextResponse.json(items);
}
