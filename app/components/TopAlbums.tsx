import React, { useEffect } from "react";
import Image from "next/image";

const TopAlbums = ({ albums }: any) => {
  const albumsToDisplay = () => {
    return albums?.slice(0, 5);
  };

  return (
    <div className="mx-4 flex-1 rounded-lg bg-slate-800 p-4 text-white">
      <h2 className=" pb-4  text-3xl">Trending Albums</h2>
      <ul className="flex flex-col flex-wrap items-center justify-evenly gap-10   md:flex-row ">
        {albumsToDisplay()?.map((album: any, index: any) => (
          <li key={index}>
            <Image
              src={album.imageId}
              alt="album picture"
              width={300}
              height={300}
              className="mb-3 "
            />
            <h2 className="line-clamp-1 overflow-ellipsis text-xl  font-bold">
              {album.title}
            </h2>
            <h3 className="line-clamp-1  overflow-ellipsis">{album.artist}</h3>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopAlbums;
