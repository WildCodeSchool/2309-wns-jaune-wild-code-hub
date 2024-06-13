import {
  ChevronLeftIcon,
  ChevronRightIcon,
  SettingsIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Flex,
  IconButton,
  Image,
  Link,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React, { PropsWithChildren } from "react";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CustomLink = ({ children }: PropsWithChildren) => {
  return (
    <Link
      as={NextLink}
      _hover={{ textDecoration: "none", color: "teal.500" }}
      _focus={{ boxShadow: "outline" }}
    >
      {children}
    </Link>
  );
};

CustomLink.displayName = "CustomLink";

const Sidebar = ({ isOpen, setIsOpen }: Props) => {
  return (
    <Flex
      id="sidebar"
      style={{
        backgroundColor: "background",
        left: 0,
        top: 0,
        height: "100vh",
        paddingTop: "4.5rem",
        position: "fixed",
        paddingLeft: "2rem",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "start",
        paddingBottom: "3rem",
        fontSize: "1.25rem",
        width: "16rem",
      }}
    >
      <IconButton
        aria-label="toggle sidebar"
        icon={isOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        style={{
          position: "absolute",
          right: 0,
          translate: "50% 25%",
          backgroundColor: "gray",
          opacity: 0.7,
          fontSize: 24,
        }}
      />
      <Flex id="top-nav" pt={"4rem"} direction={"column"} gap={12}>
        <Flex id="user" gap={4} style={{}}>
          <Image alt="User Avatar" />
          <div>USERNAME</div>
        </Flex>
        <Flex id="nav" direction={"column"} gap={4}>
          <Link
            as={NextLink}
            href="/me/profile"
            style={{
              appearance: "none",
            }}
            _hover={{
              appearance: "none",
            }}
          >
            My Profile
          </Link>
          <Link
            as={NextLink}
            href="/me/projects"
            _hover={{
              appearance: "none",
            }}
          >
            My projects
          </Link>
          <Link
            as={NextLink}
            href="/me/shared"
            _hover={{
              appearance: "none",
            }}
          >
            Shared with me
          </Link>
          <Link
            as={NextLink}
            href="/me/favorites"
            _hover={{
              appearance: "none",
            }}
          >
            Favorites
          </Link>
        </Flex>
      </Flex>

      <LinkBox>
        <Box id="settings" fontSize={28}>
          <SettingsIcon marginRight={4} />
          <LinkOverlay
            as={NextLink}
            href="/me/settings"
            display={"inline-flex"}
            verticalAlign={"text-top"}
          >
            Settings
          </LinkOverlay>
        </Box>
      </LinkBox>
    </Flex>
  );
};

export default Sidebar;
