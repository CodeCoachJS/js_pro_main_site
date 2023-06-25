import { type NextPage } from "next";
import {
  AcademicCapIcon,
  PlayIcon,
  PuzzleIcon,
} from "@heroicons/react/outline";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 py-2 text-white">
      <div className="m-10 text-center">
        <h1 className="text-shadow mb-6 text-6xl font-bold">
          Welcome to Not Another Course!
        </h1>
        <p className=" text-xl">
          Enough tutorials. Level up with hands on challenges + community +
          documentation to improve your life (as a developer). You just will not
          find these types of challenges anywhere else. Webpack, Redux, FS JS,
          TS, NextJS, DSA. Acronyms!!!
        </p>
      </div>

      <div className="mt-6 flex">
        <div className="w-1/3 p-4 text-center">
          <PuzzleIcon className="mx-auto mb-2 h-12 w-12" />
          <h2 className=" mb-2 text-2xl font-bold">Challenges</h2>
          <p className="">
            The stuff you will encounter at some point in your career.
          </p>
        </div>
        <div className="w-1/3 p-4 text-center">
          <PlayIcon className="mx-auto mb-2 h-12 w-12" />
          <h2 className=" mb-2 text-2xl font-bold">Videos & Readings</h2>
          <p className="">
            Educational videos, readings and cheat sheets to get knowledge into
            your noggin FAST.
          </p>
        </div>
        <div className="w-1/3 p-4 text-center">
          <AcademicCapIcon className="mx-auto mb-2 h-12 w-12" />
          <h2 className=" mb-2 text-2xl font-bold">
            Live Sessions & Slack Membership to ask questions when you get stuck
          </h2>
          <p className="">Join us. But not like in a cult-y way.</p>
        </div>
      </div>

      <div className="mt-6">
        <Link
          className="rounded bg-white px-4 py-2 font-bold text-gray-800 hover:bg-gray-100"
          href="https://www.yourcodecoach.com/offers/ECgwzooM/checkout"
        >
          Lifetime Access
        </Link>
      </div>
    </div>
  );
};

export default Home;
