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
    <div className="flex min-h-screen flex-col items-center gap-8 bg-black text-white">
      <Head>
        <title>Not Another Course</title>
        <meta name="description" content="A set of challenges for JS developers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="mx-auto flex max-w-4xl flex-col items-center gap-8 p-4">
        <div className="flex flex-col items-center gap-8">
          <h1 className="mb-4 mt-20 text-center text-4xl font-bold leading-[1.2em] md:text-6xl">
            <span className="text-white">Practice Solving</span>
            <span className="bg-gradient-to-l from-indigo-500 to-pink-500 bg-clip-text text-transparent">
              <br />
              Complex Problems.
            </span>
          </h1>

          <Image
            width={700}
            height={394}
            alt="Video Screenshot"
            src="/challenges.png"
            className="rounded-lg shadow-xl"
          />

          <p className="max-w-xl text-center text-xl leading-relaxed text-white md:text-2xl">
            Learn tough stuff like Webpack, Redux, TypeScript, Unit Testing, Serverless and more. I developed this material for JavaScript developers who want to level up their skills with real world challenges that mimic what you will see on the job.
          </p>

          <Image
            width={700}
            height={394}
            alt="Happy student"
            src="/paul_testimonial.png"
            className="rounded-lg shadow-xl my-4"
          />

          <p className="max-w-xl text-center text-xl leading-relaxed text-white md:text-2xl">
            Practice debugging pipelines. Publish your first NPM library. Write your first line of TypeScript and more. Learn DSA in a practical, hands-on way to crush the interview. This is the course I wish I had when I switched careers.
          </p>

          <Image
          width={400}
          height={400}
          alt="lambda challenge"
          src="/group_shot.png"
          />

          <p className="max-w-xl text-center text-xl leading-relaxed text-white md:text-2xl">
            {`Get access to a private Slack community where you can ask questions, share your progress, and get help from other developers. This is a great way to network and make friends in the industry. An entire section is dedicated to career advice and job hunting. I want to help you land your dream job and also help you navigate the industry. I've been a developer for over 10 years and I've seen it all. I want to help you avoid the pitfalls and land your dream job`}
          </p>

          <div>
            <Link
              href={env.NEXT_PUBLIC_STRIPE_URL}
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 px-6 py-3 font-bold text-white transition-all hover:from-indigo-400 hover:to-pink-400"
            >
              Join the team →
            </Link>
          </div>
        </div>

        <footer className="mt-8 p-4 text-center text-gray-500">
          <p>&copy; 2024 Not Another Course. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
};

export default Home;
