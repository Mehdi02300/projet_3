import NavBar from "../components/NavBar";
import Tweets from "../components/Tweets";

export default function Dashboard() {
  return (
    <div className="flex">
      <NavBar />
      <main className="flex-1 py-5 px-16 overflow-y-auto ml-[20%]">
        <div>
          <Tweets />
        </div>
      </main>
    </div>
  );
}
