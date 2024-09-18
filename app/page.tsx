import Introduction from "./components/Introduction";
import MainSearch from "./components/MainSearch";
import TopAlbums from "./components/TopAlbums";

import { getAlbum } from "@/lib/spotify";
import prisma from "@/lib/prisma";

async function getTopAlbumsByReviewCount() {
  const topAlbums = await prisma.album.findMany({
    select: {
      id: true,
      imageId: true,
      name: true,
      artists: true,
      _count: {
        select: {
          tracks: true, // Count of tracks
        },
      },
      tracks: {
        select: {
          _count: {
            select: {
              trackReviews: true, // Count of reviews for each track
            },
          },
        },
      },
    },
  });
  // Calculate total review count for each album
  const albumsWithReviewCounts = topAlbums.map((album) => ({
    id: album.id,
    name: album.name,
    artists: album.artists,
    imageId: album.imageId,
    reviewCount: album.tracks.reduce(
      (acc, track) => acc + track._count.trackReviews,
      0
    ), // Sum of review counts for each track
  }));

  // Sort albums by review count and take the top 5
  const top5Albums = albumsWithReviewCounts
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 5);

  return top5Albums;
}

export default async function Home() {
  const initialAlbumId = "0bUTHlWbkSQysoM3VsWldT";
  const initialAlbum = await getAlbum(initialAlbumId);
  const popularAlbums = await getTopAlbumsByReviewCount();

  return (
    <div className=" ">
      <Introduction />
      <MainSearch initialAlbum={initialAlbum} initialAlbumId={initialAlbumId} />
      <TopAlbums trendingAlbums={popularAlbums} />
    </div>
  );
}
