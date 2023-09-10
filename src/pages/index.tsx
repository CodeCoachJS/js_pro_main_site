import { type NextPage } from "next";
import { env } from "~/env.mjs";
import { useEffect, useState, useMemo } from "react";
import Head from "next/head";
import { useSession } from "next-auth/react";
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

  const isNewish = (upatedAt: string): boolean => {
    const date = new Date(upatedAt);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = diff / (1000 * 3600 * 24);
    return days < 30;
  };

  const isNotMember = !sessionData || !sessionData?.isMember;

  return (
    <>
      <Head>
        <title>JS Pros</title>
        <meta name="description" content="JS Pros repos" />
      </Head>
      <main className="bg-purple min-h-screen">
        <div className="mt-10 flex flex-wrap justify-center">
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
        <p className="text-center text-xl">
          Not sure where to start? I suggest checking out the main course
          material under <code>interview prep</code>
        </p>
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
              href={isNotMember && repo.isPrivate ? "#" : repo.url}
              target={isNotMember && repo.isPrivate ? "_self" : "_blank"}
              rel="noopener noreferrer"
              className="bg-card-bg text-card-text hover:bg-blue-lighter group relative mx-2 my-2 max-w-md overflow-hidden rounded-md shadow-lg transition-colors duration-200"
              style={{
                flex: "1 1 25%",
                minWidth: "200px",
              }}
            >
              {repo.isPrivate && isNotMember && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  <p className="text-lg font-semibold text-white">
                    Members Only 😎
                  </p>
                  <button>
                    <a href={env.NEXT_PUBLIC_STRIPE_URL}>Get Full Access</a>
                  </button>
                </div>
              )}

              <div className="px-6 py-4">
                <div className="text-blue-lighter mb-2 text-xl font-bold">
                  {repo.name}
                </div>
                <p className="text-base">{repo.description}</p>
              </div>
              <a
                className="px-6 py-4"
                target={isNotMember && repo.isPrivate ? "_self" : "_blank"}
                rel="noopener noreferrer"
                href={`${repo.url}/codespaces`}
              >
                <button className="rounded border border-blue-500 bg-transparent px-4 py-2 font-semibold text-blue-700 hover:border-transparent hover:bg-blue-500 hover:text-white">
                  Open GitPod
                </button>
              </a>
              <div className="px-6 py-4">
                {isNewish(repo.updated_at) && (
                  <span className="mr-2 inline-block rounded-full bg-green-200 px-3 py-1 text-sm font-semibold text-gray-700">
                    new
                  </span>
                )}
                <span className="inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700">
                  {repo.isPrivate ? "Members Only" : "FREE"}
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
