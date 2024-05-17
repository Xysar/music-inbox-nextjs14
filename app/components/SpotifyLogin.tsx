"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";
const SpotifyLogin = ({
  accessToken,
  setRefreshToken,
}: {
  accessToken: string;
  setRefreshToken: any;
}) => {
  useEffect(() => {
    setRefreshToken();
    localStorage.setItem("accessToken", accessToken);
    setTimeout(() => router.push("/"), 5000);
  }, []);
  const router = useRouter();
  return <div className=""></div>;
};

export default SpotifyLogin;
