import { z } from "zod";

const ConfigSchema = z.object({
  author: z.object({
    name: z.string(),
    avatar: z.string(),
  }),
  pagination: z.object({
    postPerPage: z.number(),
    title: z.object({
      noOfLines: z.number(),
    }),
    summary: z.object({
      noOfLines: z.number(),
    }),
  }),
});

const createConfig = (config: z.infer<typeof ConfigSchema>) => {
  return ConfigSchema.parse(config);
};

export const siteConfig = createConfig({
  author: {
    name: "ACT El-Gharantaly",
    avatar: "/avatar.jpg",
  },
  pagination: {
    postPerPage: 10,
    title: {
      noOfLines: 3,
    },
    summary: {
      noOfLines: 2,
    },
  },
});
