"use client";

import React, { useEffect, useRef, useState } from "react";
import SearchBar from "@/app/components/SearchBar";
import Image from "next/image";
import StarRating from "@/app/components/StarRating";
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Album, Track } from "@/types";
import { convertMillisToSeconds } from "@/lib/utils";
import { TrackReview } from "@prisma/client";
import SoundWave from "../components/SoundWave";

const ClientPage = ({
  trackId,
  albumId,
  albumInfo,
  soundArray,
}: {
  trackId: number;
  albumId: string;
  albumInfo: Album;
  soundArray: number[];
}) => {
  const [currentAlbum, setCurrentAlbum] = useState<Album | null>(albumInfo);
  const [currentAlbumId, setCurrentAlbumId] = useState<string>(albumId);
  const [reviewMode, setReviewMode] = useState<string>("track");
  const [currentTrack, setCurrentTrack] = useState<number>(trackId);
  const [timeSelect, setTimeSelect] = useState<number>(0);
  const [rating, setRating] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();

  const trackObject = currentAlbum?.tracks.items[currentTrack];

  const { data: session } = useSession();

  useEffect(() => {
    if (!session || !session.user) {
      redirect("api/auth/signin");
    }
    console.log(currentAlbum);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const reviewAlbumInput = useRef<HTMLTextAreaElement>(null);
  const reviewTrackInput = useRef<HTMLTextAreaElement>(null);

  const createAlbumReview = async () => {};

  const createTrackReview = async () => {
    console.log(trackObject);
    console.log(timeSelect);

    const newReview = {
      text: reviewTrackInput.current?.value!,
      timeStamp: timeSelect,
      albumId: currentAlbumId,
      albumName: currentAlbum!.name,
      albumArtist: currentAlbum!.artists[0].name,
      albumImageId: currentAlbum!.images[0].url,
      track: {
        id: trackObject!.id,
        number: currentTrack,
        name: trackObject!.name,
      },
      userId: session?.user?.id,
    };
    const response = await fetch(`/api/tracks/create-review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        newReview,
      }),
    });
    const reviewResult = await response.json();
    console.log(reviewResult);
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!reviewAlbumInput.current?.value) {
      setError(true);
      return;
    }
    if (!currentAlbum) {
      setError(true);
      return;
    }
    if (rating < 0) {
      setError(true);
      return;
    }

    await createAlbumReview();
    router.push(`/user/${session?.user?.id}`);
  };
  const handleTrackReviewSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    await createTrackReview();
  };

  const returnTracklist = () => {
    if (currentAlbum?.tracks) {
      return currentAlbum.tracks.items.map((curTrack: Track, index: number) => {
        return (
          <button
            onClick={() => setCurrentTrack(index)}
            key={index}
            className={`flex w-full justify-between border-gray-600 bg-black p-1 px-3 hover:bg-slate-900 ${
              currentTrack === index
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
    <section className="">
      <div className="m-auto max-w-[1300px]">
        <div className="m-10">
          <SearchBar
            setCurrentAlbum={setCurrentAlbum}
            setCurrentAlbumId={setCurrentAlbumId}
            setLoading={setLoading}
            setCurrentTrack={setCurrentTrack}
          />
        </div>
        <div className="">
          <div className=" m-auto  w-fit my-12">
            <button
              className={`text-white text-lg py-2 px-5 hover:bg-white hover:text-dark-navy duration-150 ease-in-out rounded-l-full border border-white`}
            >
              Track
            </button>
            <button className="text-white text-lg py-2 px-5 hover:bg-white hover:text-dark-navy duration-150 ease-in-out rounded-r-full border border-white">
              Album
            </button>
          </div>
          {reviewMode == "album" && (
            <div className="flex flex-col items-center justify-evenly md:flex-row ">
              <div className=" ">
                {loading ? (
                  <div className="text-3xl text-white">Loading...</div>
                ) : currentAlbum ? (
                  <div className=" bg-slate-900 text-slate-100">
                    <div className="max-w-[300px] px-4 pt-4">
                      <h1 className=" mb-1 text-3xl font-bold text-white ">
                        {currentAlbum?.name}
                      </h1>
                      <h2 className=" mb-4 text-2xl font-bold text-gray-300">
                        {currentAlbum?.artists[0].name}
                      </h2>
                    </div>
                    {currentAlbum && (
                      <Image
                        src={`${currentAlbum?.images[0].url}`}
                        alt="album picture"
                        width={200}
                        height={200}
                        className="h-[300px] w-[300px]  "
                      />
                    )}
                  </div>
                ) : (
                  <div className="w-[300px] bg-slate-900 text-slate-100">
                    <p className="p-6 text-3xl">
                      Enter an album to be reviewed
                    </p>
                  </div>
                )}
              </div>
              <form className="max-w-[600px] flex-1 py-12 text-slate-100">
                <div className=" mx-2 mb-5">
                  <label className="text-2xl" htmlFor="review">
                    Write Review Here:
                  </label>
                  <textarea
                    required
                    ref={reviewAlbumInput}
                    className="h-32 w-full rounded-md bg-slate-400 p-3 text-lg text-black"
                  ></textarea>
                </div>
                <div className="mb-10 flex justify-center">
                  <StarRating rating={rating} setRating={setRating} />
                </div>
                <button
                  className="m-auto block rounded-lg bg-orange-600 py-3 px-6 text-lg duration-300 ease-in-out box-border hover:bg-dark-navy border border-dark-navy hover:border-white"
                  type="submit"
                  onClick={(e) => handleSubmit(e)}
                >
                  {" "}
                  Submit
                </button>
                {error && (
                  <p className="text-white text-center p-2  text-xl">
                    Please fill out all fields
                  </p>
                )}
              </form>
            </div>
          )}
          {reviewMode == "track" && (
            <div className="flex flex-col items-center justify-evenly  ">
              <div className=" w-full">
                {loading ? (
                  <div className="text-3xl text-white">Loading...</div>
                ) : currentAlbum ? (
                  <div className="grid grid-cols-5 gap-4 w-full ">
                    <div className="col-span-2 bg-slate-900 text-slate-100">
                      <div className="max-w-[300px] px-4 pt-4">
                        <h1 className=" mb-1 text-3xl font-bold text-white ">
                          {currentAlbum?.name}
                        </h1>
                        <h2 className=" mb-4 text-2xl font-bold text-gray-300">
                          {currentAlbum?.artists[0].name}
                        </h2>
                      </div>
                      {currentAlbum && (
                        <Image
                          src={`${currentAlbum?.images[0].url}`}
                          alt="album picture"
                          width={200}
                          height={200}
                          className="h-[300px] w-[300px]"
                        />
                      )}
                    </div>
                    <div className="text-white col-span-3">
                      {returnTracklist()}
                    </div>
                  </div>
                ) : (
                  <div className="w-[300px] bg-slate-900 text-slate-100">
                    <p className="p-6 text-3xl">
                      Enter an album to be reviewed
                    </p>
                  </div>
                )}
              </div>
              {currentAlbum && (
                <form className="max-w-[600px] flex-1 py-12 text-slate-100">
                  <div className=" mx-2 mb-5">
                    <label className="text-2xl" htmlFor="review">
                      Write Review Here:
                    </label>
                    <textarea
                      required
                      ref={reviewTrackInput}
                      className="h-32 w-full rounded-md bg-slate-400 p-3 text-lg text-black"
                    ></textarea>
                  </div>
                  <SoundWave
                    trackInfo={currentAlbum?.tracks.items[currentTrack]}
                    timeSelect={timeSelect}
                    setTimeSelect={setTimeSelect}
                    interactive={true}
                    soundArray={soundArray}
                  />
                  <button
                    className="m-auto block rounded-lg bg-orange-600 py-3 px-6 text-lg duration-300 ease-in-out box-border hover:bg-dark-navy border border-dark-navy hover:border-white"
                    type="submit"
                    onClick={(e) => handleTrackReviewSubmit(e)}
                  >
                    {" "}
                    Submit
                  </button>
                  {error && (
                    <p className="text-white text-center p-2  text-xl">
                      Please fill out all fields
                    </p>
                  )}
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ClientPage;
