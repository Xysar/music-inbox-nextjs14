"use client";

import React, { useEffect, useRef, useState } from "react";
import SearchBar from "@/app/components/SearchBar";
import Image from "next/image";
import StarRating from "@/app/components/StarRating";
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
interface review {
  rating: number;
  text: string;
  albumId: string;
  albumArtist: string;
  userId: string;
  albumName: string;
  albumImageId: string;
}

const CreateReview: React.FC = () => {
  const [currentAlbum, setCurrentAlbum] = useState<any>(null);
  const [currentAlbumId, setCurrentAlbumId] = useState<string>("");
  const [rating, setRating] = useState(-1);
  const [loading, setLoading] = useState(false);

  const { data: session } = useSession();

  useEffect(() => {
    if (!session || !session.user) {
      redirect("api/auth/signin");
    }
  }, []);

  const reviewInput = useRef<HTMLTextAreaElement>(null);

  const handleRatingClick = (index: number) => {
    setRating(index);
  };

  const createReview = async () => {
    const newReview: review = {
      text: reviewInput.current?.value!,
      rating: rating,
      albumId: currentAlbumId,
      albumName: currentAlbum.name,
      albumArtist: currentAlbum.artist,
      albumImageId: currentAlbum?.image[2]["#text"],
      userId: session?.user?.id,
    };
    console.log(newReview);
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

  const handleSubmit = async () => {
    if (!reviewInput.current?.value) {
      return;
    }
    if (rating < 0) {
      return;
    }

    await createReview();
    //router.push(`/user/${session?.user?.id}`);
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
                    {currentAlbum?.artist}
                  </h2>
                </div>
                {currentAlbum && (
                  <Image
                    src={`${currentAlbum?.image[2]["#text"]}`}
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
              <StarRating rating={rating} handleClick={handleRatingClick} />
            </div>
            <button
              className="m-auto block rounded-lg bg-primary p-3 text-lg duration-300 ease-in-out  hover:bg-slate-900"
              type="button"
              onClick={() => handleSubmit()}
            >
              {" "}
              Submit Review
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CreateReview;
