import { Avatar, Flex, Link, PropsOf, SlideFade, Text } from "@chakra-ui/react";
import React, { PropsWithChildren, useState } from "react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
type LinkProps = PropsWithChildren & PropsOf<typeof Link>;

const CustomLink = ({ children, ...props }: LinkProps) => {
  const pathname = usePathname();
  return (
    <Link
      as={NextLink}
      color={pathname === props.href ? "secondary" : "text"}
      pointerEvents={pathname === props.href ? "none" : "auto"}
      _hover={{ textDecoration: "none", color: "accent" }}
      {...props}
    >
      {children}
    </Link>
  );
};
const MeSidebar = () => {
  const [user, setUser] = useState({ pseudo: "test" });
  // TODO Query User Information
  return (
    <Flex id="top-nav" pt={"4rem"} direction={"column"} gap={12}>
      <Flex id="user" gap={4} alignItems={"center"}>
        <Avatar name={user.pseudo} />
        <Text>{user.pseudo}</Text>
      </Flex>
      <Flex id="nav" direction={"column"} gap={4}>
        <CustomLink href="/me">My Workspace</CustomLink>
        <CustomLink href="/me/profile">My Profile</CustomLink>
        <CustomLink href="/me/projects">My projects</CustomLink>
        <CustomLink href="/me/shared">Shared with me</CustomLink>
        <CustomLink href="/me/favorites">Favorites</CustomLink>
      </Flex>
    </Flex>
  );
};

export default MeSidebar;