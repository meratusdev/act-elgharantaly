import { Divider, Heading, Stack, Text } from "@chakra-ui/react";
import { createReader } from "@keystatic/core/reader";
import { type InferGetStaticPropsType } from "next";
import Link from "next/link";
import Balancer from "react-wrap-balancer";

import PageWrapper from "~/components/Layout/PageWrapper";
import config from "~/keystatic.config";
import { trpcServerSide } from "~/server/api/root";
import dateFormatter from "~/utils/dateFormatter";

const reader = createReader("", config);

const getAllPost = async () => {
  const postSlugs = await reader.collections.posts.list();

  console.log("postSlugs", postSlugs);

  const data = await Promise.all(
    postSlugs.map(async (slug) => {
      const post = await reader.collections.posts.read(slug);
      const content = await post?.content();
      return {
        ...post,
        content: content || [],
        slug,
      };
    }),
  );

  return data;
};

export async function getStaticProps() {
  // const data = await trpcServerSide.posts.getAllPost();
  const data = await getAllPost();

  return {
    props: {
      data,
    },
    revalidate: 10,
  };
}

const Home = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { data } = props;

  return (
    <PageWrapper title="Home">
      <Stack spacing="6" divider={<Divider h="0.5px" bg="gray.300" />}>
        {data.map((post) => (
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
    </PageWrapper>
  );
};

export default Home;
