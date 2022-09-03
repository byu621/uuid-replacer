import type { NextPage } from "next";
import Replacer from "../components/Replacer";

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-start pt-2">
      <div className="text-5xl">UUID Replacer</div>
      <Replacer />
    </div>
  );
};

export default Home;
