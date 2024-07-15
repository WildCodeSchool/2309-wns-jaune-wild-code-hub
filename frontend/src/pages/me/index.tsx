import ProjectCard from "@/components/ProjectCard";
import SidebarLayout from "@/components/SidebarLayout";
import { PROJECTS, PROJECTS_BY_USER } from "@/requetes/queries/user.queries";
import {
  ListProjectsByUserQuery,
  ListProjectsByUserQueryVariables,
  QueryListProjectsByUserArgs,
  User,
} from "@/types/graphql";
import { useLazyQuery, useQuery } from "@apollo/client";
import { Flex, Grid, GridItem, Heading } from "@chakra-ui/react";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { NextPageWithLayout } from "../_app";

const Workspace: NextPageWithLayout = () => {
  const [user, setUser] = useState<User>();

  // TODO Use cookies to get user id and then load projects
  const { error, data } = useQuery<
    ListProjectsByUserQuery,
    ListProjectsByUserQueryVariables
  >(PROJECTS_BY_USER, { variables: { listProjectsByUserId: "1" } });

  console.log("projects", data);
  // useEffect(() => {
  //   const id = Cookies.get("id") ?? "";
  //   if (id) {
  //   }
  // }, [Cookies.get("id")]);
  return (
    <Flex alignItems={"center"} width={"100%"} direction={"column"} pr={"5rem"}>
      <Heading marginBottom={"3rem"}>Welcome to your Workspace</Heading>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        {data &&
          data.listProjectsByUser.map((project, id) => {
            console.log("project", project);
            return (
              <GridItem key={project.id + id}>
                <ProjectCard project={project}></ProjectCard>
              </GridItem>
            );
          })}
      </Grid>
    </Flex>
  );
};
Workspace.getLayout = function getLayout(page) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default Workspace;
