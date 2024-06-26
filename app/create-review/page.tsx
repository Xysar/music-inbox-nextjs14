import React from "react";
import ClientPage from "./ClientPage";

const CreateReview = async ({
  searchParams,
}: {
  searchParams: { trackId: string; albumId: string };
}) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const queriedAlbumId = await fetch(
    `${baseUrl}/api/spotify/get-album?id=${searchParams.albumId}`
  ).then((response) => response.json());

  return (
    <section className="">
      <ClientPage
        trackId={searchParams.trackId}
        albumInfo={queriedAlbumId}
        albumId={searchParams.albumId}
      />
    </section>
  );
};

export default CreateReview;
