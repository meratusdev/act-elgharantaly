import { createReader } from "@keystatic/core/reader";
import { z } from "zod";

import config from "~/keystatic.config";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { sortByDate } from "~/utils/sort";
import { unwrapContent } from "~/utils/unwrap";

const reader = createReader("", config);

const PostSchema = z.object({
  title: z.string(),
  summary: z.string(),
  slug: z.string(),
  publishedDate: z.string(),
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

  getAllPostSearch: publicProcedure.query(async () => {
    const postSlugs = await reader.collections.posts.list();

    const data = await Promise.all(
      postSlugs.map(async (slug) => {
        const post = await reader.collections.posts.read(slug);
        const content = await post?.content();

        return PostSchema.extend({ fullText: z.string() }).parse({
          ...post,
          content: content || [],
          fullText: unwrapContent(content, post?.title as string),
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

  pagination: publicProcedure
    .input(
      z.object({
        page: z.number().nullish(),
        limit: z.number().nullish(),
      }),
    )
    .query(async ({ input }) => {
      const page = input.page || 1;
      const limit = input.limit || 4;

      const postSlugs = await reader.collections.posts.list();

      const _data = await Promise.all(
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

      const data = sortByDate(_data, "desc");

      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;

      const result = data.slice(startIndex, endIndex);

      const totalPage =
        data.length % limit === 0
          ? data.length / limit
          : data.length / limit + 1;

      const paging = {
        page,
        limit,
        total: totalPage,
        hasNext: endIndex < data.length,
        hasPrevious: startIndex > 0,
      };

      return { paging, result };
    }),
});
