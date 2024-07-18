import React from "react";
import { getAlbumData } from "../../../lib/services/albums";
import { getAlbum } from "@/lib/spotify";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/options";
import { Album } from "@prisma/client";
import ClientPage from "./ClientPage";
import SpotifyScript from "@/app/components/scripts/SpotifyScript";
import { AlbumWithRelations } from "@/types";

const AlbumPage = async ({ params }: { params: { id: string } }) => {
  const session = await getServerSession(authOptions);
  const albumData = await getAlbumData(params.id);
  const soundArray = new Array(25)
    .fill(1)
    .map(() => Math.floor(Math.random() * (110 - 20) + 20));

  const trackMap = new Map();
  albumData?.tracks.map((track) => {
    trackMap.set(track.trackNumber, track);
  });
  const albumInfo: AlbumWithRelations = await getAlbum(params.id);
  console.log(session);
  return (
    <section className="relative bg-slate-900 px-2">
      <ClientPage
        albumData={albumData}
        albumInfo={albumInfo}
        soundArray={soundArray}
        trackMap={trackMap}
      />
    </section>
  );
};

export default AlbumPage;
