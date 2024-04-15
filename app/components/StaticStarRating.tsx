import React from "react";
import Image from "next/image";
const StaticStarRating = ({ rating }: { rating: number }) => {
  return (
    <div className=" flex">
      {[...Array(5)].map((_, index) => {
        if (index < rating) {
          return (
            <Image
              width={50}
              height={50}
              src="yellow-star.svg"
              alt="star"
              key={index}
              className=" "
            />
          );
        } else {
          return (
            <Image
              width={50}
              height={50}
              src="star.svg"
              alt="star"
              key={index}
              className=" "
            />
          );
        }
      })}
    </div>
  );
};

export default StaticStarRating;
