import SidebarLayout from "@/components/SidebarLayout";
import React, { useState } from "react";
import { NextPageWithLayout } from "../_app";
import {
  ListProjectsByUserWithRoleQuery,
  ListProjectsByUserWithRoleQueryResult,
  ListProjectsByUserWithRoleQueryVariables,
  User,
} from "@/types/graphql";
import Cookies from "js-cookie";
import { useQuery } from "@apollo/client";
import { PROJECTS__WITH_ROLE_BY_USER } from "@/requetes/queries/project.queries";
import { Button, Flex, Heading } from "@chakra-ui/react";

const Projects: NextPageWithLayout = () => {
  const [user, setUser] = useState<User>();
  const userId = Cookies.get("id");

  const { error, loading, data } = useQuery<
    ListProjectsByUserWithRoleQuery,
    ListProjectsByUserWithRoleQueryVariables
  >(PROJECTS__WITH_ROLE_BY_USER, {
    skip: !userId,
    variables: { userId: userId || "", userRole: ["OWNER"] },
  });
  console.log("data", data);
  return (
    <Flex
      flexDirection={"column"}
      gap={"3rem"}
      width={"100%"}
      justifyContent={"space-around"}
      alignItems={"center"}
    >
      <Heading>My Projects</Heading>
      {data && data.listProjectsByUserWithRole.length > 0 ? (
        <></>
      ) : (
        <>It seems like you dont have any project yet</>
      )}
      <Button variant={"secondary"}>Create a new project</Button>
    </Flex>
  );
};
Projects.getLayout = function getLayout(page) {
  return <SidebarLayout>{page}</SidebarLayout>;
};
export default Projects;
