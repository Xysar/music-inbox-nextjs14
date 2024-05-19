"use client";
import React, { useEffect, useState } from "react";

const SpotifySearch = ({ refreshAccessToken }: { refreshAccessToken: any }) => {
  const [accessToken, setAccessToken] = useState("");
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    searchAlbums("test", localStorage.getItem("accessToken")!);
  }, [accessToken]);

  useEffect(() => {
    console.log(albums);
  }, [albums]);

  const searchAlbums = async (query: string, accessToken: string) => {
    const result = await fetch(
      "https://api.spotify.com/v1/search?q=gorillaz&type=album&limit=5",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    ).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        handleError();
      }
    });
    const items = result.albums?.items;
    setAlbums(items);
  };

  const handleError = async () => {
    const res = await refreshAccessToken();
    localStorage.setItem("accessToken", res.access_token);
    setAccessToken(res.access_token);
  };

  return (
    <div>
      {albums?.map((item, index) => (
        <div key={index}>{item.name}</div>
      ))}
    </div>
  );
};

export default SpotifySearch;
