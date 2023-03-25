import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    brand: {
      100: "#f7fafc",
      // ...
      900: "#1a202c",
    },
  },
  components: {
    Text: {
      baseStyle: {
        color: "blackAlpha.800",
      },
    },
    Heading: {
      baseStyle: {
        color: "blackAlpha.900",
      },
    },
  },
});

export default theme;
