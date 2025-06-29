import NextAuth from "next-auth";
import { authOptions } from "~/server/auth";

export const runtime = "nodejs";

// Export the handler functions directly
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
export const { GET, POST } = NextAuth(authOptions);
