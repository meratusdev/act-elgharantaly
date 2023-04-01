import { extendTheme } from "@chakra-ui/react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], display: "swap" });

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
  fonts: {
    heading: `${inter.style.fontFamily}, 'Open Sans', sans-serif`,
    body: `${inter.style.fontFamily},  sans-serif`,
  },
});

export default theme;
