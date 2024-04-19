"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";

function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex items-center gap-6">
        <Image
          src={`${session?.user?.image}`}
          alt="profile picture"
          className="rounded-full "
          width={80}
          height={80}
        />
        <Link
          href={`/user/${session.user.id}`}
          className="whitespace-nowrap text-base flex items-center justify-center rounded-xl w-28 h-12 box-border bg-slate-800 duration-150 border-opacity-0 ease-in-out hover:bg-dark-navy border border-dark-navy hover:border-white"
        >
          Profile
        </Link>

        <button
          onClick={() => signOut()}
          className="whitespace-nowrap text-base rounded-xl flex items-center justify-center w-28 h-12 box-border bg-slate-800 duration-150 border-opacity-0 ease-in-out hover:bg-dark-navy border border-dark-navy hover:border-white"
        >
          Sign out
        </button>
        <Link href={"/create-review"} className=" ">
          <p className=" block h-[70px] px-5  rounded-lg pt-[19px] bg-orange-600   text-center duration-150 ease-in-out box-border hover:bg-dark-navy border shadow-md border-opacity-0 border-dark-navy hover:border-white ">
            +
          </p>
        </Link>
      </div>
    );
  }
  return (
    <div className="">
      <button
        className="whitespace-nowrap rounded-xl bg-orange-600 px-8 py-2  duration-150 ease-in  box-border hover:bg-dark-navy border border-dark-navy hover:border-white"
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
      <div className="flex items-center justify-between px-10 py-2 text-slate-200">
        <Link href={"/"} className="">
          <div className="flex cursor-pointer items-center gap-5">
            <Image
              src="/record.svg"
              style={{
                filter:
                  "brightness(0) saturate(100%) invert(91%) sepia(100%) saturate(0%) hue-rotate(45deg) brightness(103%) contrast(101%)",
              }}
              width={200}
              height={200}
              alt="vinyl record"
              className="h-20 w-20  flex-1"
            />
            <h1 className="text-3xl md:text-4xl ">
              Music
              <br /> Inbox
            </h1>
          </div>
        </Link>
        <div className="hidden md:flex ">
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
