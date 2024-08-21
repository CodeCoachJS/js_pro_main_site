import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import { api } from "~/utils/api";
import Head from "next/head";

// Define custom components for ReactMarkdown
const components = {
  // Style paragraphs
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="mb-4">{children}</p>
  ),
  // Style headings
  h1: ({ children }: { children: React.ReactNode }) => (
    <h1 className="text-white-800 mb-4 text-2xl font-bold">{children}</h1>
  ),
  h2: ({ children }: { children: React.ReactNode }) => (
    <h2 className="mb-3 text-xl font-semibold text-purple-700">{children}</h2>
  ),
  h3: ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-white-600 mb-2 text-lg font-semibold">{children}</h3>
  ),
  // Style links
  a: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href} className="text-blue-500 hover:underline">
      {children}
    </a>
  ),
};

// Define the ChallengePage component
const ChallengePage: React.FC = () => {
  // Use Next.js router to get the 'name' parameter from the URL
  const router = useRouter();
  const { name } = router.query;

  // State for storing README content and any potential errors
  const [readmeContent, setReadmeContent] = useState<string | null>(null);
  const [readmeError, setReadmeError] = useState<string | null>(null);

  // Decode the challenge name from the URL
  const decodedName = typeof name === "string" ? decodeURIComponent(name) : "";

  // Fetch repo data using the challenge name
  const { data: repo, isLoading } = api.repos.getRepoByName.useQuery(
    { name: decodedName },
    { enabled: !!decodedName } // Only run the query if we have a name
  );

  // Function to convert plain URLs to Markdown links
  const convertUrlsToLinks = (text: string) => {
    const urlRegex =
      /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
    return text.replace(urlRegex, "[$1]($1)");
  };

  // Effect to fetch README content when repo data is available
  useEffect(() => {
    if (repo?.url) {
      // Construct the URL for the raw README content on GitHub
      const readmeUrl = `${repo.url.replace(
        "github.com",
        "raw.githubusercontent.com"
      )}/master/README.md`;

      // Fetch the README.md from the corresponding GitHub repo
      fetch(readmeUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to fetch README: ${response.statusText}`);
          }
          return response.text();
        })
        .then((text) => {
          const processedText = convertUrlsToLinks(text);
          setReadmeContent(processedText);
          setReadmeError(null);
        })
        .catch((error) => {
          console.error("Error fetching README:", error);
          setReadmeError(
            "Failed to load README. It might not exist or be inaccessible."
          );
          setReadmeContent(null);
        });
    }
  }, [repo?.url]); // Re-run effect if repo.url changes

  // Show loading state while fetching repo data
  if (isLoading)
    return <div className="text-center text-white">Loading...</div>;
  // Show not found state if we don't have repo data
  if (!repo)
    return <div className="text-center text-white">Challenge not found</div>;

  // Function to split README content into sections based on headers
  const splitIntoSections = (content: string) => {
    return content
      .split(/(?=^#{1,3} )/m)
      .filter((section) => section.trim() !== "");
  };

  return (
    <>
      {/* Set page title and description */}
      <Head>
        <title>{`Challenge: ${repo.name}`}</title>
        <meta name="description" content={repo.description} />
      </Head>
      {/* Main content area with purple background */}
      <main className="bg-purple min-h-screen">
        <div className="container mx-auto p-6">
          {/* Challenge title */}
          <h1 className="mb-4 text-center text-4xl font-bold text-white">
            Challenge: {repo.name}
          </h1>

          {/* Challenge description - styled for better readability */}
          <p className="text-300 mb-6 text-center text-2xl font-semibold capitalize">
            {repo.description}
          </p>

          {/* GitHub link button*/}
          <div className="mb-6 text-center">
            <a
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full bg-purple-500 px-6 py-2 text-white transition-colors duration-300 hover:bg-purple-600"
            >
              View on GitHub
            </a>
          </div>

          {/* README content or error message */}
          {readmeError ? (
            // Display error message if README fetch failed
            <div className="rounded-md bg-white p-4 text-center text-red-500">
              {readmeError}
            </div>
          ) : readmeContent ? (
            // Display README content in card layout
            <div className="grid grid-cols-1 gap-6">
              {splitIntoSections(readmeContent).map((section, index) => (
                <div key={index} className="rounded-md bg-white p-6 shadow-lg">
                  {/* Heading line of each readme card */}
                  <div className="inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700">
                    {section.split("\n")[0].replace(/^#+\s*/, "")}
                  </div>
                  {/* Render the rest of the section content */}
                  <ReactMarkdown components={components}>
                    {section.split("\n").slice(1).join("\n")}
                  </ReactMarkdown>
                </div>
              ))}
            </div>
          ) : (
            // Show loading message while fetching README
            <p className="text-center text-white">Loading README...</p>
          )}
        </div>
      </main>
    </>
  );
};

export default ChallengePage;
