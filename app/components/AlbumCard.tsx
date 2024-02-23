"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

const AlbumCard = ({
  currentAlbum,
  currentAlbumId,
  showLink,
}: {
  currentAlbum: any;
  currentAlbumId: string;
  showLink: boolean;
}) => {
  const [showTracklist, setShowTracklist] = useState<boolean>(false);

  useEffect(() => {
    console.log(currentAlbum);
  }, [currentAlbum]);

  const router = useRouter();

  const returnTracklist = () => {
    if (currentAlbum?.tracks) {
      return (
        <div className="flex justify-between ">
          <div className="flex gap-2">
            <p>1.</p>
            <p>{currentAlbum?.tracks?.track[0].name}</p>
          </div>
          <p className="">
            {convertSecondsToMinutes(currentAlbum?.tracks?.track[0].duration)}
          </p>
        </div>
      );
    } else return <div>No Tracklist Info Found</div>;
  };

  const convertSecondsToMinutes = (seconds: number) => {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;
    let remainingSecondsString =
      remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;
    return minutes + ":" + remainingSecondsString;
  };

  return (
    <div className="z-[5] my-10 w-full rounded-lg bg-slate-800 p-4 text-slate-100 drop-shadow-lg duration-150 ease-in-out  ">
      <div className="flex justify-between ">
        <h1 className="text-3xl">{currentAlbum?.name}</h1>
        <h2 className="text-2xl">{currentAlbum?.artist}</h2>
      </div>

      {currentAlbum && (
        <div className="mt-10 flex flex-col gap-6 text-lg sm:flex-row">
          <div className="flex-shrink-0">
            <Image
              src={`${currentAlbum?.image[3]["#text"]}`}
              alt="album picture"
              width={300}
              height={300}
              className="aspect-square w-[300px] "
            />
          </div>
          <div className=" flex flex-col justify-between">
            <p
              className="mb-2"
              dangerouslySetInnerHTML={
                currentAlbum?.wiki
                  ? { __html: `${currentAlbum?.wiki.summary}` }
                  : { __html: "" }
              }
            ></p>
            <div
              onClick={() => setShowTracklist((prev) => !prev)}
              className="relative mb-3 box-border w-full cursor-pointer  border-gray-600 bg-black p-2 hover:bg-slate-900 "
            >
              {returnTracklist()}
              <div
                className={`${
                  showTracklist ? "block" : "hidden"
                } absolute left-0 top-0 h-40 w-[100%] no-scrollbar  overflow-x-hidden  `}
              >
                {currentAlbum?.tracks?.track.map(
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
                          {convertSecondsToMinutes(curTrack.duration)}
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
              } self-end rounded-lg bg-orange-600 px-8 py-2 text-white duration-150 ease-in-out hover:bg-orange-700`}
            >
              {"Go"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlbumCard;
