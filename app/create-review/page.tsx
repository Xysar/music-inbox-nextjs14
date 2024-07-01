import React from "react";
import ClientPage from "./ClientPage";

const CreateReview = async ({
  searchParams,
}: {
  searchParams: { trackId: number; albumId: string };
}) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  let queriedAlbumId = null;

  if (searchParams.albumId) {
    queriedAlbumId = await fetch(
      `${baseUrl}/api/spotify/get-album?id=${searchParams.albumId}`
    ).then((response) => response.json());
  }

  const soundArray = new Array(25)
    .fill(1)
    .map(() => Math.floor(Math.random() * (110 - 20) + 20));

  return (
    <section className="">
      <ClientPage
        soundArray={soundArray}
        trackId={searchParams.trackId}
        albumInfo={queriedAlbumId}
        albumId={searchParams.albumId}
      />
    </section>
  );
};

export default CreateReview;
