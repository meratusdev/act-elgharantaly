import { Divider, Heading, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import Balancer from "react-wrap-balancer";

import PageWrapper from "~/components/Layout/PageWrapper";
import { trpc } from "~/utils/api";
import dateFormatter from "~/utils/dateFormatter";

const Home = () => {
  const { data } = trpc.posts.getAllPost.useQuery();

  if (!data) {
    return <p>Loading...</p>;
  }

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
