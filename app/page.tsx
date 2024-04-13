import MainSearch from "./components/MainSearch";
import TopAlbums from "./components/TopAlbums";

const getTopAlbums = () => {};

export default async function Home() {
  return (
    <div className=" ">
      <MainSearch />
      <TopAlbums />
    </div>
  );
}
