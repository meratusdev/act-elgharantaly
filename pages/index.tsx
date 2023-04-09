import { type GetStaticPropsContext, type InferGetStaticPropsType } from "next";

import PageWrapper from "~/components/Layout/PageWrapper";
import { PaginationLayout } from "~/components/Layout/Pagination/Layout";
import { trpcServerSide } from "~/server/api/root";
import { siteConfig } from "~/siteconfig";

export const getStaticProps = async (
  context: GetStaticPropsContext<{ page: string }>,
) => {
  const page = (context.params?.page as string) || "1";

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
      title={`Blog ${siteConfig.author.name}`}
      description="Blog of posts"
    >
      <PaginationLayout {...props} />
    </PageWrapper>
  );
};

export default Index;
