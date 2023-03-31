import { Heading } from "@chakra-ui/react";
import { DocumentRenderer } from "@keystatic/core/renderer";
import {
  type GetStaticPaths,
  type GetStaticPropsContext,
  type InferGetStaticPropsType,
} from "next";
import Balancer from "react-wrap-balancer";

import PageWrapper from "~/components/Layout/PageWrapper";
import { PostHeader } from "~/components/Layout/Post/Header";
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

  return {
    props: {
      data,
      id,
    },
  };
};

const PagePosts = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { id, data } = props;

  return (
    <PageWrapper title={data.title}>
      <PostHeader slug={props.id} date={data.publishedDate} />
      <Balancer>
        <Heading>{data.title}</Heading>
        <DocumentRenderer document={data.content} />
      </Balancer>
    </PageWrapper>
  );
};

export default PagePosts;
