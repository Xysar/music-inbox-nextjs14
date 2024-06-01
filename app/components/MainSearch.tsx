"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { Album } from "@/types";
import AlbumCard from "./AlbumCard";
import SearchBar from "./SearchBar";

const MainSearch = ({
  initialAlbum,
  initialAlbumId,
}: {
  initialAlbum: Album;
  initialAlbumId: string;
}) => {
  const [currentAlbum, setCurrentAlbum] = useState<any>(null);
  const [currentAlbumId, setCurrentAlbumId] = useState<string>("");

  return (
    <div className="px-5">
      <SearchBar
        setCurrentAlbum={setCurrentAlbum}
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
