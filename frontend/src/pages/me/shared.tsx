import SidebarLayout from "@/components/Sidebar/SidebarLayout";
import {
  Project,
  useListProjectsByUserWithRoleLazyQuery,
} from "@/types/graphql";
import { Button, Heading } from "@chakra-ui/react";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

import Loader from "@/components/Loader";
import { ProfilePageContainer } from "@/components/ProfilePageContainer";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import { NextPageWithLayout } from "../_app";
import CreateProject from "@/components/CreateProject";

const SharedWithMe: NextPageWithLayout = () => {
  const [projects, setProjects] = useState<Omit<Project, "files">[]>([]);

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
          data.listProjectsByUserWithRole.map((item) => item.project)
        );
    }
  }, [userId, getProjects, data]);
  return (
    <ProfilePageContainer>
      <Heading>Shared Projects</Heading>
      {loading ? (
        <Loader />
      ) : error ? (
        <>An error occured</>
      ) : projects.length > 0 ? (
        <ProjectsGrid projects={projects} />
      ) : (
        <>You don&apos;t have any project shared by another user !</>
      )}
      <CreateProject />
    </ProfilePageContainer>
  );
};
SharedWithMe.getLayout = function getLayout(page) {
  return <SidebarLayout>{page}</SidebarLayout>;
};
export default SharedWithMe;
