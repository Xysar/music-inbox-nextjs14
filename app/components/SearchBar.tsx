"use client";
export const dynamic = "force-dynamic";
import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
interface AlbumImage {
  "#text": string;
  size: string;
}

interface Album {
  name: string;
  artist: string;
  image: Array<AlbumImage>;
  mbid: string;
}

const SearchBar = ({ setCurrentAlbum, setCurrentAlbumId }: any) => {
  const albumInput = useRef<HTMLInputElement>(null);
  const searchBar = useRef<HTMLDivElement>(null);

  const [currentResults, setCurrentResults] = useState([]);
  const [displayResults, setdisplayResults] = useState(false);
  useEffect(() => {
    loadAlbum("51467269-3122-3d7e-92b2-0f0a694d30c1");
  }, []);

  useEffect(() => {
    document.addEventListener("click", (e) => {
      checkClick(e);
    });

    return () => {
      document.removeEventListener("click", (e) => {
        checkClick(e);
      });
    };
  }, []);

  const checkClick = (e: any) => {
    if (searchBar.current && !searchBar.current.contains(e.target)) {
      setdisplayResults(false);
    } else if (albumInput.current) {
      setdisplayResults(true);
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (albumInput.current) {
      showResults(albumInput.current.value);
    }
  };

  const showResults = async (input: string) => {
    let response = await fetch(`api/lastfm/get-album-matches?name=${input}`);
    const { albumMatches } = await response.json();
    console.log(albumMatches);
    setCurrentResults(albumMatches.album);
    setdisplayResults(true);
  };

  const loadAlbum = async (mbid: string) => {
    const queriedAlbumId = await fetch(`api/lastfm/get-album-id?mbid=${mbid}`);
    const {
      albumData: { album: albumData },
    } = await queriedAlbumId.json();

    setCurrentAlbum(albumData);
    setCurrentAlbumId(mbid);
  };

  const handleAlbumClick = (result: Album) => {
    loadAlbum(result.mbid);
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
            <button className="  rounded-r-lg  text-xl bg-dark-navy  px-4 text-slate-100  hover:bg-slate-500">
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
                    src={result.image[0]["#text"]}
                    width={40}
                    height={40}
                    className="w-10 h-10"
                  />
                  <div className="">
                    <h2 className="">{result.name}</h2>
                    <h3 className="">{result.artist}</h3>
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
