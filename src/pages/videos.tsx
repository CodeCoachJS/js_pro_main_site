import { type NextPage } from "next";
import Image from "next/image";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";

const VideosPage: NextPage = () => {
  const { data } = api.videos.getVideos.useQuery();
  const session = useSession();

  const isLoggedIn = session.data?.isMember;

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
          <div
            className="bg-card-bg text-card-text hover:bg-blue-lighter relative mx-2 my-2 max-w-md overflow-hidden rounded-md shadow-lg transition-colors duration-200"
            style={{
              flex: "1 1 25%",
              minWidth: "200px",
            }}
            key={video.url}
          >
            <a
              href={!video.isPublic && !isLoggedIn ? "#" : video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 z-10"
            />

            {!video.isPublic && !isLoggedIn && (
              <div className="absolute inset-0 z-20 flex items-center justify-center bg-black opacity-50">
                <span className="text-white">Private Video</span>
              </div>
            )}

            <div className="z-0 px-6 py-4">
              {video.thumbnail_url && (
                <Image
                  src={video.thumbnail_url}
                  alt={video.description}
                  width={480}
                  height={270}
                  className="h-48 w-full object-cover" // Adjust this as necessary
                />
              )}

              <div className="text-blue-lighter mb-2 text-xl font-bold">
                {video.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default VideosPage;
