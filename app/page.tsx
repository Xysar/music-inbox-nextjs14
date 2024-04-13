import Introduction from "./components/Introduction";
import MainSearch from "./components/MainSearch";
import TopAlbums from "./components/TopAlbums";

const getTopAlbums = () => {};

const getInitialAlbum = async (mbid: string) => {
  const response = await fetch(
    `https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${process.env.NEXT_PUBLIC_LASTFM_KEY}&mbid=${mbid}&format=json`
  );
  const { album: albumData } = await response.json();

  return albumData;
};

export default async function Home() {
  const initialAlbum = await getInitialAlbum(
    "51467269-3122-3d7e-92b2-0f0a694d30c1"
  );
  return (
    <div className=" ">
      <Introduction />
      <MainSearch initialAlbum={initialAlbum} />
      <TopAlbums />
    </div>
  );
}
