import Introduction from "./components/Introduction";
import MainSearch from "./components/MainSearch";
import TopAlbums from "./components/TopAlbums";
import prisma from "@/lib/prisma";
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

export default async function Home() {
  const initialAlbum = await getInitialAlbum(
    "51467269-3122-3d7e-92b2-0f0a694d30c1"
  );
  const trendingAlbums = await getTrendingAlbums();
  const aggregations = await prisma.review.aggregate({
    _avg: {
      rating: true,
    },
    where: {
      albumId: trendingAlbums[0].id,
    },
  });
  console.log(aggregations);
  return (
    <div className=" ">
      <Introduction />
      <MainSearch
        initialAlbum={initialAlbum}
        initialAlbumId={"51467269-3122-3d7e-92b2-0f0a694d30c1"}
      />
      <TopAlbums trendingAlbums={trendingAlbums} />
    </div>
  );
}
