import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
} from "@chakra-ui/react";
import Link from "next/link";

import { ContainerWrapper } from "~/components/Layout/Container";

export const Navbar = () => {
  return (
    <Box
      py={{
        base: "2",
        md: "7",
      }}
      position="absolute"
      borderBottom="1px"
      borderColor="gray.200"
      w="full"
    >
      <ContainerWrapper>
        <HStack>
          <Link href="/">
            <Heading
              color="blackAlpha.800"
              size={{
                base: "md",
                md: "xl",
              }}
            >
              ACT-Elgharantaly
            </Heading>
          </Link>
          <Spacer />
          <Menu>
            <MenuButton
              as={IconButton}
              icon={
                <HamburgerIcon
                  h={{
                    base: "5",
                    md: "8",
                  }}
                  w={{
                    base: "5",
                    md: "8",
                  }}
                />
              }
              variant="ghost"
            />
            <MenuList>
              <MenuItem>Download</MenuItem>
              <MenuItem>Create a Copy</MenuItem>
              <MenuItem>Mark as Draft</MenuItem>
              <MenuItem>Delete</MenuItem>
              <MenuItem>Attend a Workshop</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </ContainerWrapper>
    </Box>
  );
};
