"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import StarRating from "./StarRating";
import { Review } from "@prisma/client";
const UserReviews = ({
  userInfo,
  userOwnsAccount,
}: {
  userInfo: any;
  userOwnsAccount: boolean;
}) => {
  const [userReviews, setUserReviews] = useState(userInfo.reviews);

  useEffect(() => {
    console.log(userInfo);
  }, []);

  const handleDelete = async (reviewToDelete: Review, index: number) => {
    setUserReviews(
      userReviews.filter(
        (singleReview: Review) => singleReview.id !== reviewToDelete.id
      )
    );
    await deleteReview(reviewToDelete);
  };

  const handleRatingClick = () => {};

  const updateRating = async () => {};

  const deleteReview = async (review: Review) => {
    const reviewId = review.id;
    const response = await fetch(`/api/delete-review`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reviewId,
      }),
    });
  };

  return (
    <div>
      <div className="pb-4 ">
        {!userInfo.reviews && (
          <p className="text-center text-xl text-white ">No Reviews Made Yet</p>
        )}
        {userReviews.map((review: any, index: number) => (
          <div
            key={review.id}
            className="mb-4 flex flex-col justify-between border-b-2 border-slate-700 text-black lg:flex-row"
          >
            <div className="  flex w-full flex-col items-center  lg:flex-row ">
              <Image
                src={review.album.imageId}
                width={200}
                className="h-[300px] w-[300px]"
                height={200}
                alt="Album Cover"
              />
              <div className="flex h-full w-full flex-col items-center  justify-center bg-slate-500  p-5 lg:items-start">
                <h1 className="text-4xl font-bold">{review.album.name}</h1>
                <h2 className=" text-3xl ">{review.album.artist}</h2>
              </div>
            </div>

            <div className="flex h-[300px] flex-col gap-4 bg-slate-900 p-5 lg:w-[80%]">
              <div className="flex items-center justify-between ">
                <StarRating
                  rating={review.rating}
                  handleClick={handleRatingClick}
                />

                {userOwnsAccount && (
                  <button
                    onClick={() => handleDelete(review, index)}
                    className=" flex h-10 w-10 items-center justify-center rounded-full text-white hover:bg-slate-800"
                  >
                    <Image
                      src={"/trash-solid.svg"}
                      width={20}
                      height={20}
                      alt="trash can image"
                    ></Image>
                  </button>
                )}
              </div>
              <div className="">
                <p className="m-auto text-white ">{review.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserReviews;
