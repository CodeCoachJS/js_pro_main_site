import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import { api } from "~/utils/api";

const ChallengePage: React.FC = () => {
  const router = useRouter();
  const { name } = router.query;
  const [readmeContent, setReadmeContent] = useState<string | null>(null);

  // Decode the name from the URL
  const decodedName = typeof name === 'string' ? decodeURIComponent(name) : '';

  // Fetch repo data using the name
  const { data: repo, isLoading } = api.repos.getRepoByName.useQuery(
    { name: decodedName },
    { enabled: !!decodedName }
  );

  useEffect(() => {
    if (repo?.name) {
      // Fetch the README.md from the corresponding GitHub repo
      fetch(`https://raw.githubusercontent.com/CodeCoachJS/${repo.name}/main/README.md`)
        .then((response) => response.text())
        .then((text) => setReadmeContent(text))
        .catch((error) => console.error("Error fetching README:", error));
    }
  }, [repo?.name]);

  if (isLoading) return <div>Loading...</div>;
  if (!repo) return <div>Challenge not found</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-4 text-2xl font-bold">Challenge: {repo.name}</h1>
      {readmeContent ? (
        <ReactMarkdown>{readmeContent}</ReactMarkdown>
      ) : (
        <p>Loading README...</p>
      )}
      
        href={repo.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-block rounded bg-blue-500 px-4 py-2 text-white"
      >
        View on GitHub
      </a>
    </div>
  );
};

export default ChallengePage;