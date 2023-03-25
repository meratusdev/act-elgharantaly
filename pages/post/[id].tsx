import { Heading } from "@chakra-ui/react";
import { DocumentRenderer } from "@keystatic/core/renderer";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import {
  type GetStaticPaths,
  type GetStaticPropsContext,
  type InferGetStaticPropsType,
} from "next";
import Balancer from "react-wrap-balancer";

import PageWrapper from "~/components/Layout/PageWrapper";
import { PostHeader } from "~/components/Layout/Post/Header";
import { appRouter, trpcServerSide } from "~/server/api/root";
import { trpc } from "~/utils/api";

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
  const ssg = await createProxySSGHelpers({
    router: appRouter,
    ctx: {},
  });
  const id = context.params?.id as string;
  await ssg.posts.getOnePost.prefetch({ slug: id });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
    revalidate: 1,
  };
};

const PagePosts = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { id } = props;
  const { data } = trpc.posts.getOnePost.useQuery({ slug: id });

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <PageWrapper title={data.title as string}>
      <PostHeader slug={props.id} date={data.publishedDate} />
      <Balancer>
        <Heading>{data.title}</Heading>
        <DocumentRenderer document={data.content} />
      </Balancer>
    </PageWrapper>
  );
};

export default PagePosts;
