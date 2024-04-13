"use client";
export const dynamic = "force-dynamic";
import React, { useRef, useEffect } from "react";

const SearchBar = ({ setCurrentAlbum, setCurrentAlbumId }: any) => {
  const albumInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadAlbum("Discovery");
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (albumInput.current) {
      loadAlbum(albumInput.current.value);
    }
  };

  const loadAlbum = async (input: string) => {
    let queriedAlbum = await fetch(`api/lastfm/get-album?name=${input}`);
    const { album } = await queriedAlbum.json();
    if (album && album.mbid) {
      const queriedAlbumId = await fetch(
        `api/lastfm/get-album-id?mbid=${album.mbid}`
      );
      const {
        albumData: { album: albumData },
      } = await queriedAlbumId.json();

      setCurrentAlbum(albumData);
      setCurrentAlbumId(album.mbid);
    }
  };

  return (
    <section className=" bg-dark-navy">
      <div className="m-auto max-w-[1300px]">
        <h3 className="font-poppins text-3xl text-white "></h3>
        <form onSubmit={(e) => handleSubmit(e)} className="flex-1 ">
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
        </form>
      </div>
    </section>
  );
};

export default SearchBar;
