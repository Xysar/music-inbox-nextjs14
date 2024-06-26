"use client";

import React, { useEffect, useRef, useState } from "react";
import SearchBar from "@/app/components/SearchBar";
import Image from "next/image";
import StarRating from "@/app/components/StarRating";
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Album, Track } from "@/types";
import { convertMillisToSeconds } from "@/lib/utils";
interface review {
  rating: number;
  text: string;
  albumId: string;
  albumArtist: string;
  userId: string;
  albumName: string;
  albumImageId: string;
}

const ClientPage = ({
  trackId,
  albumId,
  albumInfo,
}: {
  trackId: string;
  albumId: string;
  albumInfo: Album;
}) => {
  const [currentAlbum, setCurrentAlbum] = useState<Album | null>(albumInfo);
  const [currentAlbumId, setCurrentAlbumId] = useState<string>(albumId);
  const [trackMode, setTrackMode] = useState(trackId);
  const [rating, setRating] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();

  const { data: session } = useSession();

  useEffect(() => {
    if (!session || !session.user) {
      redirect("api/auth/signin");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const reviewInput = useRef<HTMLTextAreaElement>(null);

  const createReview = async () => {
    const newReview: review = {
      text: reviewInput.current?.value!,
      rating: rating,
      albumId: currentAlbumId,
      albumName: currentAlbum!.name,
      albumArtist: currentAlbum!.artists[0].name,
      albumImageId: currentAlbum!.images[0].url,
      userId: session?.user?.id,
    };
    const response = await fetch(`/api/create-review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        newReview,
      }),
    });
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!reviewInput.current?.value) {
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

    await createReview();
    router.push(`/user/${session?.user?.id}`);
  };

  const returnTracklist = () => {
    if (albumInfo?.tracks) {
      return albumInfo.tracks.items.map((curTrack: Track, index: number) => {
        return (
          <button
            onClick={() => setTrackMode(index)}
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
    <section className="">
      <div className="m-auto max-w-[1300px]">
        <div className="m-10">
          <SearchBar
            setCurrentAlbum={setCurrentAlbum}
            setCurrentAlbumId={setCurrentAlbumId}
            setLoading={setLoading}
          />
        </div>
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
                    className="h-[300px] w-[300px] "
                  />
                )}
              </div>
            ) : (
              <div className="w-[300px] bg-slate-900 text-slate-100">
                <p className="p-6 text-3xl">Enter an album to be reviewed</p>
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
                ref={reviewInput}
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
      </div>
    </section>
  );
};

export default ClientPage;
