"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { convertMillisToSeconds } from "@/lib/utils";
import { Track } from "@/types";
import Image from "next/image";
import StaticStarRating from "@/app/components/StaticStarRating";
import SoundWave from "@/app/components/SoundWave";
import SpotifyPlayer from "@/app/components/SpotifyPlayer";
import SpotifyScript from "@/app/components/scripts/SpotifyScript";
import { useSession } from "next-auth/react";
const ClientPage = ({
  albumInfo,
  albumData,
  soundArray,
}: {
  albumInfo: any;
  albumData: any;
  soundArray: any;
}) => {
  const [trackMode, setTrackMode] = useState(0);
  const [timeSelect, setTimeSelect] = useState<number>(0);
  const { data: session } = useSession();
  function handleTrackClick(trackNumber: number): void {
    setTrackMode(trackNumber);
  }

  useEffect(() => {
    console.log(albumInfo);
    console.log(albumData);
  }, []);

  let albumReviews = albumData?.reviews;
  const returnTracklist = () => {
    if (albumInfo?.tracks) {
      return albumInfo.tracks.items.map((curTrack: Track, index: number) => {
        return (
          <button
            onClick={() => handleTrackClick(index)}
            key={index}
            className={`flex w-full justify-between border-gray-600 bg-black p-1 px-3 hover:bg-slate-900 ${
              trackMode === index
                ? " border-2 border-white"
                : " border-2 border-black"
            } `}
          >
            <div className="flex gap-2">
              <p>{index + 1}.</p>
              <p>{curTrack.name}</p>
            </div>
            <p className="">{convertMillisToSeconds(curTrack.duration_ms)}</p>
          </button>
        );
      });
    } else return <div>No Tracklist Info Found</div>;
  };
  return (
    <div>
      <div className="z-[5] my-10 w-full rounded-lg bg-slate-800 p-4 text-slate-100 drop-shadow-lg duration-150 ease-in-out  ">
        <div className="grid grid-cols-5 gap-4 ">
          <div className="col-span-2">
            <div className="flex justify-between">
              <h1 className="text-3xl">{albumInfo?.name}</h1>
              <h2 className="text-2xl">{albumInfo?.artists[0].name}</h2>
            </div>
            <Image
              src={`${albumInfo?.images[0].url}`}
              alt="album picture"
              width={300}
              height={300}
              className="aspect-square w-[300px] h-[300px] "
            />
            <Link
              href={`/create-review${
                "?albumId=" + albumInfo.id + "&trackId=" + trackMode
              }`}
              className="bg-orange-600 inline-block mt-4 rounded-lg hover:bg-slate-600 p-2 duration-150 ease-in-out"
            >
              Create Review
            </Link>
          </div>
          <div className=" col-span-3  ">
            {albumInfo && (
              <div className="    gap-6 text-lg sm:flex-row">
                <div className=" flex flex-col justify-between">
                  <div className="relative mb-3 box-border w-full   border-gray-600 bg-black  ">
                    {returnTracklist()}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <SoundWave
          trackInfo={albumInfo?.tracks.items[trackMode]}
          timeSelect={timeSelect}
          setTimeSelect={setTimeSelect}
          interactive={false}
          soundArray={soundArray}
        />
      </div>

      <div className="">
        {!albumReviews && (
          <p className="text-center text-3xl text-white">No Reviews Made Yet</p>
        )}
        {albumReviews?.map((review: any, index: number) => (
          <div
            key={index}
            className="mb-4 border-white border rounded-lg flex flex-col sm:flex-row"
          >
            <div className="float-left inline-block flex-grow-0 p-8 hover:bg-slate-500 duration-150 ease-in-out rounded-l-lg">
              <Link href={`/user/${review?.user?.id}`}>
                <Image
                  src={`${review?.user?.image}`}
                  alt=""
                  width={200}
                  height={200}
                  className="m-auto h-[100px] w-[100px] rounded-full object-cover"
                />
                <h1 className="text-center  text-2xl text-white ">
                  {review.user.name}
                </h1>
              </Link>
            </div>
            <div className="w-full  p-5">
              <div className="">
                <div className="mb-4">
                  <StaticStarRating rating={review.rating} />
                </div>
                <div className="">
                  <p
                    style={{ whiteSpace: "pre-line" }}
                    className="m-auto text-white  "
                  >
                    {review.text}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <SpotifyPlayer accessToken={session?.user.token} />
    </div>
  );
};

export default ClientPage;
