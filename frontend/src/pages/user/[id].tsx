import SidebarLayout from "@/components/Sidebar/SidebarLayout";
import { Center, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "../_app";
import { useEffect, useState } from "react";
import {
  Project,
  useFindUserInfosByIdLazyQuery,
  useListPublicOwnedByUserLazyQuery,
} from "@/types/graphql";
import Loader from "@/components/Loader";
import { WarningIcon } from "@chakra-ui/icons";
import { ProjectsGrid } from "@/components/ProjectsGrid";

type UserProfile = {
  __typename?: "User";
  id: string;
  pseudo: string;
  ban: boolean;
  last_login: any;
  firstname: string;
  lastname: string;
  email: string;
};

const UserProfile: NextPageWithLayout = () => {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | undefined>(undefined);
  const [projects, setProjects] =
    useState<Pick<Project, "id" | "category" | "name">[]>();

  const [getProjects] = useListPublicOwnedByUserLazyQuery();

  const [getUser, { loading, error }] = useFindUserInfosByIdLazyQuery();
  useEffect(() => {
    router.query &&
      getUser({
        variables: {
          findUserByIdId: router.query.id as string,
        },
        onCompleted(data) {
          setUser(data.findUserById);
          getProjects({
            variables: {
              listPublicProjectsOwnedByUserId: data.findUserById.id,
            },
            onCompleted(data) {
              setProjects(
                data.listPublicProjectsOwnedByUser.map((item) => item.project)
              );
            },
          });
        },
      });
  }, [router, getUser, getProjects]);

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

  if (error) {
    return (
      <Center width={"100%"}>
        <Stack direction="column" alignItems={"center"}>
          <WarningIcon color={"#FC8181"} boxSize={8} />
          <Text paddingInline={"4rem"} fontSize={20} textAlign={"center"}>
            An error occured while loading the user information, please refresh
            the page or try again later
          </Text>
        </Stack>
      </Center>
    );
  }
  if (user) {
    return (
      <Flex
        flexDirection={"column"}
        alignItems={"center"}
        width={"100%"}
        padding={"3rem 1rem 1rem 1rem"}
        gap={"3rem"}
      >
        <Heading textAlign={"center"} size={"lg"}>
          Welcome to {user.pseudo}&apos;s Workspace Public
        </Heading>
        {projects ? <ProjectsGrid projects={projects} /> : <Loader />}
      </Flex>
    );
  }
};
UserProfile.getLayout = function getLayout(page) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default UserProfile;
