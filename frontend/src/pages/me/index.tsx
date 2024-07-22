import Loader from "@/components/Loader";
import { ProfilePageContainer } from "@/components/ProfilePageContainer";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import SidebarLayout from "@/components/Sidebar/SidebarLayout";
import {
  Project,
  useListProjectsByUserWithRoleLazyQuery,
} from "@/types/graphql";
import { Button, Heading } from "@chakra-ui/react";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { NextPageWithLayout } from "../_app";


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
Workspace.getLayout = function getLayout(page) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default Workspace;