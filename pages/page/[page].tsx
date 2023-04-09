import { range } from "lodash";
import {
  type GetStaticPaths,
  type GetStaticPropsContext,
  type InferGetStaticPropsType,
} from "next";

import PageWrapper from "~/components/Layout/PageWrapper";
import { PaginationLayout } from "~/components/Layout/Pagination/Layout";
import { trpcServerSide } from "~/server/api/root";
import { siteConfig } from "~/siteconfig";

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

const Index = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <PageWrapper
      title={`Page ${props.paging.page} | ${siteConfig.author.name}`}
      description="Page of posts"
    >
      <PaginationLayout {...props} />
    </PageWrapper>
  );
};

export default Index;
