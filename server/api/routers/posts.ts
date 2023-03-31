import { createReader } from "@keystatic/core/reader";
import { concat } from "lodash";
import { z } from "zod";

import config from "~/keystatic.config";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const reader = createReader("", config);

const PostSchema = z.object({
  title: z.string(),
  summary: z.string(),
  slug: z.string(),
  publishedDate: z.string().nullable(),
  coverImage: z.string().nullable(),
  instagramLink: z.string().nullable(),
  tags: z.array(z.string().nullable()),
  content: z.any(),
});

export const postsRouter = createTRPCRouter({
  getAllSlug: publicProcedure.query(async () => {
    const data = await reader.collections.posts.list();
    return data;
  }),

  getAllPost: publicProcedure.query(async () => {
    const postSlugs = await reader.collections.posts.list();

    const data = await Promise.all(
      postSlugs.map(async (slug) => {
        const post = await reader.collections.posts.read(slug);
        const content = await post?.content();

        return PostSchema.parse({
          ...post,
          content: content || [],
          slug,
        });
      }),
    );

    return data;
  }),

  getOnePost: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const data = await reader.collections.posts.read(input.slug);

      const content = await data?.content();

      return PostSchema.omit({ slug: true }).parse({
        ...data,
        content: content || [],
      });
    }),
});
