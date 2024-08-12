import { Avatar, Flex, IconButton, Text } from "@chakra-ui/react";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { CustomLink } from "../CustomLink";
import { useRouter } from "next/router";

const AdminSidebar = () => {
  
  const router = useRouter();
  
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
            <IconButton
              aria-label="Go to profile page"
              onClick={() => router.push("/me")}
              icon={<Avatar name={user.pseudo} />}
            />
            <Text>{user.pseudo}</Text>
          </Flex>
          <Flex id="nav" direction={"column"} gap={4}>
            <CustomLink href="/admin">Projects Management</CustomLink>
            <CustomLink href="/admin/users">Users Management</CustomLink>
          </Flex>
        </Flex>
      )}
    </>
  );
};

export default AdminSidebar;
