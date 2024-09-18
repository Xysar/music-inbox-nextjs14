"use client";
import React, { useState, useEffect, createRef } from "react";
import Link from "next/link";
import { convertMillisToSeconds } from "@/lib/utils";
import { Track, TrackReview } from "@prisma/client";
import Image from "next/image";
import StaticStarRating from "@/app/components/StaticStarRating";
import SoundWave from "@/app/components/SoundWave";
import { TrackReviewWithUser, TrackWithReviewsUsers } from "@/types";
import SoundWaveReviews from "@/app/components/SoundWaveReviews";
import AnimateReviews from "@/app/components/AnimateReviews";

const ClientPage = ({
  albumInfo,
  albumData,
  soundArray,
  trackMap,
}: {
  albumInfo: any;
  albumData: any;
  soundArray: any;
  trackMap: Map<number, TrackWithReviewsUsers>;
}) => {
  const [trackMode, setTrackMode] = useState(0);
  const [displayedReviews, setDisplayedReviews] = useState<
    TrackReviewWithUser[]
  >(trackMap.get(0)?.trackReviews || []);
  const [chosenReview, setChosenReview] = useState<number>(0);

  function handleTrackClick(trackNumber: number): void {
    setTrackMode(trackNumber);
    setDisplayedReviews(trackMap.get(trackNumber)?.trackReviews || []);
  }

  const returnTracklist = () => {
    if (albumInfo?.tracks) {
      return (
        <div>
          <div className="w-full flex justify-between bg-slate-900 p-2">
            <h3>Name</h3>
            <h3 className=""># Reviews</h3>
          </div>
          {albumInfo.tracks.items.map((curTrack: Track, index: number) => {
            return (
              <button
                onClick={() => handleTrackClick(index)}
                key={index}
                className={`flex w-full  bg-dark-navy  hover:bg-slate-600 ${
                  trackMode === index
                    ? " border-2 border-white"
                    : " border-2 border-dark-navy"
                } `}
              >
                <div className="flex pr-2 w-full justify-between border-r-2 py-1 px-2">
                  <div className="flex gap-2">
                    <p className="text-center px-1">{index + 1}</p>
                    <p>{curTrack.name}</p>
                  </div>
                  <p className="">
                    {convertMillisToSeconds(curTrack.duration_ms)}
                  </p>
                </div>
                <div className="bg-dark-navy py-1 px-2 w-12">
                  {trackMap.get(index)?.trackReviews.length || 0}
                </div>
              </button>
            );
          })}
        </div>
      );
    } else return <div>No Tracklist Info Found</div>;
  };

  return (
    <div>
      <div className="z-[5] my-10 w-full rounded-lg bg-slate-800 p-4 text-slate-100 drop-shadow-lg duration-150 ease-in-out  ">
        <div className="grid grid-cols-5 gap-4 ">
          <div className="md:col-span-2 col-span-5">
            <div className="flex justify-between">
              <h1 className="text-3xl">{albumInfo?.name}</h1>
              <h2 className="text-2xl">{albumInfo?.artists[0].name}</h2>
            </div>
            <Image
              src={`${albumInfo?.images[0].url}`}
              alt="album picture"
              width={300}
              height={300}
              className="aspect-square w-[300px] h-[300px] m-auto md:m-0 "
            />
            {/* <Link
              href={`/create-review${
                "?albumId=" + albumInfo.id + "&trackId=" + trackMode
              }`}
              className="bg-orange-600 inline-block mt-4 rounded-lg hover:bg-slate-600 p-2 duration-150 ease-in-out"
            >
              Create Review
            </Link> */}
          </div>
          <div className="md:col-span-3 col-span-5">
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
        <SoundWaveReviews
          trackInfo={albumInfo.tracks.items[trackMode]}
          soundArray={soundArray}
          trackReviews={displayedReviews!}
          setTrackReviews={setDisplayedReviews}
          chosenReview={chosenReview}
          setChosenReview={setChosenReview}
        />
      </div>

      <div className="">
        {(!displayedReviews || displayedReviews.length == 0) && (
          <p className="text-center text-3xl text-white">No Reviews Made Yet</p>
        )}
        {displayedReviews && (
          <AnimateReviews trackMode={trackMode}>
            {displayedReviews?.map(
              (review: TrackReviewWithUser, index: number) => (
                <div
                  key={review.id}
                  ref={createRef()}
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
                        <SoundWave
                          trackInfo={albumInfo?.tracks.items[trackMode]}
                          timeSelect={review.timeStamp}
                          setTimeSelect={undefined}
                          interactive={false}
                          soundArray={soundArray}
                        />
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
              )
            )}
          </AnimateReviews>
        )}
      </div>
    </div>
  );
};

export default ClientPage;
