import { createClient } from "@supabase/supabase-js";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { env } from "~/env.mjs";
import { appRouter } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";

const supabaseUrl = env.SUPABASE_URL;
const supabaseKey = env.SUPABASE_SECRET;

// Create supabase client but don't export it
const createSupabaseClient = () => createClient(supabaseUrl, supabaseKey);

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// export API handler
export async function GET(req: Request) {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () =>
      createTRPCContext({ req, supabase: createSupabaseClient() }),
    onError:
      env.NODE_ENV === "development"
        ? ({ path, error }) => {
            console.error(
              `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
            );
          }
        : undefined,
  });
}

export async function POST(req: Request) {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () =>
      createTRPCContext({ req, supabase: createSupabaseClient() }),
    onError:
      env.NODE_ENV === "development"
        ? ({ path, error }) => {
            console.error(
              `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
            );
          }
        : undefined,
  });
}
