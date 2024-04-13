"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { Album } from "@/types";
import AlbumCard from "./AlbumCard";
import SearchBar from "./SearchBar";

const MainSearch = ({ initialAlbum }: { initialAlbum: Album }) => {
  const [currentAlbum, setCurrentAlbum] = useState<any>(initialAlbum);
  const [currentAlbumId, setCurrentAlbumId] = useState<string>("");

  return (
    <div className=" mx-5">
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
