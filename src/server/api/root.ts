import { createTRPCRouter } from "~/server/api/trpc";
import { repos } from "~/server/api/routers/repos";
import { videos } from "~/server/api/routers/videos";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  repos,
  videos,
});

// export type definition of API
export type AppRouter = typeof appRouter;
