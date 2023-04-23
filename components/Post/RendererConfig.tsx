import { Box, Text } from "@chakra-ui/react";
import { type DocumentRendererProps } from "@keystatic/core/renderer";

export const renderersPost: DocumentRendererProps["renderers"] = {
  // use your editor's autocomplete to see what other renderers you can override
  inline: {
    bold: ({ children }) => {
      return <strong>{children}</strong>;
    },
    link({ href, children }) {
      return (
        <Text as="a" href={href} color="blue.500">
          {children}
        </Text>
      );
    },
  },
  block: {
    paragraph: ({ children, textAlign }) => {
      return (
        <Text
          fontSize={{
            base: "md",
            md: "lg",
          }}
          py="2"
          lineHeight={{
            base: "29px",
            md: "31px",
          }}
          textAlign={textAlign}
        >
          {children}
        </Text>
      );
    },
    blockquote: ({ children }) => {
      return (
        <Box>
          <Text
            as="blockquote"
            borderLeft="3px solid"
            borderColor="gray.700"
            pl="4"
            my="2"
          >
            {children}
          </Text>
        </Box>
      );
    },
  },
};
