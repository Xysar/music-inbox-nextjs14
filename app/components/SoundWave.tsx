"use client";
import React, { useEffect, useRef, useState } from "react";
import { convertMillisToSeconds } from "@/lib/utils";
import useMousePosition from "./hooks/useMousePosition";
const SoundWave = ({ trackInfo }: { trackInfo: any }) => {
  const soundDivisions = 25;
  const mousePosition = useMousePosition(true);
  const cursor = useRef(null);
  const box = useRef(null);
  const [boxDimensions, setBoxDimensions] = useState(null);
  const [timeSelect, setTimeSelect] = useState(null);
  const [soundArray, setSoundArray] = useState(
    new Array(soundDivisions)
      .fill(1)
      .map((prev) => Math.floor(Math.random() * (110 - 20) + 20))
  );
  const rect = box.current?.getBoundingClientRect();

  let sector = 0;
  let inBound =
    cursor.current &&
    mousePosition.x > rect?.left &&
    mousePosition.x < rect?.right &&
    mousePosition.y < rect?.bottom &&
    mousePosition.y > rect?.top;
  if (inBound) {
    sector = (mousePosition.x - rect?.left) / (rect?.width / 25);
    console.log(sector);
  }

  useEffect(() => {
    const handleResize = () => {
      setBoxDimensions((rect?.width * percentage) / 100);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleTimeSelectClick = () => {
    setTimeSelect(mousePosition.x - rect.left);
    setPercentage(((mousePosition.x - rect.left) / rect.width) * 100);
  };

  return (
    <div className="m-auto p-4 flex items-center justify-center">
      <p className=" ">0:00</p>
      <div className="p-2 flex-1 max-w-[650px] relative">
        <div
          ref={box}
          onClick={() => handleTimeSelectClick()}
          className=" h-32 flex  gap-1 bg-slate-700 items-center z-10 relative  justify-between "
        >
          {soundArray.map((single, index) => {
            return (
              <div
                key={index}
                style={{
                  height: `calc(${single}px)`,
                  backgroundColor: `${
                    (!inBound && index < timeSelect / (rect?.width / 25)) ||
                    index < sector
                      ? "white"
                      : "gray"
                  }`,
                }}
                className={`w-1 max-w-2 flex-1 rounded-full bg-clip-content bg-slate-400 `}
              ></div>
            );
          })}
        </div>

        <div className="relative mt-5">
          <div
            ref={cursor}
            style={{
              left: inBound ? mousePosition.x - rect?.left : timeSelect + "px",
            }}
            className="absolute "
          >
            <div
              style={{
                backgroundColor: inBound ? "rgb(100 116 139)" : "white",
              }}
              className="bg-slate-500 w-8 h-8 rounded-full right-[16px] relative "
            >
              <div
                style={{
                  borderLeft: "16px solid transparent",
                  borderRight: "16px solid transparent",
                  borderBottom:
                    "32px solid rgb(100 116 139 / var(--tw-border-opacity))",
                }}
                className="border-b-slate-500 w-0 h-0   bottom-[20px]  absolute"
              ></div>
              <p className="text-white absolute left-[40px] top-1">
                {convertMillisToSeconds(
                  inBound
                    ? (mousePosition.x - rect?.left) /
                        (rect.width / trackInfo.duration_ms)
                    : timeSelect / (rect?.width / trackInfo.duration_ms)
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
      <p className="">{convertMillisToSeconds(trackInfo.duration_ms)}</p>
    </div>
  );
};

export default SoundWave;
