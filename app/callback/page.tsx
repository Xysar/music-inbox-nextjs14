import React from "react";
import { redirect } from "next/navigation";

const page = ({ searchParams }: { searchParams: any }) => {
  const { error, code, state } = searchParams;
  const redirect_uri = "http://localhost:3000/callback";
  let authOptions;
  if (state === null) {
    redirect("/");
  } else {
    authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: "authorization_code",
      },
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          new Buffer.from(
            process.env.SPOTIFY_CLIENTID + ":" + process.env.SPOTIFY_SECRET
          ).toString("base64"),
      },
      json: true,
    };
  }
  console.log(authOptions);
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
