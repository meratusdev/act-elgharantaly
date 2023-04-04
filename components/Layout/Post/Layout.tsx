import { Box, Spacer, Stack } from "@chakra-ui/react";
import { DocumentRenderer } from "@keystatic/core/renderer";

import { PostHeader } from "~/components/Layout/Post/Header";
import { OtherPost } from "~/components/Layout/Post/OtherPost";
import { renderersPost } from "~/components/Layout/Post/RendererConfig";
import { Tags } from "~/components/Layout/Post/Tag";
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

      <Box pt="4">
        <Tags tags={data.tags} />
      </Box>

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
