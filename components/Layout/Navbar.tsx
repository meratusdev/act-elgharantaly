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
  Text,
} from "@chakra-ui/react";
import Link from "next/link";

import { ContainerWrapper } from "~/components/Layout/Container";

export const Navbar = () => {
  return (
    <Box
      py={{
        base: "2",
        md: "4",
      }}
      position="absolute"
      w="full"
    >
      <ContainerWrapper>
        <HStack>
          <Link href="/">
            <Heading
              color="blackAlpha.800"
              fontSize={{
                base: "xl",
                md: "2xl",
              }}
              fontWeight="extrabold"
            >
              ACT-Elgharantaly
            </Heading>
          </Link>
          <Spacer />
          <MobileMenu />
          <DesktopMenu />
        </HStack>
      </ContainerWrapper>
    </Box>
  );
};

const listMenu: Array<{ title: string; href: string }> = [
  {
    title: "Archive",
    href: "/archive",
  },
  {
    title: "Search",
    href: "/search",
  },
  {
    title: "About",
    href: "/about",
  },
];

const MobileMenu = () => {
  return (
    <Box
      display={{
        base: "block",
        md: "none",
      }}
    >
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
          {listMenu.map((item) => (
            <Link key={item.title} href={item.href}>
              <MenuItem>{item.title}</MenuItem>
            </Link>
          ))}
        </MenuList>
      </Menu>
    </Box>
  );
};

const DesktopMenu = () => {
  return (
    <HStack
      display={{
        base: "none",
        md: "flex",
      }}
      spacing="6"
    >
      {listMenu.map((item) => (
        <Link key={item.title} href={item.href}>
          <Text fontWeight="medium">{item.title}</Text>
        </Link>
      ))}
    </HStack>
  );
};
