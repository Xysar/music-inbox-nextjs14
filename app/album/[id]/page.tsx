import React from "react";
import { getAlbumData } from "../../../lib/services/albums";
import { getAlbum } from "@/lib/spotify";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/options";
import { Album, Track } from "@/types";
import ClientPage from "./ClientPage";
import SpotifyScript from "@/app/components/scripts/SpotifyScript";

const AlbumPage = async ({ params }: { params: { id: string } }) => {
  const session = await getServerSession(authOptions);
  const albumData = await getAlbumData(params.id);
  const soundArray = new Array(25)
    .fill(1)
    .map(() => Math.floor(Math.random() * (110 - 20) + 20));
  const albumInfo: Album = await getAlbum(params.id);
  console.log(session);
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
