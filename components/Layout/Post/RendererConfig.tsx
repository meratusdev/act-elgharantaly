import { Text } from "@chakra-ui/react";
import { type DocumentRendererProps } from "@keystatic/core/renderer";

export const renderersPost: DocumentRendererProps["renderers"] = {
  // use your editor's autocomplete to see what other renderers you can override
  inline: {
    bold: ({ children }) => {
      return <strong>{children}</strong>;
    },
  },
  block: {
    paragraph: ({ children, textAlign }) => {
      return (
        <Text fontSize="md" py="2" lineHeight="28px" textAlign={textAlign}>
          {children}
        </Text>
      );
    },
  },
};
