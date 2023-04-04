import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import { Box, Button, HStack, Spacer, Stack, Text } from "@chakra-ui/react";
import { DocumentRenderer } from "@keystatic/core/renderer";
import Balancer from "react-wrap-balancer";

import { PostHeader } from "~/components/Layout/Post/Header";
import { renderersPost } from "~/components/Layout/Post/RendererConfig";
import { type OutputTypeTRPC } from "~/server/api/root";

interface Props {
  data: OutputTypeTRPC["posts"]["getOnePost"];
  id: string;
  nextPrev: OutputTypeTRPC["posts"]["getNextPrevPost"];
}

export const PostLayout: React.FC<Props> = ({ id, data, nextPrev }) => {
  return (
    <>
      <PostHeader
        slug={id}
        title={data.title}
        date={data.publishedDate}
        image={data.coverImage}
      />

      <Stack
        pt={{
          base: "2",
          md: "4",
        }}
      >
        <Box pt="2">
          <DocumentRenderer renderers={renderersPost} document={data.content} />
        </Box>
      </Stack>

      <Stack
        direction={{
          base: "column",
          md: "row-reverse",
        }}
        pt="4"
      >
        {nextPrev.next && (
          <OtherPost
            title={nextPrev.next.title}
            slug={nextPrev.next.slug}
            direction="right"
          />
        )}
        <Spacer />
        {nextPrev.prev && (
          <OtherPost
            title={nextPrev.prev.title}
            slug={nextPrev.prev.slug}
            direction="left"
          />
        )}
      </Stack>
    </>
  );
};

const OtherPost = ({
  title,
  slug,
  direction,
}: {
  title: string;
  slug: string;
  direction: "left" | "right";
}) => {
  return (
    <Button
      as="a"
      href={`/post/${slug}`}
      justifyContent={direction === "left" ? "left" : "right"}
      size="sm"
    >
      <HStack spacing="2">
        {direction === "left" && <ChevronLeftIcon />}
        <Text fontSize="sm" fontWeight="normal">
          {title}
        </Text>
        {direction === "right" && <ChevronRightIcon />}
      </HStack>
    </Button>
  );
};
