"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";

function AuthButton() {
  const { data: session } = useSession();
  useEffect(() => {
    console.log(session);
  }, []);

  if (session) {
    return (
      <div className="flex items-center gap-8">
        <Image
          src={`${session?.user?.image}`}
          alt="profile picture"
          className="rounded-full"
          width={80}
          height={80}
        />

        <Link
          href={`/user/${session.user.id}`}
          className="whitespace-nowrap rounded-xl  px-8 py-2  duration-100 ease-in hover:bg-slate-800"
        >
          <h1>Profile</h1>
        </Link>

        <button
          onClick={() => signOut()}
          className="whitespace-nowrap rounded-xl  px-8 py-2  duration-100 ease-in hover:bg-slate-800"
        >
          Sign out
        </button>
        <Link href={"/create-review"} className=" ">
          <p className=" block h-[70px] w-16  rounded-lg pt-[18px] bg-orange-600   text-center duration-150 ease-in-out hover:bg-orange-700 ">
            +
          </p>
        </Link>
      </div>
    );
  }
  return (
    <div className="">
      <button
        className="whitespace-nowrap rounded-xl bg-orange-500 px-8 py-2  duration-100 ease-in hover:bg-orange-700 "
        onClick={() => signIn()}
      >
        Sign in{" "}
      </button>
    </div>
  );
}

const Navbar = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <nav className="bg-slate-700">
      <div className="flex w-full items-center justify-between px-10 py-6 text-slate-200">
        <Link href={"/"}>
          <div className="flex cursor-pointer items-center gap-5">
            <Image
              src="/record.svg"
              style={{
                filter:
                  "brightness(0) saturate(100%) invert(91%) sepia(100%) saturate(0%) hue-rotate(45deg) brightness(103%) contrast(101%)",
              }}
              width={250}
              height={250}
              alt="vinyl record"
              className="h-24 w-24  flex-1"
            />
            <h1 className="text-3xl md:text-5xl">Music Inbox</h1>
          </div>
        </Link>
        <div className="hidden items-center gap-6 text-lg md:flex ">
          <AuthButton />
        </div>
        <div className="relative md:hidden">
          <button
            onClick={() => {
              setToggle((prev) => !prev);
            }}
            className=""
          >
            <Image
              className="h-16 w-16 min-w-fit p-2 "
              style={{
                filter:
                  "brightness(0) saturate(100%) invert(91%) sepia(100%) saturate(0%) hue-rotate(45deg) brightness(103%) contrast(101%)",
              }}
              src="/bars-solid.svg"
              height={250}
              width={250}
              alt="menu button"
            />
          </button>
        </div>
      </div>
      <div className={`${toggle ? "" : "hidden"}  bg-slate-900 p-4 md:hidden`}>
        <ul className="flex  flex-col gap-2 p-2  text-2xl text-slate-200">
          {/* <SignedIn>
            <div className="flex justify-between pb-4">
              <li>
                <UserButton
                  appearance={{
                    elements: {
                      userButtonAvatarBox: "w-20 h-20",
                    },
                  }}
                  afterSignOutUrl="/"
                />
              </li>
              <li>
                <Link href={"/CreateReview"} className=" ">
                  <p className=" block h-[70px] w-16  rounded-lg bg-primary  p-4 text-center duration-150 ease-in-out hover:scale-110  hover:bg-primary">
                    +
                  </p>
                </Link>
              </li>
            </div>
          </SignedIn>
          <SignedOut>
            <li>
              <Link
                href="/Login"
                className=" hover:bg-slate-00 block whitespace-nowrap   rounded-lg border-2 border-primary p-3 pl-4 duration-100 ease-in"
              >
                Log In
              </Link>
            </li>
          </SignedOut> */}
          <li className="">
            {/* <Link
              href={`/user/${userId}`}
              className="block w-full rounded-lg p-3 pl-4 text-left hover:bg-slate-800"
            >
              Profile
            </Link> */}
          </li>
          <li>
            <button className="w-full rounded-lg p-3 pl-4  text-left hover:bg-slate-800">
              Search
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
