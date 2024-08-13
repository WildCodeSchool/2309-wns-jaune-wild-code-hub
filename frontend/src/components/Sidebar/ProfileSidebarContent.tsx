import { Avatar, Center, Flex, IconButton, Text, Textarea } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { CustomLink } from "../CustomLink";
import Loader from "../Loader";
import { useRouter } from "next/router";
import UserProfile from "@/pages/user/[id]";
import { useFindUserInfosByIdLazyQuery } from "@/types/graphql";

const ProfileSidebarContent = () => {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | undefined>(undefined);

  const [getUser, { loading }] = useFindUserInfosByIdLazyQuery();
  useEffect(() => {
    router.query &&
      getUser({
        variables: {
          findUserByIdId: router.query.id as string,
        },
        onCompleted(data) {
          setUser(data.findUserById);
        },
      });
  }, [router, getUser]);

  const Loading = () => {
    return (
      <Center width={"100%"}>
        <Loader />
      </Center>
    );
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      {user && (
        <Flex id="top-nav" pl={"2rem"} direction={"column"} gap={12}>
          <Flex
            id="user"
            gap={4}
            alignItems={"center"}
            flexDirection={"column"}
            pr={"2rem"}
          >
            <IconButton
              aria-label="Go to profile page"
              onClick={() => router.push("/me")}
              icon={<Avatar name={user.pseudo} />}
            />
            <Text>{user.pseudo}</Text>
          </Flex>
          <Flex id="nav" direction={"column"} gap={4}>
            {" "}
            {/* <Textarea>
              {user.bio}
            </Textarea> 
            // Add location
            // Add external links
            */}
            <CustomLink href={`/user/${user.id}`}>Workspace</CustomLink>
            <CustomLink href={`/user/${user.id}/liked`}>Liked</CustomLink>
          </Flex>
        </Flex>
      )}
    </>
  );
};

export default ProfileSidebarContent;
