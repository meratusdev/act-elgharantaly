import { type InferGetStaticPropsType } from "next";

import PageWrapper from "~/components/Layout/PageWrapper";
import { SearchLayout } from "~/components/Layout/Search/Layout";
import { trpcServerSide } from "~/server/api/root";
import { siteConfig } from "~/siteconfig";

export const getStaticProps = async () => {
  const data = await trpcServerSide.posts.getAllPostSearch();

  return {
    props: { data },
  };
};

const Index = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <PageWrapper
      title={`Search | ${siteConfig.author.name}`}
      description="Search for posts"
    >
      <SearchLayout data={props.data} />
    </PageWrapper>
  );
};

export default Index;
