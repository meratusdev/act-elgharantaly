import { Center, Container, Stack } from "@chakra-ui/react";

export const ContainerWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Container
      maxW="container.lg"
      px={{
        base: "3",
        md: "8",
      }}
    >
      {children}
    </Container>
  );
};

export const ContentWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Center>
      <Stack
        maxW="container.md"
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
        w="full"
      >
        {children}
      </Stack>
    </Center>
  );
};
