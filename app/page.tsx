import { redirect } from "next/navigation";
import Introduction from "./components/Introduction";
import MainSearch from "./components/MainSearch";
import TopAlbums from "./components/TopAlbums";
import { cookies } from "next/headers";
import { getAlbum, searchAlbums } from "@/lib/spotify";
import prisma from "@/lib/prisma";
var base64 = require("base-64");
import queryString from "query-string";
import SpotifySearch from "./components/SpotifySearch";

const getInitialAlbum = async (mbid: string) => {
  // const result = await fetch(
  //   "https://api.spotify.com/v1/search?q=gorillaz&type=album&limit=5",
  //   {
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`,
  //     },
  //   }
  // ).then((response) => {
  //   if (response.ok) {
  //     return response.json();
  //   } else {
  //     // handleError();
  //   }
  // });
  // const items = result.albums?.items;
  // return items;
  return {};
};

const getTrendingAlbums = async () => {
  const trendingAlbums = await prisma.album.findMany({
    take: 5,
    orderBy: {
      reviews: {
        _count: "desc",
      },
    },
  });

  return trendingAlbums;
};

const getAccessToken = async () => {
  const result = await fetch(
    "http://localhost:3000/api/spotify/get-album"
  ).then((response) => response.json());
  return result;
};

export default async function Home({ searchParams }: { searchParams: any }) {
  const initialAlbum = await getInitialAlbum("4aawyAB9vmqN3uQ7FjRGTy");
  const trendingAlbums = await getTrendingAlbums();

  for (let i = 0; i < 5; i++) {
    const aggregation = await prisma.review.aggregate({
      _avg: {
        rating: true,
      },
      where: {
        albumId: trendingAlbums[i].id,
      },
    });
    trendingAlbums[i].avgRating = aggregation["_avg"].rating;
  }

  function generateRandomString(length: number) {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }
  const handleLoginSpotify = () => {
    var scope = "user-read-private user-read-email";
    var redirect_uri = "http://localhost:3000/callback";
    var state = generateRandomString(16);

    const params = {
      response_type: "code",
      client_id: process.env.SPOTIFY_CLIENTID!,
      scope: scope,
      state: state,
    };

    const baseUrl = new URL(
      "https://accounts.spotify.com/authorize?" +
        queryString.stringify(params) +
        `&redirect_uri=${redirect_uri}`
    );
    return baseUrl.toString();
  };

  const refreshAccessToken = async () => {
    "use server";
    const refreshToken = cookies().get("refresh_token");

    const res = fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${base64.encode(
          `${process.env.SPOTIFY_CLIENTID}:${process.env.SPOTIFY_SECRET}`
        )}`,
      },
      body: queryString.stringify({
        grant_type: "refresh_token",
        refresh_token: refreshToken!.value,
      }),
    }).then((response) => response.json());

    return res;
  };
  const firstAlbum = "4aawyAB9vmqN3uQ7FjRGTy";
  let data = await getTopTracks();

  return (
    <div className=" ">
      <Introduction />

      {/* <MainSearch
        initialAlbum={initialAlbum}
        initialAlbumId={"51467269-3122-3d7e-92b2-0f0a694d30c1"}
        refreshAccessToken={refreshAccessToken}
      /> */}
      <TopAlbums trendingAlbums={trendingAlbums} />
      {/* <a className="p-4 bg-green-800" href={loginParams}>
        Log in Spotify
      </a> */}
      {/* <SpotifySearch refreshAccessToken={refreshAccessToken} /> */}
    </div>
  );
}
