import { Box, Divider, Spacer, Stack } from "@chakra-ui/react";

import { PostCard } from "~/components/Layout/Pagination/PostCard";
import { Pagination } from "~/components/UI";
import { type OutputTypeTRPC } from "~/server/api/root";

type Props = OutputTypeTRPC["posts"]["pagination"];

export const PaginationLayout: React.FC<Props> = (props) => {
  const { paging, result } = props;

  return (
    <>
      <Stack spacing="6" divider={<Divider h="0.5px" borderColor="gray.300" />}>
        {result.map((post) => (
          <PostCard key={post.slug} {...post} />
        ))}
      </Stack>
      <Spacer />
      <Box pt="3">
        <Pagination id="page" path="page" {...paging} />
      </Box>
    </>
  );
};
