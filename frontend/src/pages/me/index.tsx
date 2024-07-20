import { ProfilePageContainer } from "@/components/ProfilePageContainer";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import SidebarLayout from "@/components/Sidebar/SidebarLayout";
import {
  Project,
  useListProjectsByUserWithRoleLazyQuery,
} from "@/types/graphql";
import { Button, Heading, Spinner } from "@chakra-ui/react";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { NextPageWithLayout } from "../_app";

// TODO Add search bar
// TODO Add filter

// TODO Add pagination

const Workspace: NextPageWithLayout = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  const userId = Cookies.get("id");

  const [getProjects, { error, loading, data }] =
    useListProjectsByUserWithRoleLazyQuery();
  useEffect(() => {
    if (userId) {
      getProjects({
        variables: {
          userId,
        },
        onCompleted(data) {
          setProjects(
            data.listProjectsByUserWithRole.map((item) => item.project)
          );
        },
      });
    }
  }, [userId, getProjects, data]);
  return (
    <ProfilePageContainer>
      <Heading fontSize={"3cqw"}>Welcome to your Workspace</Heading>
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
        <>There is no projects in your workspace !</>
      )}

      <Button variant={"secondary"}>Create a project</Button>
    </ProfilePageContainer>
  );
};
Workspace.getLayout = function getLayout(page) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default Workspace;
