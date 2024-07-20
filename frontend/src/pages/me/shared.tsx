import SidebarLayout from "@/components/Sidebar/SidebarLayout";
import {
  Project,
  useListProjectsByUserWithRoleLazyQuery,
} from "@/types/graphql";
import { Button, Heading, Spinner } from "@chakra-ui/react";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

import { NextPageWithLayout } from "../_app";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import { ProfilePageContainer } from "@/components/ProfilePageContainer";

const SharedWithMe: NextPageWithLayout = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  const userId = Cookies.get("id");

  const [getProjects, { error, loading, data }] =
    useListProjectsByUserWithRoleLazyQuery();

  useEffect(() => {
    if (userId) {
      getProjects({
        variables: {
          userId,
          userRole: ["EDITOR", "VIEWER"],
        },
      });
      data?.listProjectsByUserWithRole &&
        setProjects(
          data?.listProjectsByUserWithRole.map((item) => item.project)
        );
    }
  }, [userId, getProjects, data]);
  return (
    <ProfilePageContainer>
      <Heading>Shared Projects</Heading>
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
      ) : projects.length > 0 ? (
        <ProjectsGrid projects={projects} />
      ) : (
        <>You don&apos;t have any project shared by another user !</>
      )}
      <Button variant={"secondary"}>Create a project</Button>
    </ProfilePageContainer>
  );
};
SharedWithMe.getLayout = function getLayout(page) {
  return <SidebarLayout>{page}</SidebarLayout>;
};
export default SharedWithMe;
