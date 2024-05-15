import { redirect } from "next/navigation";
import Introduction from "./components/Introduction";
import MainSearch from "./components/MainSearch";
import TopAlbums from "./components/TopAlbums";
import prisma from "@/lib/prisma";
import queryString from "query-string";
const getInitialAlbum = async (mbid: string) => {
  const response = await fetch(
    `https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${process.env.NEXT_PUBLIC_LASTFM_KEY}&mbid=${mbid}&format=json`
  );
  const { album: albumData } = await response.json();

  return albumData;
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

export default async function Home({ searchParams }: { searchParams: any }) {
  const initialAlbum = await getInitialAlbum(
    "51467269-3122-3d7e-92b2-0f0a694d30c1"
  );
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

  const loginParams = handleLoginSpotify();

  return (
    <div className=" ">
      <Introduction />
      <MainSearch
        initialAlbum={initialAlbum}
        initialAlbumId={"51467269-3122-3d7e-92b2-0f0a694d30c1"}
      />
      <TopAlbums trendingAlbums={trendingAlbums} />
      <a className="p-4 bg-green-800" href={loginParams}>
        Log in Spotify
      </a>
      <section id="profile">
        <h2>
          Logged in as <span id="displayName"></span>
        </h2>
        <span id="avatar"></span>
        <ul>
          <li>
            User ID: <span id="id"></span>
          </li>
          <li>
            Email: <span id="email"></span>
          </li>
          <li>
            Spotify URI: <a id="uri" href="#"></a>
          </li>
          <li>
            Link: <a id="url" href="#"></a>
          </li>
          <li>
            Profile Image: <span id="imgUrl"></span>
          </li>
        </ul>
      </section>
    </div>
  );
}
