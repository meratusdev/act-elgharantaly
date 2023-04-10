import {
  type GetStaticPaths,
  type GetStaticPropsContext,
  type InferGetStaticPropsType,
} from "next";

import { PageWrapper } from "~/components/Layout";
import { PostLayout } from "~/components/Post";
import { trpcServerSide } from "~/server/api/root";
import { siteConfig } from "~/siteconfig";

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await trpcServerSide.posts.getAllSlug();

  return {
    paths: posts.map((post) => ({
      params: {
        id: post,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps = async (
  context: GetStaticPropsContext<{ id: string }>,
) => {
  const id = context.params?.id as string;

  const data = await trpcServerSide.posts.getOnePost({
    slug: id,
  });

  const nextPrev = await trpcServerSide.posts.getNextPrevPost({
    slug: id,
  });

  return {
    props: {
      id,
      data,
      nextPrev,
    },
  };
};

const PagePosts = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <PageWrapper
      title={`${props.data.title} | ${siteConfig.author.name}`}
      description={props.data.summary}
      ogImage={`/api/og/post?title=${props.data.title}`}
    >
      <PostLayout {...props} />
    </PageWrapper>
  );
};

export default PagePosts;
