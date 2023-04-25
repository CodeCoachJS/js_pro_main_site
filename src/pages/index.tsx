import { type NextPage } from "next";
import { useEffect, useState, useMemo } from "react";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();

  const { data } = api.repos.getRepos.useQuery();
  const [repos, setRepos] = useState(data);
  const [filter, setFilter] = useState<Set<string>>(new Set());

  const categories = useMemo(() => {
    const categories = new Set<string>();
    data?.forEach((repo) => {
      if (repo?.categories?.length) {
        repo.categories.forEach((cat) => categories.add(cat));
      }
    });
    return categories;
  }, [data]);

  useEffect(() => {
    setRepos(data);
  }, [data]);

  useEffect(() => {
    if (filter.size > 0) {
      setRepos(
        data?.filter((repo) => {
          if (repo.categories) {
            return repo.categories.some((cat) => filter.has(cat));
          }
          return false;
        })
      );
    } else {
      setRepos(data);
    }
  }, [filter, data]);

  const filterByCategory = (category: string) => {
    if (category === "all") {
      setFilter(new Set());
      return;
    }
    if (filter.has(category)) {
      filter.delete(category);
    } else {
      filter.add(category);
    }
    setFilter(new Set(filter));
  };

  return (
    <>
      <Head>
        <title>JS Pros</title>
        <meta name="description" content="JS Pros repos" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen">
        <h1 className="text-center text-4xl text-white">JS Pros</h1>
        {/* <button
          className="bg-purple hover:bg-purple-lighter rounded-full px-4 py-2 font-semibold no-underline transition"
          onClick={sessionData ? () => void signOut() : () => void signIn()}
        >
          {sessionData ? "Sign out" : "Sign in"}
        </button> */}
        <p className="text-center text-2xl text-white">
          {sessionData && (
            <span className="text-blue-lighter">
              Logged in as {sessionData.user?.name}
            </span>
          )}
        </p>
        <div className="flex flex-wrap justify-center">
          <button
            key="all"
            className={`${
              filter.has("all")
                ? "bg-purple-700"
                : "bg-purple-500 hover:bg-purple-600"
            } mb-2 mr-2 flex items-center rounded-full px-4 py-2 font-semibold text-white no-underline transition`}
            onClick={() => filterByCategory("all")}
          >
            All
          </button>
          {Array.from(categories).map((cat) => (
            <button
              key={cat}
              className={`${
                filter.has(cat)
                  ? "bg-purple-700"
                  : "bg-purple-500 hover:bg-purple-600"
              } mb-2 mr-2 flex items-center rounded-full px-4 py-2 font-semibold text-white no-underline transition`}
              onClick={() => filterByCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <div
          className="flex flex-wrap justify-center space-x-4 space-y-4"
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {repos?.map((repo) => (
            <a
              key={repo.id}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-card-bg text-card-text hover:bg-blue-lighter mx-2 my-2 max-w-md overflow-hidden rounded-md shadow-lg transition-colors duration-200"
              style={{
                flex: "1 1 25%",
                minWidth: "200px",
              }}
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
                  {new Date(repo.updated_at).toLocaleDateString()}
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
