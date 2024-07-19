"use client";
import React, { useEffect, useRef, useState } from "react";
import { convertMillisToSeconds } from "@/lib/utils";
import useMousePosition from "./hooks/useMousePosition";
import styles from "../stylesheets/styles.module.css";
const SoundWave = ({
  trackInfo,
  interactive,
  soundArray,
  timeSelect,
  setTimeSelect,
}: {
  trackInfo: any;
  interactive: boolean;
  soundArray: number[];
  timeSelect: any;
  setTimeSelect: any;
}) => {
  const mousePosition = useMousePosition({ includeTouch: true });
  const cursor = useRef(null);
  const box = useRef<HTMLDivElement | null>(null);
  const [rect, setRect] = useState<any>(null);
  const [clicked, setClicked] = useState<boolean>(false);
  const [firstClicked, setFirstClicked] = useState<boolean>(false);

  const handleResize = () => {
    setRect({
      width: box.current?.getBoundingClientRect().width,
      left: box.current?.getBoundingClientRect().left,
      right: box.current?.getBoundingClientRect().right,
      top: box.current?.getBoundingClientRect().top! + window.scrollY,
      bottom: box.current?.getBoundingClientRect().bottom! + window.scrollY,
    });
  };

  let sector = 0;
  let inBound =
    cursor.current &&
    mousePosition.x! > rect?.left &&
    mousePosition?.x! < rect?.right &&
    mousePosition?.y! < rect?.bottom - window.scrollY &&
    mousePosition?.y! > rect?.top - window.scrollY;
  if (inBound) {
    sector = (mousePosition.x! - rect.left) / (rect?.width / 25);
  }

  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [trackInfo]);

  const handleTimeSelectClick = () => {
    if (interactive) {
      setFirstClicked(true);
      setClicked(true);

      setTimeSelect((mousePosition.x! - rect?.left) / rect.width);
    }
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
                    interactive && inBound
                      ? index < sector
                        ? "white"
                        : "gray"
                      : index < (timeSelect * rect?.width) / (rect?.width / 25)
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
              left:
                interactive && inBound
                  ? mousePosition.x! - rect?.left
                  : timeSelect! * rect?.width + "px",
            }}
            className={`${firstClicked && "opacity-65"} absolute`}
          >
            <div
              className={` bg-slate-500 w-8 h-8 rounded-full right-[16px] relative`}
            >
              <div
                style={{
                  backgroundColor:
                    interactive && inBound ? "rgb(100 116 139)" : "white",
                }}
                className="bg-slate-500 w-6 h-6 rounded-full left-0 right-0 m-auto top-1 z-10  ease-in-out relative "
              ></div>
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
                  interactive && inBound
                    ? (mousePosition.x! - rect?.left) /
                        (rect.width / trackInfo.duration_ms)
                    : (timeSelect * rect?.width) /
                        (rect?.width / trackInfo.duration_ms)
                )}
              </p>
            </div>
          </div>
          <div
            style={{
              left: timeSelect! * rect?.width + "px",
            }}
            className={`relative`}
          >
            <div className="bg-slate-500 w-8 h-8 rounded-full right-[16px] relative">
              <div
                className={`${
                  clicked ? styles.highlight : ""
                } w-6 h-6 bg-white rounded-full left-0 right-0 m-auto top-1 z-10 relative`}
                onAnimationEnd={() => setClicked(false)}
              ></div>
              <div
                style={{
                  borderLeft: "16px solid transparent",
                  borderRight: "16px solid transparent",
                  borderBottom:
                    "32px solid rgb(100 116 139 / var(--tw-border-opacity))",
                }}
                className="border-b-slate-500 w-0 h-0 bottom-[20px] absolute"
              ></div>
              <p className="text-white absolute left-[40px] top-1">
                {convertMillisToSeconds(
                  (timeSelect * rect?.width) /
                    (rect?.width / trackInfo.duration_ms)
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
