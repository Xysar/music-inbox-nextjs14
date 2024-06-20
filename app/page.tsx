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

const getTrendingAlbums = async () => {
  const trendingAlbums = await prisma.album.findMany({
    take: 5,
    orderBy: {
      albumReviews: {
        _count: "desc",
      },
    },
  });

  return trendingAlbums;
};

export default async function Home() {
  const initialAlbumId = "0bUTHlWbkSQysoM3VsWldT";
  const initialAlbum = await getAlbum(initialAlbumId);
  const trendingAlbums = await getTrendingAlbums();

  for (let i = 0; i < 5; i++) {
    if (!trendingAlbums[i]) {
      break;
    }
    const aggregation = await prisma.albumReview.aggregate({
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

  // const refreshAccessToken = async () => {
  //   "use server";
  //   const refreshToken = cookies().get("refresh_token");

  //   const res = fetch("https://accounts.spotify.com/api/token", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/x-www-form-urlencoded",
  //       Authorization: `Basic ${base64.encode(
  //         `${process.env.SPOTIFY_CLIENTID}:${process.env.SPOTIFY_SECRET}`
  //       )}`,
  //     },
  //     body: queryString.stringify({
  //       grant_type: "refresh_token",
  //       refresh_token: refreshToken!.value,
  //     }),
  //   }).then((response) => response.json());

  //   return res;
  // };

  return (
    <div className=" ">
      <Introduction />
      <MainSearch initialAlbum={initialAlbum} initialAlbumId={initialAlbumId} />
      <TopAlbums trendingAlbums={trendingAlbums} />
    </div>
  );
}
