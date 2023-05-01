import { type NextComponentType } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";

const Header: NextComponentType = () => {
  const session = useSession();

  return (
    <header>
      <nav className="flex flex-wrap items-center justify-between bg-gradient-to-r from-blue-500 to-purple-500 p-6">
        <div className="mr-6 flex flex-shrink-0 items-center text-white">
          <span className="text-2xl font-bold tracking-tight">JS Pros</span>
        </div>

        <div className="flex items-center">
          <div className="text-sm lg:flex-grow">
            <Link
              href="/"
              className="mr-4 text-blue-200 hover:text-white lg:inline-block"
            >
              Challenges
            </Link>
            {session?.data?.isMember && (
              <Link
                className="mr-4 text-blue-200 hover:text-white lg:inline-block"
                href="/videos"
              >
                Videos
              </Link>
            )}
          </div>
        </div>
        <div>
          <div>
            {session.data ? (
              <Link
                href="/api/auth/signout"
                className="inline-block rounded-full border border-white px-4 py-2 text-sm leading-none text-white hover:border-transparent hover:bg-white hover:text-blue-500"
              >
                Sign out
              </Link>
            ) : (
              <Link
                href="/api/auth/signin"
                className="inline-block rounded-full border border-white px-4 py-2 text-sm leading-none text-white hover:border-transparent hover:bg-white hover:text-blue-500"
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
