"use client";
import React from "react";
import { useEffect } from "react";
const Post = (feed: any) => {
  useEffect(() => {
    console.log(feed);
  }, []);

  return <div></div>;
};

export default Post;
