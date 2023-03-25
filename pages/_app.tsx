import { ChakraProvider } from "@chakra-ui/react";
import { type AppType } from "next/dist/shared/lib/utils";

import theme from "~/styles";
import { trpc } from "~/utils/api";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default trpc.withTRPC(MyApp);
