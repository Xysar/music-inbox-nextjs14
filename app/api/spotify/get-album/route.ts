import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getAccessToken } from "@/lib/spotifyToken";
import queryString from "query-string";
var base64 = require("base-64");

export async function GET(request: NextRequest) {
  const token = await getAccessToken().catch((error) => {
    return NextResponse.json(error);
  });

  let result = await fetch("https://api.spotify.com/v1/me/top/tracks", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
  console.log(result);
  return NextResponse.json(result);
}
