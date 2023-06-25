import { createTRPCRouter } from "~/server/api/trpc";
import { repos } from "~/server/api/routers/repos";
import { videos } from "~/server/api/routers/videos";
import { documents } from "~/server/api/routers/documents";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  repos,
  videos,
  documents,
});

// export type definition of API
export type AppRouter = typeof appRouter;
