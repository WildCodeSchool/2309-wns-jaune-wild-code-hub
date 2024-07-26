import { Avatar, Flex, Text } from "@chakra-ui/react";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { CustomLink } from "../CustomLink";

const MeSidebar = () => {
  const [user, setUser] = useState<Record<string, string> | null>(null);
  const pseudo = Cookies.get("pseudo");
  useEffect(() => {
    pseudo && setUser({ pseudo });
  }, [pseudo]);
  return (
    <>
      {user && (
        <Flex id="top-nav" pl={"2rem"} direction={"column"} gap={12}>
          <Flex id="user" gap={4} alignItems={"center"}>
            <Avatar name={user.pseudo} />
            <Text>{user.pseudo}</Text>
          </Flex>
          <Flex id="nav" direction={"column"} gap={4}>
            <CustomLink href="/me">My Workspace</CustomLink>
            <CustomLink href="/me/projects">My projects</CustomLink>
            <CustomLink href="/me/shared">Shared with me</CustomLink>
            <CustomLink href="/me/liked">Liked</CustomLink>
          </Flex>
        </Flex>
      )}
    </>
  );
};

export default MeSidebar;
