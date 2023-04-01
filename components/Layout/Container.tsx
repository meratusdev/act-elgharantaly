import { Container, Stack } from "@chakra-ui/react";

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
  return (
    <Stack
      spacing="0"
      minH={{
        base: "100dvh",
        md: "100vh",
      }}
      pt={{
        base: "20",
        md: "24",
      }}
      pb="8"
    >
      {children}
    </Stack>
  );
};
