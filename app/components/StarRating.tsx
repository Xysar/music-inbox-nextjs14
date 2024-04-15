"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
const StarRating = ({ rating, handleClick }: any) => {
  const [hoverRating, setHoverRating] = useState(-1);

  const onEnterStar = (index: number) => {
    setHoverRating(index + 1);
  };

  const onLeaveRating = () => {
    setHoverRating(-1);
  };

  return (
    <div className="flex p-2" onMouseLeave={() => onLeaveRating()}>
      {[...Array(5)].map((_, index) => {
        if (hoverRating > -1) {
          if (index < hoverRating) {
            return (
              <Image
                width={50}
                height={50}
                src="/yellow-star.svg"
                alt="star"
                key={index}
                onMouseEnter={() => onEnterStar(index)}
                onClick={() => handleClick(index + 1)}
                className=" cursor-pointer duration-300 ease-in-out  hover:scale-125"
              />
            );
          } else {
            return (
              <Image
                width={50}
                height={50}
                src="/star.svg"
                alt="star"
                key={index}
                onMouseEnter={() => onEnterStar(index)}
                onClick={() => handleClick(index + 1)}
                className="cursor-pointer duration-300 ease-in-out hover:scale-125"
              />
            );
          }
        }
        if (index < rating) {
          return (
            <Image
              width={50}
              height={50}
              src="/yellow-star.svg"
              alt="star"
              key={index}
              onMouseEnter={() => onEnterStar(index)}
              onClick={() => handleClick(index + 1)}
              className="cursor-pointer duration-300 ease-in-out hover:scale-125"
            />
          );
        } else {
          return (
            <Image
              width={50}
              height={50}
              src="/star.svg"
              alt="star"
              key={index}
              onMouseEnter={() => onEnterStar(index)}
              onClick={() => handleClick(index + 1)}
              className="cursor-pointer duration-300 ease-in-out  hover:scale-125"
            />
          );
        }
      })}
    </div>
  );
};

export default StarRating;
