import { cookies } from "next/headers";
import queryString from "query-string";
var base64 = require("base-64");

export const getAccessToken = async () => {
  const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN!;

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
      ).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token,
    }),
  });

  return response.json();
};

export const topTracks = async () => {
  const { access_token } = await getAccessToken();

  return fetch("https://api.spotify.com/v1/me/top/tracks", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};
