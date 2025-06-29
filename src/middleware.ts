import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Protected routes that require authentication and membership
  const protectedRoutes = [
    "/readings",
  ];

  const path = request.nextUrl.pathname;

  // Check if the path is a protected route and user is not a member
  if (protectedRoutes.some(route => path.startsWith(route)) && (!token || !token.isMember)) {
    const url = new URL("/", request.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/readings/:path*",
  ],
}; 