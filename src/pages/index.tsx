import { type NextPage } from "next";
import { type GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { getServerAuthSession } from "../server/auth";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);

  if (session?.isMember) {
    return {
      redirect: {
        destination: "/challenges",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center gap-8 bg-black text-white">
      <Head>
        <title>Not Another Course</title>
        <meta
          name="description"
          content="A set of challenges for JS developers"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="mx-auto flex max-w-3xl flex-col items-center gap-8 p-4">
        <div className="flex flex-col items-center gap-8">
          <h1 className="mb-4 mt-20 text-center text-4xl font-bold leading-[1.2em] md:text-6xl">
            <span className="text-white">Practice Solving</span>
            <span className="bg-gradient-to-l from-indigo-500 to-pink-500 bg-clip-text text-transparent">
              <br />
              Complex Problems.
            </span>
          </h1>
          <p className="max-w-xl text-center text-xl leading-relaxed text-white md:text-2xl">
            Javascript stopped being easy a long time ago.
          </p>

          <p className="max-w-xl text-center text-xl leading-relaxed text-white md:text-2xl">
            Learn tough stuff. Webpack. Redux. Node/Express. NextJS. Debugging
            production apps. DSA. Unit testing. e2e. Way more than I can write
            here.
          </p>
          <div>
            <Link
              href="/challenges"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 px-6 py-3 font-bold text-white transition-all hover:from-indigo-400 hover:to-pink-400"
            >
              Explore and try now →
            </Link>
          </div>
        </div>
        <Image
          width={400}
          height={400}
          alt="lambda challenge"
          src="/group_shot.png"
        />
      </main>

      <footer className="mt-8 p-4 text-center text-gray-500">
        <p>&copy; 2024 Not Another Course. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
