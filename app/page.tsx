import Introduction from "./components/Introduction";
import MainSearch from "./components/MainSearch";
import TopAlbums from "./components/TopAlbums";

const getTopAlbums = () => {};

export default async function Home() {
  return (
    <div className=" ">
      <Introduction />
      <MainSearch />
      <TopAlbums />
    </div>
  );
}
