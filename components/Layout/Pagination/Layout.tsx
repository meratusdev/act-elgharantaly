import { Divider, Heading, Spacer, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import Balancer from "react-wrap-balancer";

import { Pagination } from "~/components/UI";
import { type OutputTypeTRPC } from "~/server/api/root";
import dateFormatter from "~/utils/dateFormatter";

type Props = OutputTypeTRPC["posts"]["pagination"];

export const PaginationLayout: React.FC<Props> = (props) => {
  const { paging, result } = props;

  return (
    <>
      <Stack spacing="6" divider={<Divider h="0.5px" bg="gray.300" />}>
        {result.map((post) => (
          <Link key={post.slug} href={`/post/${post.slug}`}>
            <Stack spacing="3">
              <Balancer>
                <Heading
                  size={{
                    base: "sm",
                    md: "lg",
                  }}
                  color="blackAlpha.900"
                >
                  {post.title}
                </Heading>
              </Balancer>
              <Text
                noOfLines={3}
                fontSize={{
                  base: "sm",
                  md: "lg",
                }}
                color="blackAlpha.800"
              >
                {post.summary}
              </Text>
              <Text
                pt="-2"
                color="blackAlpha.600"
                fontSize={{
                  base: "xs",
                  md: "md",
                }}
              >
                {dateFormatter(post.publishedDate, "d MMMM yyyy")}
              </Text>
            </Stack>
          </Link>
        ))}
      </Stack>
      <Spacer />
      <Pagination id="page" path="page" {...paging} />
    </>
  );
};
