import { type NextPage } from "next";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import PrivatePageWarning from "~/components/PrivatePage";

const WeeklyMeetingVideos: NextPage = () => {
  const { data } = api.videos.getWeeklyMeetings.useQuery();

  const session = useSession();

  const isLoggedIn = session.data?.isMember;

  if (!isLoggedIn) {
    return <PrivatePageWarning />;
  }

  return (
    <div className="mt-10 flex items-center justify-center">
      <div className="max-w-md rounded-md p-6 shadow-lg">
        <h2 className="mb-4 text-center text-2xl font-bold">
          Weekly Meeting Recordings
        </h2>
        <ul className="space-y-4">
          {data?.map((video) => (
            <li
              key={video.url}
              className="cursor-pointer rounded-md px-4 py-2 transition-colors duration-200 hover:bg-gray-200"
            >
              <a
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700"
              >
                {video.description || "Weekly Meeting"}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WeeklyMeetingVideos;
