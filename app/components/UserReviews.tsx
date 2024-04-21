"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import StarRating from "./StarRating";
import StaticStarRating from "./StaticStarRating";
import { Review } from "@prisma/client";
const UserReviews = ({
  userInfo,
  userOwnsAccount,
}: {
  userInfo: any;
  userOwnsAccount: boolean;
}) => {
  const [userReviews, setUserReviews] = useState(userInfo.reviews);
  const [currentForm, setCurrentForm] = useState("");
  const [rating, setRating] = useState(0);
  const [textValue, setTextValue] = useState("");
  const [reviewId, setReviewId] = useState(-1);

  const handleDelete = async (reviewToDelete: Review, index: number) => {
    setUserReviews(
      userReviews.filter(
        (singleReview: Review) => singleReview.id !== reviewToDelete.id
      )
    );
    await deleteReview(reviewToDelete);
  };

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

  function handleEditSubmit(): void {
    console.log(textValue, rating);
  }

  function handleEditOpen(review: Review): void {
    console.log(textValue);
    setTextValue(review.text);
    setRating(review.rating);
    setReviewId(review.id);
  }

  const handleInputChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setTextValue(event.target.value);
  };

  return (
    <section className="m-4">
      <Dialog>
        {!userInfo.reviews && (
          <p className="text-center text-xl text-white ">No Reviews Made Yet</p>
        )}
        <DialogContent className="bg-slate-700 border border-dark-navy">
          <DialogHeader className="text-white">
            <DialogTitle>Edit review</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="text" className="text-right text-white">
                Content:
              </Label>
              <Textarea
                id="text"
                value={textValue}
                onChange={(e) => handleInputChange(e)}
                placeholder=""
                className="resize-none col-span-3 p-1 bg-slate-200"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-white text-right">Rating:</Label>
              <div className="col-span-3 ">
                <StarRating rating={rating} setRating={setRating} />
              </div>
            </div>
          </div>
          <DialogFooter>
            <button
              type="submit"
              onClick={() => handleEditSubmit()}
              className="bg-orange-600 text-white rounded-md p-2 border border-dark-navy hover:bg-dark-navy hover:border-white duration-150 ease-in-out"
            >
              Save Changes
            </button>
          </DialogFooter>
        </DialogContent>

        {userReviews.map((review: any, index: number) => (
          <div
            key={review.id}
            className="mb-4 flex flex-col justify-between border-white border-2 rounded-lg  lg:flex-row"
          >
            <div className="  flex w-full flex-col items-center   lg:flex-row ">
              <Image
                src={review.album.imageId}
                width={200}
                className="h-[300px] w-[300px] rounded-xl"
                height={200}
                alt="Album Cover"
              />
              <div className="flex h-full w-full flex-col items-center  justify-center   p-5 lg:items-start">
                <h1 className="text-4xl font-bold">{review.album.name}</h1>
                <h2 className=" text-3xl ">{review.album.artist}</h2>
              </div>
            </div>

            <div className="flex h-[300px] flex-col gap-4  p-5 lg:w-[80%]">
              <div className="flex items-center justify-between ">
                <StaticStarRating rating={review.rating} />

                {userOwnsAccount && (
                  <div className="flex gap-2">
                    <DialogTrigger onClick={() => handleEditOpen(review)}>
                      <div className="flex h-10 w-10 items-center justify-center hover:bg-slate-800 rounded-full ">
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
                      </div>
                    </DialogTrigger>

                    <button
                      onClick={() => handleDelete(review, index)}
                      className="flex h-10 w-10 items-center justify-center rounded-full text-white hover:bg-slate-800"
                    >
                      <Image
                        src={"/trash-solid.svg"}
                        width={20}
                        height={20}
                        alt="trash can image"
                      ></Image>
                    </button>
                  </div>
                )}
              </div>
              <div className="">
                <p className="m-auto text-white ">{review.text}</p>
              </div>
            </div>
          </div>
        ))}
      </Dialog>
    </section>
  );
};

export default UserReviews;
