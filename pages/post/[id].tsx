import {
  type GetStaticPaths,
  type GetStaticPropsContext,
  type InferGetStaticPropsType,
} from "next";
import { title } from "process";

import PageWrapper from "~/components/Layout/PageWrapper";
import { PostLayout } from "~/components/Layout/Post/Layout";
import { trpcServerSide } from "~/server/api/root";

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
      title={props.data.title}
      ogImage={`/api/og-image?title=${title}`}
    >
      <PostLayout {...props} />
    </PageWrapper>
  );
};

export default PagePosts;
