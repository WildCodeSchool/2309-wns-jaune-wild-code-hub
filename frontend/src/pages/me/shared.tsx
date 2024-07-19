import SidebarLayout from "@/components/Sidebar/SidebarLayout";
import { PROJECTS__WITH_ROLE_BY_USER } from "@/requetes/queries/project.queries";
import {
  ListProjectsByUserWithRoleQueryResult,
  ListProjectsByUserWithRoleQueryVariables,
  User,
} from "@/types/graphql";
import { useQuery } from "@apollo/client";
import Cookies from "js-cookie";
import { useState } from "react";
import { NextPageWithLayout } from "../_app";
import { CustomGrid, ProfilePageContainer } from ".";
import { Button, Heading } from "@chakra-ui/react";

const SharedWithMe: NextPageWithLayout = () => {
  const [user, setUser] = useState<User>();
  const userId = Cookies.get("id");

  const { error, loading, data } = useQuery<
    ListProjectsByUserWithRoleQueryResult,
    ListProjectsByUserWithRoleQueryVariables
  >(PROJECTS__WITH_ROLE_BY_USER, {
    skip: !userId,
    variables: { userId: userId || "", userRole: ["EDITOR", "VIEWER"] },
  });
  console.log("data", data);
  return (
    <ProfilePageContainer>
      <Heading>Shared Projects</Heading>
      <CustomGrid data={data}></CustomGrid>
      <Button variant={"secondary"}>Create a project</Button>
    </ProfilePageContainer>
  );
};
SharedWithMe.getLayout = function getLayout(page) {
  return <SidebarLayout>{page}</SidebarLayout>;
};
export default SharedWithMe;
