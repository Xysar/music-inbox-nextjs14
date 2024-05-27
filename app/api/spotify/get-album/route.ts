import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import queryString from "query-string";
var base64 = require("base-64");

export async function GET(request: NextRequest) {
  const baseURL = "https://accounts.spotify.com/api/token";

  let accessToken = cookies().get("access-token");

  if (!accessToken) {
    let newToken = await fetch(baseURL, {
      method: "POST",
      body: new URLSearchParams({
        grant_type: "client_credentials",
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(
            process.env.SPOTIFY_CLIENTID + ":" + process.env.SPOTIFY_SECRET
          ).toString("base64"),
      },
    })
      .then((response) => response.json())
      .catch((err) => console.log(err));
    console.log(newToken);
    cookies().set({
      name: "access-token",
      value: newToken.refresh_token,
      httpOnly: true,
      path: "/",
    });

    return NextResponse.json(newToken);
  } else {
    return NextResponse.json(accessToken);
  }
}
