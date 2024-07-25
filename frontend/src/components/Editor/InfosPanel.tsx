import {
  File,
  ListUsersAccessesProjectLazyQueryHookResult,
  ListUsersWithAccessesLazyQueryHookResult,
  Project,
  useListUsersAccessesProjectLazyQuery,
  useListUsersLikesPerProjectLazyQuery,
  useListUsersWithAccessesLazyQuery,
} from "@/types/graphql";
import { File as EditorFile } from "@/types/editor";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Avatar,
  AvatarGroup,
  Box,
  Flex,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import FileItemList from "../FileItemList";
import { LIST_USERS_WITH_ACCESSES } from "@/requetes/queries/usersAccessesProjects.queries";
import { useLazyQuery } from "@apollo/client";
type InfosPanelProps = {
  project: Project | null;
  setOpenFiles: React.Dispatch<React.SetStateAction<EditorFile[]>>;
};
const InfosPanel = ({ project, setOpenFiles }: InfosPanelProps) => {
  const [contributors, setContributors] = useState<Array<{
    __typename?: "FindAllInfoUserAccessesProject";
    role: string;
    user?: {
      __typename?: "User";
      pseudo: string;
      id: string;
    } | null;
  }> | null>(null);
  const [supporters, setSupporters] = useState<
    {
      __typename?: "User";
      pseudo: string;
      id: string;
    }[]
  >([]);

  //TODO Add Link to Profile page of user + toolttip
  const [getContributors] = useListUsersWithAccessesLazyQuery();
  const [getSupporters] = useListUsersLikesPerProjectLazyQuery();
  useEffect(() => {
    if (project) {
      getContributors({
        variables: {
          projectId: +project.id,
        },
        onCompleted(data) {
          setContributors(data.listUsersAccessesProject);
        },
      });
      getSupporters({
        variables: {
          projectId: +project.id,
        },
        onCompleted(data) {
          setSupporters(data.listUsersLikesPerProject);
        },
      });
    }
  }, [project, getContributors, getSupporters]);

  const handleOpenFiles = (fileId: number) => {
    if (project) {
      const { files } = project;
      const newFile = files.find((file) => +file.id === fileId);
      newFile &&
        setOpenFiles((prevState) => {
          return [...prevState, newFile];
        });
    }
  };

  return (
    <Flex height={"100%"} flexDirection={"column"}>
      <Flex flexDirection={"column"} textAlign={"center"} paddingBlock={4}>
        <Heading size={"md"} textAlign={"center"}>
          Project Name
        </Heading>
      </Flex>

      <Accordion allowToggle>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Files
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Flex flexDirection={"column"}>
              {project?.files
                ? project.files.map((file) => (
                    <FileItemList
                      key={file.id}
                      file={file}
                      openFiles={handleOpenFiles}
                    />
                  ))
                : "There will be files here in the near futur"}
            </Flex>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Infos
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Flex flexDirection={"column"}>
              <Box width={"100%"}>
                <Text>Creator : </Text>
                <AvatarGroup spacing={1} flexWrap={"wrap"} size={"sm"}>
                  {contributors?.map((contributor) => {
                    const { user } = contributor;
                    if (contributor.role === "OWNER")
                      return <Avatar key={user?.id} name={user?.pseudo} />;
                  })}
                </AvatarGroup>
              </Box>
              <Box>Created : {project?.created_at}</Box>
              <Box>Last Update : {project?.update_at} </Box>
              <Box width={"100%"}>
                <Text>Contributors : </Text>
                <AvatarGroup spacing={1} flexWrap={"wrap"} size={"sm"}>
                  {contributors?.map((contributor) => {
                    const { user } = contributor;
                    if (contributor.role != "OWNER")
                      return <Avatar key={user?.id} name={user?.pseudo} />;
                  })}
                </AvatarGroup>
              </Box>

              <Box width={"100%"}>
                <Text>Likes : </Text>
                <AvatarGroup spacing={1} flexWrap={"wrap"} size={"sm"}>
                  {supporters?.map((user) => {
                    return <Avatar key={user?.id} name={user?.pseudo} />;
                  })}
                </AvatarGroup>
              </Box>
            </Flex>
          </AccordionPanel>
        </AccordionItem>
        {/* 
        one day there will be copmment in this project */}
        {/* <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Comment
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Flex flexDirection={"column"}></Flex>
          </AccordionPanel>
        </AccordionItem> */}
      </Accordion>
    </Flex>
  );
};

export default InfosPanel;
