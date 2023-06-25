import { type NextPage } from "next";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import PrivatePageWarning from "~/components/PrivatePage";

const ReadingsPage: NextPage = () => {
  const { data } = api.documents.getDocuments.useQuery();
  const session = useSession();

  const isLoggedIn = session.data?.isMember;

  if (!isLoggedIn) {
    return <PrivatePageWarning />;
  }

  return (
    <div className="mt-10 flex items-center justify-center">
      <div className="max-w-md rounded-md p-6 shadow-lg">
        <h2 className="mb-4 text-center text-2xl font-bold">
          Leaders are Readers 📚
        </h2>
        <ul className="space-y-4">
          {data?.map((doc) => (
            <li
              key={doc.url}
              className="cursor-pointer rounded-md px-4 py-2 transition-colors duration-200 hover:bg-gray-200"
            >
              <a
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700"
              >
                {doc.name}
              </a>
              <p>{doc.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ReadingsPage;
