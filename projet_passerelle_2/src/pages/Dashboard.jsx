import NavBar from "../components/NavBar";
import Tweets from "../components/Tweets";

export default function Dashboard() {
  return (
    <div className="flex">
      <NavBar />
      <main className="flex-1 py-5 pr-3 lg:px-16 overflow-y-auto ml-[10%] lg:ml-[20%]">
        <div>
          <Tweets />
        </div>
      </main>
    </div>
  );
}
