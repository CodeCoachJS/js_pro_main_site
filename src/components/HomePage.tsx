"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { env } from "~/env.mjs";

export default function HomePage() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-900 text-white">
      <motion.main
        className="mx-auto flex w-full max-w-4xl flex-col items-center gap-8 p-4"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <motion.div variants={fadeIn} className="text-center">
          <h1 className="mb-4 mt-20 text-center text-4xl font-bold md:text-6xl">
            <span className="block">Build Professional</span>
            <span className="block bg-gradient-to-l from-indigo-500 to-pink-500 bg-clip-text text-transparent">
              Developer Skills.
            </span>
          </h1>
          <h2 className="block bg-gradient-to-l from-indigo-500 to-pink-500 bg-clip-text text-xl text-transparent md:text-2xl">
            Bootcamp taught you to code. Now learn what it takes to work as a
            professional.
          </h2>
        </motion.div>

        <motion.div variants={fadeIn}>
          <Image
            width={700}
            height={394}
            alt="Video Screenshot"
            src="/challenges.png"
            className="rounded-lg shadow-xl transition-transform duration-300 hover:scale-105"
          />
        </motion.div>

        <motion.p
          variants={fadeIn}
          className="max-w-xl text-center text-xl md:text-2xl"
        >
          <span className="font-bold text-indigo-400">
            Focus on what matters.
          </span>{" "}
          These challenges replicate actual tasks professional developers handle
          daily. Master essential tools like Webpack, Redux, TypeScript, and
          testing frameworks through practical projects that build your
          portfolio and prepare you for real development work.
        </motion.p>

        <motion.div variants={fadeIn}>
          <Image
            width={700}
            height={394}
            alt="Happy student"
            src="/paul_testimonial.png"
            className="my-4 rounded-lg shadow-xl transition-transform duration-300 hover:scale-105"
          />
        </motion.div>

        <motion.p
          variants={fadeIn}
          className="max-w-xl text-center text-xl md:text-2xl"
        >
          <span className="font-bold text-indigo-400">
            Develop practical expertise.
          </span>{" "}
          From debugging CI pipelines to publishing NPM libraries, these
          hands-on challenges bridge the gap between bootcamp and professional
          work. Build a solid foundation in Data Structures & Algorithms through
          practical applications that strengthen your technical interview skills
          and problem-solving abilities.
        </motion.p>

        <motion.div variants={fadeIn}>
          <Image
            width={400}
            height={400}
            alt="lambda challenge"
            src="/group_shot.png"
            className="rounded-lg shadow-xl transition-transform duration-300 hover:scale-105"
          />
        </motion.div>

        <motion.p
          variants={fadeIn}
          className="max-w-xl text-center text-xl md:text-2xl"
        >
          <span className="font-bold text-indigo-400">
            Direct access to expertise.
          </span>{" "}
          Get personalized guidance through Slack access to me, your instructor,
          along with scheduled live events. Ask questions, receive feedback on
          your code, and get direction on your technical development. I&apos;m
          committed to helping you navigate the transition from bootcamp
          graduate to confident developer.
        </motion.p>

        <motion.div variants={fadeIn}>
          <Image
            width={800}
            height={800}
            alt="job offers"
            src="/elli_eric_congrats.jpg"
            className="rounded-lg shadow-xl transition-transform duration-300 hover:scale-105"
          />
        </motion.div>

        <motion.p
          variants={fadeIn}
          className="max-w-xl text-center text-xl md:text-2xl"
        >
          With over a decade in professional development, I&apos;ve identified
          the specific skills that new developers often miss. This program
          addresses those gaps directly, helping you build confidence in your
          abilities and develop the practical skills that matter in day-to-day
          development work.
        </motion.p>

        <motion.div variants={fadeIn}>
          <Image
            width={800}
            height={800}
            alt="best course"
            src="/ali_testimonial.png"
            className="rounded-lg shadow-xl transition-transform duration-300 hover:scale-105"
          />
        </motion.div>

        <motion.p
          variants={fadeIn}
          className="max-w-xl text-center text-xl md:text-2xl"
        >
          <span className="font-bold text-indigo-400">
            One payment. Lifetime access.
          </span>{" "}
          No subscriptions or hidden fees. Get immediate access to all
          challenges, videos, and direct instructor support for life. The
          practical skills you&apos;ll develop are designed to serve you
          throughout your entire career, making this an investment in your
          long-term professional development.
        </motion.p>

        <motion.div
          variants={fadeIn}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            href={env.NEXT_PUBLIC_STRIPE_URL}
            className="rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 px-8 py-4 text-xl font-bold text-white transition-all hover:from-indigo-400 hover:to-pink-400 hover:shadow-lg"
          >
            Build Professional Skills →
          </Link>
        </motion.div>
      </motion.main>

      <footer className="p-4 text-center text-gray-500">
        <p>
          &copy; {new Date().getFullYear()} Not Another Course. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
}
