import ProjectCard from "@/components/ProjectCard";
import SidebarLayout from "@/components/SidebarLayout";
import { PROJECTS__WITH_ROLE_BY_USER } from "@/requetes/queries/project.queries";
import {
  ListProjectsByUserWithRoleQuery,
  ListProjectsByUserWithRoleQueryVariables,
  User,
} from "@/types/graphql";
import { useQuery } from "@apollo/client";
import { Flex, Grid, GridItem, Heading } from "@chakra-ui/react";
import Cookies from "js-cookie";
import { PropsWithChildren, useState } from "react";
import { NextPageWithLayout } from "../_app";

// TODO Add search bar
// TODO Add filter
// TODO Add "Create Project" Button
// TODO Add pagination

export const ProfilePageContainer = ({ children }: PropsWithChildren) => {
  return (
    <Flex
      alignItems={"center"}
      width={"100%"}
      direction={"column"}
      paddingInline={"2rem"}
    >
      {children}
    </Flex>
  );
};
const Workspace: NextPageWithLayout = () => {
  const [user, setUser] = useState<User>();
  const userId = Cookies.get("id");

  const { error, loading, data } = useQuery<
    ListProjectsByUserWithRoleQuery,
    ListProjectsByUserWithRoleQueryVariables
  >(PROJECTS__WITH_ROLE_BY_USER, {
    skip: !userId,
    variables: { userId: userId || "" },
  });

  // useEffect(() => {
  //   const id = Cookies.get("id") ?? "";
  //   if (id) {
  //   }
  // }, [Cookies.get("id")]);
  return (
    <ProfilePageContainer>
      <Heading marginBottom={"3rem"}>Welcome to your Workspace</Heading>
      <Grid
        width="100%"
        justifyContent={"center"}
        alignItems={"center"}
        templateColumns="repeat(auto-fit, minmax(200px,1fr))"
        gap={6}
      >
        {data &&
          data.listProjectsByUserWithRole.map((item, id) => {
            return (
              <GridItem
                key={item.project.id + id}
                display={"flex"}
                justifyContent={"center"}
              >
                <ProjectCard item={item}></ProjectCard>
              </GridItem>
            );
          })}
        {data &&
          data.listProjectsByUserWithRole.map((item, id) => {
            return (
              <GridItem
                key={item.project.id + id}
                display={"flex"}
                justifyContent={"center"}
              >
                <ProjectCard item={item}></ProjectCard>
              </GridItem>
            );
          })}
      </Grid>
    </ProfilePageContainer>
  );
};
Workspace.getLayout = function getLayout(page) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default Workspace;
