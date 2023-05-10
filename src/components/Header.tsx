import { type NextComponentType } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";

const Header: NextComponentType = () => {
  const session = useSession();

  const isNotMember = !session.data?.isMember;

  return (
    <>
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

              <Link
                className="mr-4 text-blue-200 hover:text-white lg:inline-block"
                href="/videos"
              >
                Videos
              </Link>
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
      {isNotMember && (
        <div>
          <div className="flex flex-wrap justify-center">
            <div className="w-full max-w-4xl">
              <div className="flex flex-wrap justify-center">
                <div className="w-full px-4">
                  <div className="relative mb-6 flex w-full min-w-0 flex-col break-words rounded-lg bg-white shadow-lg">
                    <div className="mb-0 rounded-t bg-transparent px-4 py-3">
                      <div className="flex flex-wrap items-center">
                        <div className="relative w-full max-w-full flex-1 flex-grow px-4">
                          <h3 className="text-blueGray-700 text-center text-lg font-semibold">
                            Not a Member? Join{" "}
                            <Link
                              target="_blank"
                              className="text-blue-500 hover:text-blue-700"
                              href="https://yourcodecoach.com/not-another-course"
                            >
                              Not Another Course{" "}
                            </Link>
                            and get LIFETIME access to all the challenges and
                            videos + Slack access and weekly meetups
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
