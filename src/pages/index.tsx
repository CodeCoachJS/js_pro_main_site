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
          content="Challenges that prepare you for real-world software development."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-full animate-pulseSlow bg-gradient-to-r from-indigo-500 to-pink-500 p-3 text-center text-lg font-bold text-white">
        🚀 50% off for the next 24 hours 🚀
      </div>

      <main className="mx-auto flex w-full max-w-4xl flex-col items-center gap-8 p-4">
        <h1 className="mb-4 mt-20 text-center text-4xl font-bold md:text-6xl">
          Practice Solving
          <span className="block bg-gradient-to-l from-indigo-500 to-pink-500 bg-clip-text text-transparent">
            Complex Problems.
          </span>
        </h1>
        <h2 className="block bg-gradient-to-l from-indigo-500 to-pink-500 bg-clip-text text-transparent">
          You finished a a coding bootcamp, but are you job-ready?
        </h2>

        <Image
          width={700}
          height={394}
          alt="Video Screenshot"
          src="/challenges.png"
          className="rounded-lg shadow-xl"
        />

        <p className="max-w-xl text-center text-xl md:text-2xl">
          {`These challenges aren’t just coding exercises — they're designed to
          mimic what you’ll actually face as a developer on the job. Learn
          technologies like Webpack, Redux, TypeScript, Unit Testing, and
          Serverless in real-world scenarios that mirror the challenges your
          future team will expect you to solve.`}
        </p>

        <Image
          width={700}
          height={394}
          alt="Happy student"
          src="/paul_testimonial.png"
          className="my-4 rounded-lg shadow-xl"
        />

        <p className="max-w-xl text-center text-xl md:text-2xl">
          {`From debugging CI pipelines to publishing your first NPM library,
          these hands-on challenges prepare you for the complexities of real
          development environments. You'll also master Data Structures and
          Algorithms in a practical way, giving you the confidence to ace your
          next interview and handle tough coding tasks at work.`}
        </p>

        <Image
          width={400}
          height={400}
          alt="lambda challenge"
          src="/group_shot.png"
          className="rounded-lg shadow-xl"
        />

        <p className="max-w-xl text-center text-xl md:text-2xl">
          Join a private Slack community of developers just like you. Ask
          questions, share progress, and get feedback from experienced
          engineers. Plus, dive into dedicated sections on career advice and job
          hunting, so you can navigate the tech industry with confidence.
        </p>
        <Image
          width={800}
          height={800}
          alt="job offers"
          src="/elli_eric_congrats.jpg"
          className="rounded-lg shadow-xl"
        />

        <p className="max-w-xl text-center text-xl md:text-2xl">
          With over a decade of coding experience, I’m here to help you avoid
          the common pitfalls I encountered, so you can fast-track your career
          and hit the ground running when you land that first job.
        </p>

        <Image
          width={800}
          height={800}
          alt="best course"
          src="/ali_testimonial.png"
          className="rounded-lg shadow-xl"
        />

        <p className="max-w-xl text-center text-xl md:text-2xl">
          No subscription fees—just a one-time payment and the challenges,
          videos, slack access are yours for life. The value of the Slack
          community alone is worth the price, not to mention the real-world
          experience you’ll gain from each challenge. You’ll learn a ton and
          have a great time doing it. I can’t wait to see you inside.
        </p>

        <Link
          href={env.NEXT_PUBLIC_STRIPE_URL}
          className="rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 px-6 py-3 font-bold text-white transition-colors hover:from-indigo-400 hover:to-pink-400"
        >
          Get 50% Off – Start Building →
        </Link>
      </main>

      <footer className="p-4 text-center text-gray-500">
        <p>&copy; 2024 Not Another Course. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
