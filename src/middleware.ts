import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Get the NextAuth.js session token from the cookie
  const sessionToken = request.cookies.get("next-auth.session-token")?.value;

  // Protected routes that require authentication and membership
  const protectedRoutes = ["/readings"];

  const path = request.nextUrl.pathname;

  // Check if the path is a protected route and user doesn't have a session token
  if (
    protectedRoutes.some((route) => path.startsWith(route)) &&
    !sessionToken
  ) {
    const url = new URL("/", request.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/readings/:path*"],
};
