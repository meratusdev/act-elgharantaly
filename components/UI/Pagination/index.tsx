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
          href={hasPrevious ? `/${path}/${page - 1}` : undefined}
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
              <Button
                key={`page-${i}`}
                as="a"
                href={i === null ? undefined : `/${path}/${i}`}
                variant={isCurrent ? "solid" : "ghost"}
                rounded="md"
                cursor={isCurrent ? "default" : "pointer"}
                isDisabled={i === null}
              >
                <Text
                  fontSize={{
                    base: "sm",
                    md: "md",
                  }}
                >
                  {_text}
                </Text>
              </Button>
            );
          })}
        </HStack>
        <IconButton
          as="a"
          href={hasNext ? `/${path}/${page + 1}` : undefined}
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
