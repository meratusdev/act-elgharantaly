import { HStack, Icon, Stack, Tag, Text } from "@chakra-ui/react";
import { AiFillTag } from "react-icons/ai";

export const Tags = ({ tags }: { tags: string[] | null }) => {
  if (!tags) {
    return <></>;
  }

  return (
    <Stack direction="row" spacing="2" opacity="90%">
      {tags.map((tag) => (
        <Tag
          key={tag}
          // as="a"
          // href={`/tags/${tag}`}
        >
          <HStack>
            <Icon as={AiFillTag} h={3} w={3} />
            <Text>{tag}</Text>
          </HStack>
        </Tag>
      ))}
    </Stack>
  );
};
