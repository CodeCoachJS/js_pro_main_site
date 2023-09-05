import { type NextPage } from "next";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { getServerAuthSession } from "../server/auth";
import { type GetServerSideProps } from "next";
import TestimonialSlider from "~/components/Testimonials";

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "I've recently been working on your JS fundamentals portion... I'm getting my ass handed to me by these challenges haha",
    name: "Paul",
    role: "QA Automation Engineer",
  },
  {
    quote:
      "I'm amazed at how much I could benefit from just the first part of the first module.",
    name: "Ali",
    role: "Software engineer",
  },
  {
    quote: "I got the job!",
    name: "Vanessa",
    role: "Frontend Software engineer",
  },
  {
    quote:
      "... best career decision I've made in the past few years. He always has great advice for any question I pose, and consistently leveled up my skills across the board",
    name: "Ryan",
    role: "Lead Software Engineer",
  },
];

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
            <span className="text-white">
              Fast-Track Your Career in JavaScript Development{" "}
            </span>

            <span className="bg-gradient-to-l from-indigo-500 to-pink-500 bg-clip-text text-transparent">
              <br />
              By Solving Complex Problems.
            </span>
          </h1>
          <p className="max-w-xl text-center text-xl leading-relaxed text-white md:text-2xl">
            Real-world Challenges, Practical Exercises, and Weekly Live
            Mentorship
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
        <TestimonialSlider testimonials={testimonials} />
        <Image
          width={400}
          height={400}
          alt="lambda challenge"
          src="/group_shot.png"
        />
      </main>

      <footer className="mt-8 p-4 text-center text-gray-500">
        <p>&copy; 2023 Not Another Course. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
