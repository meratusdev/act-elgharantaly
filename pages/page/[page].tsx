import { Divider, Heading, Stack, Text } from "@chakra-ui/react";
import { range } from "lodash";
import {
  type GetStaticPaths,
  type GetStaticPropsContext,
  type InferGetStaticPropsType,
} from "next";
import Link from "next/link";
import Balancer from "react-wrap-balancer";

import PageWrapper from "~/components/Layout/PageWrapper";
import { Pagination } from "~/components/UI";
import { trpcServerSide } from "~/server/api/root";
import dateFormatter from "~/utils/dateFormatter";

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = await trpcServerSide.posts.pagination({});

  const paths = range(1, pages.paging.total + 1).map((page) => ({
    params: {
      page: page.toString(),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (
  context: GetStaticPropsContext<{ page: string }>,
) => {
  const page = context.params?.page as string;

  const data = await trpcServerSide.posts.pagination({
    page: parseInt(page),
  });

  return {
    props: data,
  };
};

const PagePagination = (
  props: InferGetStaticPropsType<typeof getStaticProps>,
) => {
  const { paging, result } = props;

  return (
    <PageWrapper title="Home">
      <Stack spacing="6" divider={<Divider h="0.5px" bg="gray.300" />}>
        {result.map((post) => (
          <Link key={post.slug} href={`/post/${post.slug}`}>
            <Stack spacing="3">
              <Balancer>
                <Heading>{post.title}</Heading>
              </Balancer>
              <Text noOfLines={2} fontSize="xl">
                {post.summary}
              </Text>
              <Text pt="-2" color="blackAlpha.700">
                {dateFormatter(post.publishedDate, "d MMMM yyyy")}
              </Text>
            </Stack>
          </Link>
        ))}
      </Stack>
      <Pagination id="page" path="page" {...paging} />
    </PageWrapper>
  );
};

export default PagePagination;
