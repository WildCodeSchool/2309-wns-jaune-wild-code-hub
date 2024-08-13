"use-client";
import SidebarLayout from "@/components/Sidebar/SidebarLayout";
import { Project, useListLikeProjectLazyQuery } from "@/types/graphql";
import { Button, Heading } from "@chakra-ui/react";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

import Loader from "@/components/Loader";
import { ProfilePageContainer } from "@/components/ProfilePageContainer";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import { NextPageWithLayout } from "../_app";

const LikedProjects: NextPageWithLayout = () => {
  const [projects, setProjects] = useState<Omit<Project, "files">[]>([]);

  const userId = Cookies.get("id");

  const [getProjects, { error, loading, data }] = useListLikeProjectLazyQuery();

  useEffect(() => {
    if (userId) {
      getProjects({
        variables: {
          userId,
        },
        onCompleted(data) {
          setProjects(data.listLikeProject);
        },
      });
    }
  }, [userId, getProjects, data]);

  return (
    <ProfilePageContainer>
      <Heading fontSize={"3cqw"}>Welcome to your Workspace</Heading>
      {loading ? (
        <Loader />
      ) : error ? (
        <>An error occured</>
      ) : projects.length > 0 ? (
        <ProjectsGrid projects={projects} />
      ) : (
        <>There is no projects in your workspace !</>
      )}

      <Button variant={"secondary"}>Create a project</Button>
    </ProfilePageContainer>
  );
};
LikedProjects.getLayout = function getLayout(page) {
  return <SidebarLayout>{page}</SidebarLayout>;
};
export default LikedProjects;
