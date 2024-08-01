import React from "react";
import {
  Avatar,
  Box,
  Divider,
  Flex,
} from "@chakra-ui/react";
import { 
  Project,
} from "@/types/graphql";
import { GetOwnerUserProps } from "./InfosPanel";
import { useRouter } from "next/router";

interface ProjectInfoProps {
  project: Project | null;
  owner : GetOwnerUserProps | null | undefined;
}

const ProjectInfo: React.FC<ProjectInfoProps> = ({ project, owner }: ProjectInfoProps) => {
  
  const router = useRouter();

  return (
    <>
      <Flex
        width={"100%"}
        alignItems={"center"}
        flexDirection={"column"}
        gap={2}
        pb={2}
      >
        {owner && (
          <Avatar
            size={"md"}
            key={owner?.id}
            name={owner?.pseudo}
            onClick={() => router.push(`/user/${owner?.id}`)}
            title={`See ${owner?.pseudo} profile`}
            _hover={{
              cursor: "pointer",
            }}
          />
        )}
      </Flex>
      <Divider orientation="horizontal" />
      <Box>
        Created :{" "}
        {project?.created_at &&
          new Date(project.created_at).toLocaleDateString()}
      </Box>
      <Divider orientation="horizontal" />
      <Box>
        Last Update :{" "}
        {project?.update_at &&
          new Date(project.update_at).toLocaleDateString()}
      </Box>
    </>
  );
};

export default ProjectInfo;