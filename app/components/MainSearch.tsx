"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { SpotifyAlbum } from "@/types";
import AlbumCard from "./AlbumCard";
import SearchBar from "./SearchBar";

const MainSearch = ({
  initialAlbum,
  initialAlbumId,
}: {
  initialAlbum: SpotifyAlbum;
  initialAlbumId: string;
}) => {
  const [currentAlbum, setCurrentAlbum] = useState<any>(initialAlbum);
  const [currentAlbumId, setCurrentAlbumId] = useState<string>(initialAlbumId);

  return (
    <div className="px-5">
      <SearchBar
        setCurrentAlbum={setCurrentAlbum}
        currentAlbumId={currentAlbumId}
        setCurrentAlbumId={setCurrentAlbumId}
      />
      <AlbumCard
        currentAlbum={currentAlbum}
        currentAlbumId={currentAlbumId}
        showLink={true}
      />
    </div>
  );
};

export default MainSearch;
