import { type NextPage } from "next";
import { api } from "~/utils/api";

const VideosPage: NextPage = () => {
  const { data } = api.videos.getVideos.useQuery();
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
