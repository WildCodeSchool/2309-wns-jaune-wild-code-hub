import Loader from "@/components/Loader";
import { ProfilePageContainer } from "@/components/ProfilePageContainer";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import { Project, useListPublicProjectsLazyQuery } from "@/types/graphql";
import {
  Box,
  Button,
  Heading,
  Stack
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { NextPageWithLayout } from "../_app";

const Workspace: NextPageWithLayout = () => {
  const [projects, setProjects] = useState<Omit<Project, "files">[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [numberCount, setNumberCount] = useState<number>(1);

  const [getPublicProjects, { error, loading, data }] =
    useListPublicProjectsLazyQuery();

  useEffect(() => {
    getPublicProjects({
      variables: { offset: 8 * (currentPage - 1), limit: 8 },
      onCompleted(data) {
        setNumberCount(data.listPublicProjects.total);
        setProjects(data.listPublicProjects.projects);
      },
    });
  }, [currentPage, getPublicProjects, data]);

  const next = () => {
    setCurrentPage(currentPage + 1);
  };

  const previous = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <Box paddingTop="3rem" bg={"black"} overflow="hidden">
      <ProfilePageContainer>
        <Heading
          textAlign="center"
          color="white"
          fontSize={{ base: "24px", sm: "40px" }}
          paddingBottom={{ base: "2rem", md: "40px" }}
        >
          What Wild Code Hub offers
        </Heading>

        {loading ? (
          <Loader />
        ) : error ? (
          <>An error occured</>
        ) : projects.length > 0 ? (
          <ProjectsGrid projects={projects} />
        ) : (
          <>There are no projects</>
        )}

        <Stack
          direction={{ base: "row", md: "row" }}
          marginTop={{ base: "1.5rem", sm: "3rem" }}
          gap={"2rem"}
          justify="center"
        >
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
        </Stack>
      </ProfilePageContainer>
    </Box>
  );
};

export default Workspace;
