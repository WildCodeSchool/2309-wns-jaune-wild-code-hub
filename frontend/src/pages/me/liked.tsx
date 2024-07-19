"use-client";
import SidebarLayout from "@/components/Sidebar/SidebarLayout";
import React from "react";
import { NextPageWithLayout } from "../_app";
import { CustomGrid, ProfilePageContainer } from ".";
import { Button, Heading, Spinner } from "@chakra-ui/react";
import {
  ListLikeProjectQuery,
  ListLikeProjectQueryVariables,
  useListLikeProjectQuery,
} from "@/types/graphql";
import Cookies from "js-cookie";
import { useQuery } from "@apollo/client";
import { LIKED_PROJECTS } from "@/requetes/queries/project.queries";

const LikedPRojects: NextPageWithLayout = () => {
  const userId = Cookies.get("id");
  const { loading, error, data } = useQuery<
    ListLikeProjectQuery,
    ListLikeProjectQueryVariables
  >(LIKED_PROJECTS, {
    skip: !userId,
    variables: { userId: userId || "" },
  });
  console.log("data", data);
  return (
    <ProfilePageContainer>
      <Heading>Liked Projects</Heading>
      {loading ? (
        <Spinner
          thickness="5px"
          speed="0.65s"
          emptyColor="gray.200"
          color="accent"
          size="xl"
        />
      ) : error ? (
        <>An error occured</>
      ) : data?.listLikeProject.length ? (
        <CustomGrid data={data.listLikeProject} />
      ) : (
        <>There is no projects in your workspace !</>
      )}
      <Button variant={"secondary"}>Discover more projects</Button>
    </ProfilePageContainer>
  );
};
LikedPRojects.getLayout = function getLayout(page) {
  return <SidebarLayout>{page}</SidebarLayout>;
};
export default LikedPRojects;
