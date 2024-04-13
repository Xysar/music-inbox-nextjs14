import Introduction from "./components/Introduction";
import MainSearch from "./components/MainSearch";

export default async function Home() {
  return (
    <div className=" ">
      <Introduction />
      <MainSearch />
    </div>
  );
}
