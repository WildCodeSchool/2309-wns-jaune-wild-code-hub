import { Grid, GridItem } from "@chakra-ui/react";
import ProjectCard from "./ProjectCard";
import { Project } from "@/types/graphql";

type GridProps = {
  projects: Omit<Project, "files">[];
};

export const ProjectsGrid = ({ projects }: GridProps) => {
  return (
    <Grid
      // width={{ base: "90%", md: "55%" }}
      templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(4, minmax(50px, 1fr))" }}
      gap={4}
      overflowY={"auto"}
      // height={"52cqh"}
      
      paddingTop={"3rem"}
      paddingBottom={{ base: "3rem", md: "0" }}
      css={{
        "&::-webkit-scrollbar": {
          width: "3px",
        },
        "&::-webkit-scrollbar-track": {
          background: "#f1f1f1",
          borderRadius: "10px",
          marginBottom: "10px",  
        },
        "&::-webkit-scrollbar-thumb": {
          background: "#888",
          borderRadius: "10px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          background: "#555",
        },
      }}
      paddingRight="1rem" 

    >
      {projects.map((project, id) => {
        return (
          <GridItem
            key={project.id + id}
            display={"flex"}
            justifyContent={"center"}
            height={"240px"}
            pb={"1rem"}
          >
            <ProjectCard project={project}></ProjectCard>
          </GridItem>
        );
      })}
    </Grid>
  );
};

