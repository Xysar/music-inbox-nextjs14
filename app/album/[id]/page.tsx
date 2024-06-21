import React from "react";
import { getAlbumData } from "../../../lib/services/albums";
import { getAlbum } from "@/lib/spotify";

import { Album, Track } from "@/types";
import ClientPage from "./ClientPage";

const AlbumPage = async ({ params }: { params: { id: string } }) => {
  const albumData = await getAlbumData(params.id);
  const soundArray = new Array(25)
    .fill(1)
    .map(() => Math.floor(Math.random() * (110 - 20) + 20));
  const albumInfo: Album = await getAlbum(params.id);

  return (
    <section className="relative bg-slate-900 px-2">
      <ClientPage
        albumData={albumData}
        albumInfo={albumInfo}
        soundArray={soundArray}
      />
    </section>
  );
};

export default AlbumPage;
