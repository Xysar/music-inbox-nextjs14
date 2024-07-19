"use server";
import React from "react";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import queryString from "query-string";

var base64 = require("base-64");
const page = async ({ searchParams }: { searchParams: any }) => {
  const { error, code, state } = searchParams;
  const baseURL = "https://accounts.spotify.com/api/token";
  const redirect_uri = "http://localhost:3000/callback";
  if (state === null) {
    redirect("/");
  }

  const res = await fetch(baseURL, {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${base64.encode(
        `${process.env.SPOTIFY_CLIENTID}:${process.env.SPOTIFY_SECRET}`
      )}`,
    },
    body: queryString.stringify({
      redirect_uri: redirect_uri,
      code,
      grant_type: "authorization_code",
    }),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
  async function setRefreshToken() {
    "use server";

    cookies().set({
      name: "refresh_token",
      value: res.refresh_token,
      httpOnly: true,
      path: "/",
    });
  }

  return (
    <div className="text-white pt-32 text-3xl text-center m-auto">
      <p className="">
        {error && "Error in linking account, redirected to Home page"}
      </p>
      <div className="">
        {" "}
        {!error &&
          "Successfully linked your Spotify account, redirecting to home page now!"}
      </div>
    </div>
  );
};

export default page;
