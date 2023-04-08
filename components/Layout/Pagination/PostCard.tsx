import {
  Heading,
  Highlight,
  Stack,
  type SystemStyleObject,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import Balancer from "react-wrap-balancer";

import { siteConfig } from "~/siteconfig";
import dateFormatter from "~/utils/dateFormatter";

interface Props {
  title: string;
  slug: string;
  summary: string;
  publishedDate: string;
  fullText?: string;
  highlight?: string;
}

const highlightStyle: SystemStyleObject = {
  py: "1",
  bg: "gray.300",
};

export const PostCard: React.FC<Props> = ({
  title,
  slug,
  summary,
  publishedDate,
  fullText,
  highlight,
}) => {
  const isHighlight = highlight !== undefined;

  return (
    <Link key={slug} href={`/post/${slug}`}>
      <Stack spacing="3">
        <Balancer>
          <Heading
            fontSize={{
              base: "2xl",
              md: "2xl",
            }}
            color="blackAlpha.900"
          >
            {isHighlight ? (
              <Highlight query={highlight} styles={highlightStyle}>
                {title}
              </Highlight>
            ) : (
              title
            )}
          </Heading>
        </Balancer>
        {isHighlight ? (
          <HighlightSummary
            title={title}
            fullText={fullText as string}
            summary={summary}
            query={highlight}
          />
        ) : (
          <Text
            noOfLines={siteConfig.pagination.summary.noOfLines}
            fontSize={{
              base: "md",
              md: "md",
            }}
            color="blackAlpha.700"
          >
            {summary}
          </Text>
        )}
        <Text
          pt="-2"
          color="blackAlpha.600"
          fontSize={{
            base: "xs",
            md: "md",
          }}
        >
          {dateFormatter(publishedDate, "d MMMM yyyy")}
        </Text>
      </Stack>
    </Link>
  );
};

interface HighlightSummaryProps {
  title: string;
  fullText: string;
  summary: string;
  query: string;
}

const HighlightSummary: React.FC<HighlightSummaryProps> = ({
  title,
  fullText,
  summary,
  query,
}) => {
  const text = fullText.replace(title, "");
  const splitText = text.split(" ");

  const findIndex = (text: string[], query: string) => {
    const index = text
      .map((word) => word.toLowerCase())
      .findIndex((word) => word.includes(query.toLowerCase()));

    return index;
  };

  const indexHighlight = findIndex(splitText, query);

  if (indexHighlight === -1) {
    return (
      <Text
        noOfLines={siteConfig.pagination.summary.noOfLines}
        fontSize={{
          base: "md",
          md: "md",
        }}
        color="blackAlpha.700"
      >
        {summary}
      </Text>
    );
  }

  const start = indexHighlight - 10 < 0 ? 0 : indexHighlight - 10;
  const end = indexHighlight + 10;

  const textHighlight = splitText.slice(start, end).join(" ");

  return (
    <Text
      noOfLines={siteConfig.pagination.summary.noOfLines}
      fontSize={{
        base: "md",
        md: "md",
      }}
      color="blackAlpha.700"
    >
      <Highlight query={query} styles={highlightStyle}>
        {textHighlight}
      </Highlight>
    </Text>
  );
};
