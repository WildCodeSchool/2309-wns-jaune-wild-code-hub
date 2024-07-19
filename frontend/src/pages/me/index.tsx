import ProjectCard from "@/components/ProjectCard";
import SidebarLayout from "@/components/SidebarLayout";
import { PROJECTS__WITH_ROLE_BY_USER } from "@/requetes/queries/project.queries";
import {
  ListProjectsByUserWithRoleQuery,
  ListProjectsByUserWithRoleQueryVariables,
  User,
} from "@/types/graphql";
import { useQuery } from "@apollo/client";
import { Button, Flex, Grid, GridItem, Heading } from "@chakra-ui/react";
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
      justifyContent={"space-between"}
      width={"100%"}
      direction={"column"}
      padding={"3rem 5rem 3rem 5rem"}
      style={{ containerName: "profile-page" }}
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
  console.log("data", data?.listProjectsByUserWithRole);
  // useEffect(() => {
  //   const id = Cookies.get("id") ?? "";
  //   if (id) {
  //   }
  // }, [Cookies.get("id")]);
  return (
    <ProfilePageContainer>
      <Heading fontSize={"3cqw"}>Welcome to your Workspace</Heading>
      <Grid
        width="100%"
        alignItems={"center"}
        templateColumns="repeat(auto-fit, minmax(150px,1fr))"
        gap={6}
        overflow={"auto"}
        height={"50cqh"}
      >
        {data &&
          data.listProjectsByUserWithRole.map((item, id) => {
            return (
              <GridItem
                key={item.project.id + id}
                display={"flex"}
                justifyContent={"center"}
                height={"23cqh"}
              >
                <ProjectCard item={item}></ProjectCard>
              </GridItem>
            );
          })}
      </Grid>
      <Button variant={"secondary"}>Create a project</Button>
    </ProfilePageContainer>
  );
};
Workspace.getLayout = function getLayout(page) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default Workspace;
