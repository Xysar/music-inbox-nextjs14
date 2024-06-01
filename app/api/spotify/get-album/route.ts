import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getAlbum } from "@/lib/spotify";
import queryString from "query-string";
var base64 = require("base-64");

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const id = searchParams.get("id")!;
  let album = await getAlbum(id);
  console.log(album);
  return NextResponse.json(album);
}
