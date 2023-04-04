import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Button, HStack, Text } from "@chakra-ui/react";

export const OtherPost = ({
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
