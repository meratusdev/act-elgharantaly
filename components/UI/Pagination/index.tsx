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
          as="a"
          href={`/${path}/${page - 1}`}
          aria-label="Previous page"
          size="sm"
          boxSize="40px"
          variant="ghost"
          isDisabled={!hasPrevious}
          icon={<ChevronLeftIcon h={6} w={6} />}
        />
        <HStack>
          {pageNumber.map((i) => {
            const _text = i === null ? "..." : i;
            const isCurrent = i === page;

            return (
              <a key={page} href={i === null ? "#" : `/${path}/${i}`}>
                <Square
                  as={Button}
                  variant={isCurrent ? "solid" : "ghost"}
                  size="40px"
                  rounded="md"
                >
                  <Text>{_text}</Text>
                </Square>
              </a>
            );
          })}
        </HStack>
        <IconButton
          as="a"
          href={`/${path}/${page + 1}`}
          aria-label="Next page"
          size="sm"
          boxSize="40px"
          variant="ghost"
          isDisabled={!hasNext}
          icon={<ChevronRightIcon h={6} w={6} />}
        />
      </HStack>
    </Center>
  );
};
