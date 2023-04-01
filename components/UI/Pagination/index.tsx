import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  Button,
  Center,
  HStack,
  IconButton,
  Square,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

import { createPageNumbers } from "~/components/UI/Pagination/utils";

interface PaginationProps {
  id: string;
  path: string;
  page: number;
  total: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export const Pagination: React.FC<PaginationProps> = ({
  path,
  page,
  total,
  hasNext,
  hasPrevious,
}) => {
  const router = useRouter();

  const pageNumber = createPageNumbers(page, total);

  return (
    <Center>
      <HStack>
        <IconButton
          aria-label="Previous page"
          size="sm"
          boxSize="40px"
          variant="ghost"
          isDisabled={!hasPrevious}
          icon={<ChevronLeftIcon h={6} w={6} />}
          onClick={() => {
            router.push(`/${path}/${page - 1}`, undefined);
          }}
        />
        <HStack>
          {pageNumber.map((i) => {
            const _text = i === null ? "..." : i;
            const isCurrent = i === page;

            return (
              <Square
                key={`page-${i}`}
                as={Button}
                variant={isCurrent ? "solid" : "ghost"}
                rounded="md"
                onClick={() => {
                  if (i !== null) {
                    router.push(`/${path}/${i}`, undefined);
                  }
                }}
              >
                <Text
                  fontSize={{
                    base: "sm",
                    md: "md",
                  }}
                >
                  {_text}
                </Text>
              </Square>
              // </a>
            );
          })}
        </HStack>
        <IconButton
          aria-label="Next page"
          size="sm"
          boxSize="40px"
          variant="ghost"
          isDisabled={!hasNext}
          onClick={() => {
            router.push(`/${path}/${page + 1}`, undefined);
          }}
          icon={<ChevronRightIcon h={6} w={6} />}
        />
      </HStack>
    </Center>
  );
};
