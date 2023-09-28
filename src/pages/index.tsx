import { type NextPage } from "next";
import { env } from "~/env.mjs";
import { useEffect, useState, useMemo } from "react";
import Head from "next/head";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import LoadingIcon from "~/components/LoadingIcon";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();

  const { data } = api.repos.getRepos.useQuery();
  const [repos, setRepos] = useState(data);
  const [filter, setFilter] = useState<Set<string>>(new Set());
  const [searchVal, setSearchVal] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Repository[]>([]);

  interface Repository {
    id: number;
    name: string;
    description: string;
    isPrivate: boolean;
    url: string;
    updated_at: string;
  }

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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchVal(query);

    const performSearch = (query: string) => {
      const filteredResults: Repository[] = [];

      data?.filter((repo) => {
        const title = repo.name;
        const description = repo.description;
        const categories = repo.repo_categories.map(
          (category) => category.category.name
        );
        if (
          title.toLowerCase().includes(query) ||
          description.toLowerCase().includes(query) ||
          categories.some((category) => category.toLowerCase().includes(query))
        ) {
          filteredResults.push(repo);
        }
      });

      setSearchResults(filteredResults);
    };
    if (query.length >= 3) {
      performSearch(query.toLowerCase());
    } else {
      setSearchResults([]);
    }
  };

  const isNotMember = !sessionData || !sessionData?.isMember;

  return (
    <>
      <Head>
        <title>JS Pros</title>
        <meta name="description" content="JS Pros repos" />
      </Head>
      <main className="bg-purple min-h-screen">
        {!data && <LoadingIcon />}
        <input
          type="text"
          placeholder="Search Repositories"
          value={searchVal}
          onChange={handleInputChange}
          className="mx-auto mb-8 mt-8 block rounded-full border-2 border-purple-400 bg-purple-200 px-4 py-2 text-purple-800 transition-colors duration-300 focus:border-purple-600 focus:outline-none"
        />
        <div className="mt-5 flex flex-wrap justify-center">
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
        <p className="mt-2 text-center text-xl">
          Not sure where to start? I suggest checking out the main course
          material under <code>interview prep</code> or check out the{" "}
          <Link className="text-blue-500 hover:text-blue-700" href="/syllabus">
            Syllabus
          </Link>
        </p>
        <div
          className="flex flex-wrap justify-center space-x-4 space-y-4"
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {(searchVal.length <= 2 ? repos : searchResults)?.map((repo) => (
            <a
              key={repo?.id}
              href={isNotMember && repo?.isPrivate ? "#" : repo.url}
              target={isNotMember && repo?.isPrivate ? "_self" : "_blank"}
              rel="noopener noreferrer"
              className="bg-card-bg text-card-text hover:bg-blue-lighter group relative mx-2 my-2 max-w-md overflow-hidden rounded-md shadow-lg transition-colors duration-200"
              style={{
                flex: "1 1 25%",
                minWidth: "200px",
              }}
            >
              {repo.isPrivate && isNotMember && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  <div className="mb-2 text-center">
                    <p className="text-lg font-semibold text-white">
                      Members Only 😎
                    </p>
                  </div>
                  <div className="text-center">
                    <a
                      href={env.NEXT_PUBLIC_STRIPE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-500 px-4 py-2 text-lg font-semibold text-white hover:bg-blue-600"
                    >
                      Get Full Access
                    </a>
                  </div>
                </div>
              )}
              <div className="px-6 py-4">
                <div className="text-blue-lighter mb-2 text-xl font-bold">
                  {repo?.name}
                </div>
                <p className="text-base">{repo?.description}</p>
              </div>
              <a
                className="px-6 py-4"
                target={isNotMember && repo?.isPrivate ? "_self" : "_blank"}
                rel="noopener noreferrer"
                href={`${repo?.url}/codespaces`}
              >
                <button className="rounded border border-blue-500 bg-transparent px-4 py-2 font-semibold text-blue-700 hover:border-transparent hover:bg-blue-500 hover:text-white">
                  Open GitPod
                </button>
              </a>
              <div className="px-6 py-4">
                {isNewish(repo?.updated_at) && (
                  <span className="mr-2 inline-block rounded-full bg-green-200 px-3 py-1 text-sm font-semibold text-gray-700">
                    new
                  </span>
                )}
                <span className="inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700">
                  {repo?.isPrivate ? "Members Only" : "FREE"}
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
