import { Grid, GridItem } from "@chakra-ui/react";
import ProjectCard from "./ProjectCard";
import { Project } from "@/types/graphql";

type GridProps = {
  projects: Pick<Project, "id" | "category" | "name">[];
  admin ?: boolean;
};

export const ProjectsGrid = ({ projects, admin }: GridProps) => {
  return (
    <Grid
      templateColumns={{
        base: "repeat(1, 1fr)",
        md: "repeat(4, minmax(50px, 1fr))",
      }}
      gap={6}
      overflowY={"auto"}
      height={{ base: "53cqh", md: "fit-content" }}
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
            height={"225px"}
          >
            { admin ?
              <ProjectCard project={project} admin={true} />
            :
              <ProjectCard project={project} />
            }
          </GridItem>
        );
      })}
    </Grid>
  );
};
