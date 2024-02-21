"use client";
import React from "react";
import { useState } from "react";

import AlbumCard from "./AlbumCard";
import SearchBar from "./SearchBar";

const MainSearch = () => {
  const [currentAlbum, setCurrentAlbum] = useState<any>(null);
  const [currentAlbumId, setCurrentAlbumId] = useState<string>("");

  return (
    <div>
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
