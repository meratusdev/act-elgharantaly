import { type inferRouterOutputs } from "@trpc/server";

import { exampleRouter } from "~/server/api/routers/example";
import { postsRouter } from "~/server/api/routers/posts";
import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  posts: postsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

export const trpcServerSide = appRouter.createCaller({});

export type OutputTypeTRPC = inferRouterOutputs<AppRouter>;
