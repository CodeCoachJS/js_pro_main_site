import { type NextPage } from "next";
import Head from "next/head";

import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();

  const repos = api.repos.getRepos.useQuery();

  console.log(repos);

  return (
    <>
      <Head>
        <title>JS Pros</title>
        <meta name="description" content="JS Pros repos" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen">
        <h1 className="text-center text-4xl text-white">JS Pros</h1>
        <button
          className="bg-purple hover:bg-purple-lighter rounded-full px-4 py-2 font-semibold no-underline transition"
          onClick={sessionData ? () => void signOut() : () => void signIn()}
        >
          {sessionData ? "Sign out" : "Sign in"}
        </button>
        <p className="text-center text-2xl text-white">
          {sessionData && (
            <span className="text-blue-lighter">
              Logged in as {sessionData.user?.name}
            </span>
          )}
        </p>
        <div
          className="flex flex-wrap justify-center space-x-4 space-y-4"
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {repos.data?.map((repo) => (
            <a
              key={repo.id}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-card-bg text-card-text hover:bg-blue-lighter mx-2 my-2 max-w-md overflow-hidden rounded-md shadow-lg transition-colors duration-200"
              style={{ flex: "1 1 25%" }}
            >
              <div className="relative"></div>
              <div className="px-6 py-4">
                <div className="text-blue-lighter mb-2 text-xl font-bold">
                  {repo.name}
                </div>
                <p className="text-base">{repo.description}</p>
              </div>
              <div className="px-6 py-4">
                <span className="mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700">
                  {new Date(repo.updated_at)
                    .toISOString()
                    .replace(/T/, " ")
                    .replace(/\..+/, "")}
                </span>
                <span className="inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700">
                  {repo.isPrivate ? "Private" : "Public"}
                </span>
              </div>
            </a>
          ))}
        </div>
      </main>
    </>
  );
};

export default Home;
