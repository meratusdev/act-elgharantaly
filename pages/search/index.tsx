import { type InferGetStaticPropsType } from "next";

import PageWrapper from "~/components/Layout/PageWrapper";
import { SearchLayout } from "~/components/Layout/Search/Layout";
import { trpcServerSide } from "~/server/api/root";

export const getStaticProps = async () => {
  const data = await trpcServerSide.posts.getAllPostSearch();

  return {
    props: { data },
  };
};

const Index = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <PageWrapper title="Pencarian">
      <SearchLayout data={props.data} />
    </PageWrapper>
  );
};

export default Index;
