import { type NextPage } from "next";
import { type GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { env } from "../env.mjs";
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
    <div className="flex min-h-screen flex-col items-center bg-gray-900 text-white">
      <Head>
        <title>Not Another Course</title>
        <meta
          name="description"
          content="A set of challenges for JS developers"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="mx-auto flex w-full max-w-4xl flex-col items-center gap-8 p-4">
        <h1 className="mb-4 mt-20 text-center text-4xl font-bold md:text-6xl">
          Practice Solving
          <span className="block bg-gradient-to-l from-indigo-500 to-pink-500 bg-clip-text text-transparent">
            Complex Problems.
          </span>
        </h1>
        <h2 className="block bg-gradient-to-l from-indigo-500 to-pink-500 bg-clip-text text-transparent">
          You graduated the bootcamp. Now what?
        </h2>

        <Image
          width={700}
          height={394}
          alt="Video Screenshot"
          src="/challenges.png"
          className="rounded-lg shadow-xl"
        />

        <p className="max-w-xl text-center text-xl md:text-2xl">
          Learn tough stuff like Webpack, Redux, TypeScript, Unit Testing,
          Serverless and more. This material is developed for JavaScript
          developers who want to level up their skills with real-world
          challenges that mimic what you WILL see on the job.
        </p>

        <Image
          width={700}
          height={394}
          alt="Happy student"
          src="/paul_testimonial.png"
          className="my-4 rounded-lg shadow-xl"
        />

        <p className="max-w-xl text-center text-xl md:text-2xl">
          Practice debugging pipelines, publish your first NPM library, write
          your first line of TypeScript, and more. Learn DSA in a practical,
          hands-on way to crush the interview. This is the course I wish I had
          when I switched careers.
        </p>

        <Image
          width={400}
          height={400}
          alt="lambda challenge"
          src="/group_shot.png"
          className="rounded-lg shadow-xl"
        />

        <p className="max-w-xl text-center text-xl md:text-2xl">
          Get access to a private Slack community where you can ask questions,
          share your progress, and get help from other developers. This is a
          great way to network and make friends in the industry. An entire
          section is dedicated to career advice and job hunting.{" "}
        </p>

        <p className="max-w-xl text-center text-xl md:text-2xl">
          {" "}
          I want to help you land your dream job and navigate the industry. I
          have been writing code for a decade. I want to help you avoid the
          pitfalls and mistakes I made.
        </p>

        <Image
          width={800}
          height={800}
          alt="best course"
          src="/ali_testimonial.png"
          className="rounded-lg shadow-xl"
        />

        <p className="max-w-xl text-center text-xl md:text-2xl">
          No subscription fees. Just one low price and it is yours for life. The
          Slack access is worth the price alone. You are going to learn a ton
          and have a great time doing it. I can not wait to see you inside.
        </p>

        <Link
          href={env.NEXT_PUBLIC_STRIPE_URL}
          className="rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 px-6 py-3 font-bold text-white transition-colors hover:from-indigo-400 hover:to-pink-400"
        >
          Start Building →
        </Link>
      </main>

      <footer className="p-4 text-center text-gray-500">
        <p>&copy; 2024 Not Another Course. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
