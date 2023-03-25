import { Box, Container } from "@chakra-ui/react";

export const ContainerWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Container
      maxW="container.xl"
      px={{
        base: "6",
        md: "8",
      }}
    >
      {children}
    </Container>
  );
};

export const ContentWrapper = ({ children }: { children: React.ReactNode }) => {
  return <Box py="6">{children}</Box>;
};
