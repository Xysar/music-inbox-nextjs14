"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import StarRating from "./StarRating";

import { AlbumReview, TrackReview } from "@prisma/client";
import SoundWave from "./SoundWave";
import { TrackReviewWithTrackAlbums } from "@/types";

const UserReviews = ({
  userInfo,
  userOwnsAccount,
  soundArray,
}: {
  userInfo: any;
  soundArray: any[];
  userOwnsAccount: boolean;
}) => {
  const [trackReviews, setTrackReviews] = useState(userInfo.trackReviews);
  const [rating, setRating] = useState(0);
  const [editTimeSelect, setEditTimeSelect] = useState(0);
  const [reviewMode, setReviewMode] = useState("track");
  const [textValue, setTextValue] = useState("");
  const [reviewId, setReviewId] = useState(-1);
  const [reviewToEdit, setReviewToEdit] = useState(-1);
  const handleDelete = async (reviewToDelete: TrackReview, index: number) => {
    setTrackReviews(
      trackReviews.filter(
        (singleReview: AlbumReview) => singleReview.id !== reviewToDelete.id
      )
    );
    await deleteTrackReview(reviewToDelete);
  };

  const deleteTrackReview = async (review: TrackReview) => {
    const reviewId = review.id;
    const response = await fetch(`/api/tracks/delete-review`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reviewId,
      }),
    });
  };

  async function handleTrackReviewEditSubmit(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    reviewIndex: number
  ) {
    const response = await fetch(`/api/tracks/update-review`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reviewId,
        textValue,
        timeStamp: editTimeSelect,
      }),
    });

    event.preventDefault();

    const newUserReviews = trackReviews.map((review: any, index: number) => {
      if (index === reviewIndex) {
        return { ...review, timeStamp: editTimeSelect, text: textValue };
      } else return review;
    });

    setTrackReviews(newUserReviews);
    setReviewToEdit(-1);
    setTextValue("");
    setReviewId(-1);
  }

  function handleTrackReviewEditOpen(review: TrackReview, index: number): void {
    setReviewToEdit(index);
    setEditTimeSelect(review.timeStamp);
    setTextValue(review.text);
    setReviewId(review.id);
  }

  const handleInputChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setTextValue(event.target.value);
  };

  return (
    <section className="m-4">
      <div className="m-auto w-fit my-12">
        <button
          className={`${
            reviewMode == "track" ? "bg-white text-dark-navy" : "text-white"
          }text-white text-lg py-2 px-5 hover:bg-white hover:text-dark-navy duration-150 ease-in-out rounded-l-full border border-white`}
        >
          Track
        </button>
        <button
          className={`${
            reviewMode == "album" ? "bg-white text-dark-navy" : "text-white"
          } text-lg py-2 px-5 hover:bg-white hover:text-dark-navy duration-150 ease-in-out rounded-r-full border border-white`}
        >
          Album
        </button>
      </div>
      {!trackReviews && (
        <p className="text-center text-xl text-white ">No Reviews Made Yet</p>
      )}
      {trackReviews.map((review: TrackReviewWithTrackAlbums, index: number) => (
        <div
          key={review.id}
          className="mb-4 border-white border rounded-lg flex "
        >
          <Image
            src={review.track.album.imageId!}
            width={200}
            className="h-[300px] w-[300px] p-2 rounded-xl "
            height={200}
            alt="Album Cover"
          />
          <div className="w-full p-5">
            <div className="flex justify-between mb-4 ">
              <div className="text-white  flex-1 w-[100px]  overflow-hidden">
                <h1 className="text-3xl font-bold">
                  {review.track.album.name.length > 250
                    ? `${review.track.album.name.substring(0, 250)}...`
                    : review.track.album.name}
                </h1>
                <h2 className=" text-2xl ">{review.track.album.artists[0]}</h2>
              </div>
              <div className=" ">
                {userOwnsAccount && (
                  <div className=" flex gap-2">
                    {reviewToEdit !== index ? (
                      <button
                        onClick={() => handleTrackReviewEditOpen(review, index)}
                        className="flex h-10 w-10 items-center justify-center hover:bg-slate-800 rounded-full "
                      >
                        <Image
                          src="/pen.svg"
                          style={{
                            filter:
                              "brightness(0) saturate(100%) invert(91%) sepia(100%) saturate(0%) hue-rotate(45deg) brightness(103%) contrast(101%)",
                          }}
                          alt="edit pen icon"
                          className=""
                          width={30}
                          height={30}
                        ></Image>
                      </button>
                    ) : (
                      <button
                        onClick={() => setReviewToEdit(-1)}
                        className="flex h-10 w-10 items-center justify-center hover:bg-slate-800 rounded-full "
                      >
                        <Image
                          src="/x-symbol.svg"
                          style={{
                            filter:
                              "brightness(0) saturate(100%) invert(91%) sepia(100%) saturate(0%) hue-rotate(45deg) brightness(103%) contrast(101%)",
                          }}
                          alt="exit icon"
                          className=""
                          width={30}
                          height={30}
                        ></Image>
                      </button>
                    )}

                    <Dialog>
                      <DialogTrigger>
                        <div className="flex h-10 w-10 items-center justify-center rounded-full text-white hover:bg-slate-800">
                          <Image
                            src={"/trash-solid.svg"}
                            width={20}
                            height={20}
                            alt="trash can image"
                          ></Image>
                        </div>
                      </DialogTrigger>
                      <DialogContent className="bg-slate-700 border border-dark-navy">
                        <DialogHeader className="text-white">
                          <DialogTitle>
                            Are you sure you want to delete?
                          </DialogTitle>
                        </DialogHeader>
                        <DialogFooter>
                          <button
                            type="submit"
                            onClick={() => handleDelete(review, index)}
                            className="bg-red-600 text-white rounded-md p-2 hover:bg-dark-navy hover:border-white duration-150 ease-in-out"
                          >
                            Delete
                          </button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                )}
              </div>
            </div>

            {reviewToEdit === index && (
              <div className="">
                <SoundWave
                  trackInfo={review.track}
                  interactive={true}
                  soundArray={soundArray}
                  timeSelect={editTimeSelect}
                  setTimeSelect={setEditTimeSelect}
                />
                <div className="">
                  <textarea
                    style={{ whiteSpace: "pre-line" }}
                    onChange={(e) => handleInputChange(e)}
                    className="m-auto  bg-slate-800 w-full text-white my-2"
                    value={textValue}
                  />
                </div>
                <button
                  type="submit"
                  onClick={(e) => handleTrackReviewEditSubmit(e, index)}
                  className="bg-orange-600 text-white rounded-md p-2  hover:bg-dark-navy hover:border-white duration-150 ease-in-out"
                >
                  Save Changes
                </button>
              </div>
            )}
            {reviewToEdit !== index && (
              <div className="">
                <div className="mb-4">
                  <SoundWave
                    trackInfo={review.track}
                    interactive={false}
                    soundArray={soundArray}
                    timeSelect={review.timeStamp}
                    setTimeSelect={undefined}
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
            )}
          </div>
        </div>
      ))}
    </section>
  );
};

export default UserReviews;
