import { ChevronRightIcon, SettingsIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Flex,
  IconButton,
  Image,
  Link,
  LinkBox,
  LinkOverlay,
  PropsOf,
  SlideFade,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React, { PropsWithChildren, useEffect, useState } from "react";
import Cookies from "js-cookie";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type LinkProps = PropsWithChildren & PropsOf<typeof Link>;

const CustomLink = ({ children, ...props }: LinkProps) => {
  return (
    <Link
      as={NextLink}
      _hover={{ textDecoration: "none", color: "accent" }}
      {...props}
    >
      {children}
    </Link>
  );
};
type User = {
  pseudo: string;
  role: string;
};
const Sidebar = ({ isOpen, setIsOpen }: Props) => {
  const [user, setUser] = useState<User>({ pseudo: "", role: "USER" });

  // TODO Get the Avatar of User
  useEffect(() => {
    const pseudo = Cookies.get("pseudo") ?? "";
    const role = Cookies.get("role") ?? "USER";

    setUser({ pseudo, role });
  }, [Cookies.get("pseudo"), Cookies.get("role")]);
  return (
    <Flex
      id="sidebar"
      transition="all .5s ease"
      style={{
        backgroundColor: "background",
        left: isOpen ? 0 : "-13rem",
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
        icon={<ChevronRightIcon />}
        transition="all .5s ease"
        _hover={{
          filter: "auto",
          brightness: "150%",
        }}
        style={{
          position: "absolute",
          rotate: isOpen ? "180deg" : "0deg",
          right: 0,
          translate: "50% 25%",
          backgroundColor: "gray",
          opacity: 0.7,
          fontSize: 24,
        }}
        onClick={() => setIsOpen(!isOpen)}
      />
      <SlideFade
        in={isOpen}
        offsetX="-16rem"
        transition={{
          exit: { delay: 0.1, duration: 0.5 },
          enter: { duration: 0.5 },
        }}
      >
        <Flex id="top-nav" pt={"4rem"} direction={"column"} gap={12}>
          <Flex id="user" gap={4} alignItems={"center"}>
            <Avatar name={user.pseudo} />
            <Text>{user.pseudo}</Text>
          </Flex>
          <Flex id="nav" direction={"column"} gap={4}>
            <CustomLink href="/me/profile">My Profile</CustomLink>
            <CustomLink href="/me/projects">My projects</CustomLink>
            <CustomLink href="/me/shared">Shared with me</CustomLink>
            <CustomLink href="/me/favorites">Favorites</CustomLink>
          </Flex>
        </Flex>
      </SlideFade>
      <SlideFade in={isOpen} offsetX="-16rem">
        <LinkBox
          _hover={{
            textDecoration: "none",
            color: "accent",
            appearance: "none",
          }}
        >
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
      </SlideFade>
    </Flex>
  );
};

export default Sidebar;
