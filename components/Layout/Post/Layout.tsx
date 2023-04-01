import { Box, Stack } from "@chakra-ui/react";
import { DocumentRenderer } from "@keystatic/core/renderer";
import Balancer from "react-wrap-balancer";

import { PostHeader } from "~/components/Layout/Post/Header";
import { renderersPost } from "~/components/Layout/Post/RendererConfig";
import { type OutputTypeTRPC } from "~/server/api/root";

interface Props {
  data: OutputTypeTRPC["posts"]["getOnePost"];
  id: string;
}

export const PostLayout: React.FC<Props> = ({ id, data }) => {
  return (
    <>
      <PostHeader
        slug={id}
        title={data.title}
        date={data.publishedDate}
        image={data.coverImage}
      />
      <Balancer>
        <Stack
          pt={{
            base: "2",
            md: "4",
          }}
        >
          <Box pt="2">
            <DocumentRenderer
              renderers={renderersPost}
              document={data.content}
            />
          </Box>
        </Stack>
      </Balancer>
    </>
  );
};
