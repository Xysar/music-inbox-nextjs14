import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
const TopAlbums = ({ trendingAlbums }: { trendingAlbums: any }) => {
  return (
    <div className="mx-4 flex-1 rounded-lg bg-slate-800 p-4 text-white">
      <h2 className=" pb-4  text-3xl">Trending Albums</h2>
      <ul className="flex flex-col  items-center justify-evenly gap-10   md:flex-row ">
        {trendingAlbums?.map((album: any, index: any) => (
          <li
            key={index}
            className="hover:bg-slate-500 p-2 rounded-md duration-150 ease-in-out"
          >
            <Link href={`/album/${album.id}`}>
              <Image
                src={album.imageId}
                alt="album picture"
                width={300}
                height={300}
                className="mb-3 "
              />
              <h2 className="line-clamp-1 overflow-ellipsis text-xl  font-bold">
                {album.name}
              </h2>
              <h3 className="line-clamp-1  overflow-ellipsis">
                {album.artist}
              </h3>
              <div className="">
                <Image
                  src={"/yellow-star.svg"}
                  alt="album picture"
                  width={50}
                  height={50}
                  className="mb-3 inline-block"
                />
                <h3 className="inline-block m-4 text-3xl">{album.avgRating}</h3>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopAlbums;
