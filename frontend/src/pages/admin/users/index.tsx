import SidebarLayout from "@/components/Sidebar/SidebarLayout";
import { Button, ButtonGroup, Center, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { NextPageWithLayout } from "../../_app";
import { useEffect, useState } from "react";
import {
  Project,
  useListProjectsLazyQuery,
} from "@/types/graphql";
import Loader from "@/components/Loader";
import { WarningIcon } from "@chakra-ui/icons";
import { ProjectsGrid } from "@/components/ProjectsGrid";

const AdminProject: NextPageWithLayout = () => {
  
  const [projects, setProjects] =
    useState<Omit<Project, "files">[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [numberCount, setNumberCount] = useState<number>(1);


  const [getProjects, { error, loading, data }] =
    useListProjectsLazyQuery();

  useEffect(() => {
    getProjects({
      variables: { offset: 8 * (currentPage - 1), limit: 8 },
      onCompleted(data) {
        setNumberCount(data.listProjects.total);
        setProjects(data.listProjects.projects);
      },
    });
  }, [currentPage, getProjects, data]);

  const next = () => {
    setCurrentPage(currentPage + 1);
  };

  const previous = () => {
    setCurrentPage(currentPage - 1);
  };

  const Loading = () => {
    return (
      <Center width={"100%"}>
        <Loader />
      </Center>
    );
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <Center width={"100%"}>
        <Stack direction="column" alignItems={"center"}>
          <WarningIcon color={"#FC8181"} boxSize={8} />
          <Text paddingInline={"4rem"} fontSize={20} textAlign={"center"}>
            An error occured while loading the user information, please refresh
            the page or try again later
          </Text>
        </Stack>
      </Center>
    );
  } 
  if (projects) {
    return (
      <Flex
        flexDirection={"column"}
        alignItems={"center"}
        width={"100%"}
        padding={"3rem 1rem 1rem 1rem"}
        gap={"3rem"}
      >
        <Heading textAlign={"center"} size={"lg"}>
          Admin - Users Management 
        </Heading>
        {projects ? 
          <ProjectsGrid projects={projects} admin={true} />
        : 
          <Loader />
        }

        <ButtonGroup display="flex" alignItems="center" mt="10" ml="4" spacing={4}>
          <Button
            variant={"outline"}
            w={"fit-content"}
            px={"3rem"}
            onClick={previous}
            isDisabled={currentPage === 1}
          >
            Prev
          </Button>
          <Button
            variant={"secondary"}
            w={"fit-content"}
            px={"3rem"}
            onClick={next}
            isDisabled={currentPage === Math.ceil(numberCount / 8)}
          >
            Next
          </Button>
        </ButtonGroup>
      </Flex>
    );
  }
};
AdminProject.getLayout = function getLayout(page) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default AdminProject;
