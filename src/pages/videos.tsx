import { type NextPage } from "next";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import Link from "next/link";

const VideosPage: NextPage = () => {
  const { data } = api.videos.getVideos.useQuery();
  const session = useSession();

  if (!session.data?.isMember) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center py-2">
        <h1 className="text-4xl font-bold">You are not a member</h1>
        <p className="text-2xl">Please sign in to access this page</p>
        <button className="mt-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
          <Link href="/api/auth/signin">Sign in</Link>
        </button>
      </div>
    );
  }

  return (
    <>
      <div
        className="flex flex-wrap justify-center space-x-4 space-y-4"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {data?.map((video) => (
          <a
            key={video.url}
            href={video.url}
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
                {video.description}
              </div>
            </div>
            <div className="px-6 py-4">
              <span className="mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700">
                {new Date(video.created_at).toLocaleDateString()}
              </span>
            </div>
          </a>
        ))}
      </div>
    </>
  );
};

export default VideosPage;
