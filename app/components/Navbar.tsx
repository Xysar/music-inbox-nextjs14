"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";

import authOptions from "@/lib/options";

function AuthButton() {
  const { data: session } = useSession();
  useEffect(() => {
    console.log(session);
  }, [session]);

  if (session) {
    return (
      <div>
        <Image
          src={`${session?.user?.image}`}
          alt="profile picture"
          width={50}
          height={50}
        />
        <h1>{session?.user?.name}</h1>
        <br />
        <button onClick={() => signOut()} className="">
          Sign out
        </button>
      </div>
    );
  }
  return (
    <div className="">
      Not signed in <br />
      <button className="" onClick={() => signIn()}>
        Sign in{" "}
      </button>
    </div>
  );
}

const Navbar = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <nav className="border-b border-b-white">
      <div className="flex w-full items-center justify-between px-10 py-6 text-slate-200">
        <Link href={"/"}>
          <div className="flex cursor-pointer items-center gap-5">
            <Image
              src="/record.svg"
              width={250}
              height={250}
              alt="vinyl record"
              className="h-24 w-24  flex-1"
            />
            <h1 className="text-3xl md:text-5xl">Music Inbox</h1>
          </div>
        </Link>
        <ul className="hidden items-center gap-6 text-lg md:flex ">
          <AuthButton />
          {/* <SignedIn>
            <li>
              <Link
                href={`/user/${userId}`}
                className="rounded-lg px-8 py-2 duration-100 ease-in hover:bg-slate-800 hover:text-white"
              >
                Profile
              </Link>
            </li>
          </SignedIn> */}
          <li>
            <Link
              href={"/"}
              className="rounded-lg px-8 py-2 duration-100 ease-in hover:bg-slate-800 hover:text-white"
            >
              Search
            </Link>
          </li>
          {/* <SignedIn>
            <li>
              <Link href={"/CreateReview"} className=" ">
                <p className="inline-block  h-full w-full rounded-lg bg-primary px-5 py-4 text-center duration-150 ease-in-out hover:scale-110  hover:bg-primary">
                  +
                </p>
              </Link>
            </li>
            <li>
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: "w-16 h-16",
                  },
                }}
                afterSignOutUrl="/"
              />
            </li>
          </SignedIn> */}
          {/* <SignedOut>
            <li>
              <Link
                href="/Login"
                className="whitespace-nowrap rounded-xl bg-primary px-8 py-2 ring-orange-500  ring-offset-4 ring-offset-slate-900 duration-100 ease-in hover:bg-slate-900 hover:ring-2"
              >
                Log In
              </Link>
            </li>
          </SignedOut> */}
        </ul>
        <div className="relative md:hidden">
          <button
            onClick={() => {
              setToggle((prev) => !prev);
            }}
            className=""
          >
            <Image
              className="h-16 w-16 min-w-fit p-2 "
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
