"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Album } from "@/types";

const AlbumCard = ({
  currentAlbum,
  currentAlbumId,
  showLink,
}: {
  currentAlbum: Album;
  currentAlbumId: string;
  showLink: boolean;
}) => {
  const [showTracklist, setShowTracklist] = useState<boolean>(false);

  const router = useRouter();

  const returnTracklist = () => {
    if (currentAlbum?.tracks) {
      return (
        <div className="flex justify-between  ">
          <p>1.&nbsp;&nbsp;{currentAlbum?.tracks.items[0].name}</p>

          <p className="">
            {convertMillisToSeconds(currentAlbum?.tracks?.items[0].duration_ms)}
          </p>
        </div>
      );
    } else return <div>No Tracklist Info Found</div>;
  };

  const convertMillisToSeconds = (milliseconds: number) => {
    const date = new Date(milliseconds);
    return `${date.getMinutes()}:${date.getSeconds()}`;
  };

  return (
    <div className="z-[5] my-10 w-full rounded-lg bg-dark-navy p-4 text-slate-100 drop-shadow-lg duration-150 ease-in-out  ">
      {currentAlbum && (
        <div className="">
          <div className="flex justify-between ">
            <h1 className="text-3xl">{currentAlbum?.name}</h1>
            <h2 className="text-2xl">{currentAlbum?.artists[0].name}</h2>
          </div>
          <div className="mt-10 flex flex-col gap-6 text-lg sm:flex-row">
            <div className="flex-shrink-0">
              <Image
                src={`${currentAlbum?.images[0]?.url}`}
                alt="album picture"
                width={300}
                height={300}
                className="aspect-square w-[300px] "
              />
            </div>
            <div className=" flex flex-col justify-between w-full">
              <div
                onClick={() => setShowTracklist((prev) => !prev)}
                className="relative  mb-3 box-border w-full cursor-pointer  border-gray-600 bg-black p-2 hover:bg-slate-900 "
              >
                {returnTracklist()}
                <div
                  className={`${
                    showTracklist ? "block" : "hidden"
                  } absolute left-0 top-0  h-40 w-[100%]   overflow-x-hidden  `}
                >
                  {currentAlbum?.tracks?.items.map(
                    (curTrack: any, index: number) => {
                      return (
                        <div
                          key={index}
                          className=" flex w-full justify-between  border-gray-600 bg-black p-2 hover:bg-slate-900 "
                        >
                          <div className="flex gap-2">
                            <p>{index + 1}.</p>
                            <p>{curTrack.name}</p>
                          </div>
                          <p className="">
                            {convertMillisToSeconds(curTrack.duration_ms)}
                          </p>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
              <button
                onClick={() => router.push(`album/${currentAlbumId}`)}
                className={`${
                  showLink ? "block" : "hidden"
                } self-end rounded-lg bg-slate-700 px-8 py-2 text-white duration-150 ease-in-out  box-border hover:bg-dark-navy border border-dark-navy hover:border-white`}
              >
                {"Go To Album"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlbumCard;
