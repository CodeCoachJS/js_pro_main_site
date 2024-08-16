import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import { api } from "~/utils/api";

// Define the ChallengePage component
const ChallengePage: React.FC = () => {
  // Use Next.js router to access query parameters
  const router = useRouter();
  const { name } = router.query;

  // State for README content and error handling
  // null indicates content hasn't been loaded yet
  const [readmeContent, setReadmeContent] = useState<string | null>(null);
  const [readmeError, setReadmeError] = useState<string | null>(null);

  // Decode the name from the URL
  // This handles cases where the name might contain special characters
  const decodedName = typeof name === "string" ? decodeURIComponent(name) : "";

  // Fetch repo data using the name
  // api.repos.getRepoByName is a tRPC query defined elsewhere
  const { data: repo, isLoading } = api.repos.getRepoByName.useQuery(
    { name: decodedName },
    { enabled: !!decodedName } // Only run query if name is available
  );

  // Effect to fetch README content when repo data is available
  useEffect(() => {
    if (repo?.url) {
      // Construct the raw content URL for README.md
      // Replace 'github.com' with 'raw.githubusercontent.com' to get the raw file
      const readmeUrl = `${repo.url.replace(
        "github.com",
        "raw.githubusercontent.com"
      )}/master/README.md`;

      // Fetch the README.md from the corresponding GitHub repo
      fetch(readmeUrl)
        .then((response) => {
          // Check if the response is ok (status in the range 200-299)
          if (!response.ok) {
            throw new Error(`Failed to fetch README: ${response.statusText}`);
          }
          return response.text();
        })
        .then((text) => {
          // Set the README content and clear any previous errors
          setReadmeContent(text);
          setReadmeError(null);
        })
        .catch((error) => {
          // Log the error and set an error message for the user
          console.error("Error fetching README:", error);
          setReadmeError(
            "Failed to load README. It might not exist or be inaccessible."
          );
          setReadmeContent(null);
        });
    }
  }, [repo?.url]); // Re-run this effect if repo.url changes

  // Show loading state while fetching repo data
  if (isLoading) return <div>Loading...</div>;

  // Show not found state if repo data isn't available
  if (!repo) return <div>Challenge not found</div>;

  // Main render
  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-4 text-2xl font-bold">Challenge: {repo.name}</h1>
      {readmeError ? (
        // Show error message if README fetch failed
        <p className="text-red-500">{readmeError}</p>
      ) : readmeContent ? (
        // Render README content as Markdown if available
        <ReactMarkdown>{readmeContent}</ReactMarkdown>
      ) : (
        // Show loading message while fetching README
        <p>Loading README...</p>
      )}
      {/* Link to view the repo on GitHub */}
      <a
        href={repo.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-block rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        View on GitHub
      </a>
    </div>
  );
};

export default ChallengePage;
