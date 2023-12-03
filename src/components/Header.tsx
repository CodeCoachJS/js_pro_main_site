import { type NextComponentType } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useState } from "react";

const Header: NextComponentType = () => {
  const session = useSession();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const isNotMember = !session.data?.isMember;
  const isHomePage = router.pathname === "/";

  return (
    <>
      <header>
        <nav className="flex flex-wrap items-center justify-between bg-black p-6">
          <div className="mr-6 flex flex-shrink-0 items-center text-white">
            <Link href="/">
              <span className="text-2xl font-bold tracking-tight">JS Pros</span>
            </Link>
          </div>

          <div className="lg:hidden">
            <button type="button" onClick={() => setIsOpen(!isOpen)}>
              <svg viewBox="0 0 20 20" fill="white" className="menu h-6 w-6">
                <path
                  fillRule="evenodd"
                  d="M2 4.5A1.5 1.5 0 013.5 3h13a1.5 1.5 0 110 3h-13A1.5 1.5 0 012 4.5zm0 5A1.5 1.5 0 013.5 8h13a1.5 1.5 0 110 3h-13A1.5 1.5 0 012 9.5zm1.5 5a1.5 1.5 0 100 3h13a1.5 1.5 0 100-3h-13z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          <div
            className={`${
              isOpen ? "block" : "hidden"
            } w-full items-center lg:flex lg:w-auto`}
          >
            <div className="text-sm lg:flex-grow">
              <Link
                href="/syllabus"
                className="mr-4 mt-4 block text-blue-200 hover:text-white lg:mt-0 lg:inline-block"
              >
                Syllabus
              </Link>
              <Link
                href="/challenges"
                className="mr-4 mt-4 block text-blue-200 hover:text-white lg:mt-0 lg:inline-block"
              >
                Challenges
              </Link>

              <Link
                className="mr-4 mt-4 block text-white hover:text-teal-200 lg:mt-0 lg:inline-block"
                href="/videos"
              >
                Videos
              </Link>

              <Link
                className="mr-4 mt-4 block text-white hover:text-teal-200 lg:mt-0 lg:inline-block"
                href="/readings"
              >
                Readings
              </Link>

              <Link
                className="mr-4 mt-4 block text-white hover:text-teal-200 lg:mt-0 lg:inline-block"
                href="/meetups"
              >
                Recorded Weekly Meetings
              </Link>
              {session.data?.isMember ? (
                <>
                  <Link
                    href="/api/auth/signout"
                    className="mr-4 mt-4 block text-white hover:text-teal-200 lg:mt-0 lg:inline-block"
                  >
                    Sign out
                  </Link>
                  <Link
                    className="mr-4 mt-4 block text-white hover:text-teal-200 lg:mt-0 lg:inline-block"
                    href="https://billing.stripe.com/p/login/00g9AZ3sAa5ldws7ss"
                  >
                    Manage Subscription
                  </Link>
                </>
              ) : (
                <Link
                  href="/api/auth/signin"
                  className="mr-4 mt-4 block text-white hover:text-teal-200 lg:mt-0 lg:inline-block"
                >
                  Sign in
                </Link>
              )}
            </div>
          </div>
        </nav>
      </header>
      {isNotMember && !isHomePage && (
        <div>
          <div className="flex flex-wrap justify-center">
            <div className="w-full max-w-4xl">
              <div className="flex flex-wrap justify-center">
                <div className="w-full px-4">
                  <div className="relative mb-6 flex w-full min-w-0 flex-col break-words rounded-lg shadow-lg">
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
                            and get full access to all the challenges and videos
                            + Slack access and weekly meetups
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
