import { ChevronLeftIcon, ChevronRightIcon, Icon } from "@chakra-ui/icons";
import { Button, Center, HStack, IconButton, Text } from "@chakra-ui/react";
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
        <ButtonLink
          ariaLabel="Previous page"
          href={`/${path}/${page - 1}`}
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
        <ButtonLink
          ariaLabel="Next page"
          href={`/${path}/${page + 1}`}
          icon={<ChevronRightIcon h={6} w={6} />}
          isDisabled={!hasNext}
        />
      </HStack>
    </Center>
  );
};

interface Props {
  ariaLabel: string;
  href: string;
  isDisabled: boolean;
  icon: JSX.Element;
}

const ButtonLink: React.FC<Props> = ({ href, isDisabled, ariaLabel, icon }) => {
  if (isDisabled) {
    return (
      <IconButton
        aria-label={ariaLabel}
        size="sm"
        boxSize="40px"
        variant="ghost"
        isDisabled={isDisabled}
        icon={icon}
      />
    );
  }

  return (
    <IconButton
      as="a"
      href={href}
      aria-label={ariaLabel}
      size="sm"
      boxSize="40px"
      variant="ghost"
      isDisabled={isDisabled}
      icon={icon}
    />
  );
};
