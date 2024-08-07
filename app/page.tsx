import Introduction from "./components/Introduction";
import MainSearch from "./components/MainSearch";
import TopAlbums from "./components/TopAlbums";

import { getAlbum } from "@/lib/spotify";
import prisma from "@/lib/prisma";

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
  const trendingAlbums: any[] = await getTrendingAlbums();
  console.log(initialAlbum);
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

  return (
    <div className=" ">
      <Introduction />
      <MainSearch initialAlbum={initialAlbum} initialAlbumId={initialAlbumId} />
      <TopAlbums trendingAlbums={trendingAlbums} />
    </div>
  );
}
