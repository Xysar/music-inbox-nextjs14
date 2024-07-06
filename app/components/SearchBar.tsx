"use client";
export const dynamic = "force-dynamic";
import { Album } from "@/types";
import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";

const SearchBar = ({
  setCurrentAlbum,
  currentAlbumId,
  setCurrentAlbumId,
  setCurrentTrack,
}: any) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const albumInput = useRef<HTMLInputElement>(null);
  const searchBar = useRef<HTMLDivElement>(null);

  const [currentResults, setCurrentResults] = useState([]);
  const [displayResults, setdisplayResults] = useState(false);

  useEffect(() => {
    document.addEventListener("click", (e) => {
      checkClickingSearchbar(e);
    });

    return () => {
      document.removeEventListener("click", (e) => {
        checkClickingSearchbar(e);
      });
    };
  }, []);

  const checkClickingSearchbar = (e: any) => {
    if (searchBar.current && !searchBar.current.contains(e.target)) {
      setdisplayResults(false);
    } else if (albumInput.current) {
      setdisplayResults(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (albumInput.current) {
      searchAlbums(albumInput.current.value);
    }
  };

  const loadAlbum = async (id: string) => {
    const queriedAlbumId = await fetch(
      `${baseUrl}/api/spotify/get-album?id=${id}`
    ).then((response) => response.json());
    console.log(queriedAlbumId);
    setCurrentAlbum(queriedAlbumId);
    if (setCurrentTrack) {
      setCurrentTrack(0);
    }
    setCurrentAlbumId(id);
  };

  const searchAlbums = async (query: string) => {
    const items = await fetch(
      `${baseUrl}/api/spotify/search-albums?query=${query}`
    ).then((response) => response.json());
    console.log(items);
    setCurrentResults(items);
    setdisplayResults(true);
  };

  const handleAlbumClick = (result: Album) => {
    loadAlbum(result.id);
    setdisplayResults(false);
  };

  return (
    <section className=" bg-dark-navy">
      <div ref={searchBar} className="m-auto max-w-[1300px]">
        <form onSubmit={(e) => handleSubmit(e)} className="relative">
          <div className="z-[1] flex">
            <input
              type="text"
              ref={albumInput}
              placeholder="Enter Album Name"
              className="text-slate-100 bg-search box-border w-full rounded-l-lg border  border-transparent  bg-slate-700 bg-contain bg-no-repeat px-3 py-3 text-xl  placeholder-slate-400 focus:border focus:border-primary focus:outline-none "
            />
            <button className="  rounded-r-lg  text-xl duration-150  px-4 text-slate-100  box-border bg-dark-navy  hover:bg-dark-navy border border-dark-navy hover:border-white">
              Search
            </button>
          </div>
          {displayResults && (
            <div className="w-full absolute top-full z-10 bg-slate-500 ">
              {currentResults?.map((result: Album, index: number) => (
                <div
                  key={index}
                  className="py-1 flex gap-4 px-1 cursor-pointer hover:bg-slate-200"
                  onClick={() => handleAlbumClick(result)}
                >
                  <Image
                    alt="album cover"
                    src={result.images[2].url}
                    width={result.images[2].width}
                    height={result.images[2].height}
                    className="w-10 h-10"
                  />
                  <div className="">
                    <h2 className="">{result.name}</h2>
                    <h3 className="">{result.artists[0].name}</h3>
                  </div>
                </div>
              ))}
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

export default SearchBar;
