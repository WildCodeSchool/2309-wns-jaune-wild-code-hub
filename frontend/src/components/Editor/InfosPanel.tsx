import { File as EditorFile } from "@/types/editor";
import {
  Project,
  useListUsersLikesPerProjectLazyQuery,
  useListUsersWithAccessesLazyQuery,
  File
} from "@/types/graphql";
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
  IconButton,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import FileItemList from "../FileItemList";
type InfosPanelProps = {
  project: Project | null;
  setOpenFiles: React.Dispatch<React.SetStateAction<EditorFile[]>>;
  setCode: React.Dispatch<React.SetStateAction<string>>;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
};
const InfosPanel = ({ project, setOpenFiles, setCode, setFile }: InfosPanelProps) => {
  const router = useRouter();
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
      console.log("new file", newFile)
      newFile && (
        setOpenFiles((prevState) => {
          if (prevState.find((file) => file.id === newFile.id))
            return prevState;
          else return [...prevState, newFile];
        }),
        setCode(newFile.content),
        setFile(newFile)
      )
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
                      return (
                        <IconButton
                          aria-label="See user profile"
                          onClick={() => router.push(`user/${user?.id}`)}
                          icon={
                            <Avatar
                              key={user?.id}
                              name={user?.pseudo}
                              onClick={() => router.push(`/user/${user?.id}`)}
                              title={`See ${user?.pseudo} profile`}
                              _hover={{
                                cursor: "pointer",
                              }}
                            />
                          }
                        />
                      );
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
                      return (
                        <Avatar
                          key={user?.id}
                          name={user?.pseudo}
                          onClick={() => router.push(`/user/${user?.id}`)}
                          title={`See ${user?.pseudo} profile`}
                          _hover={{
                            cursor: "pointer",
                          }}
                        />
                      );
                  })}
                </AvatarGroup>
              </Box>

              <Box width={"100%"}>
                <Text>Likes : </Text>
                <AvatarGroup spacing={1} flexWrap={"wrap"} size={"sm"}>
                  {supporters?.map((user) => {
                    return (
                      <Avatar
                        key={user?.id}
                        name={user?.pseudo}
                        title={`See ${user?.pseudo} profile`}
                        _hover={{
                          cursor: "pointer",
                        }}
                        onClick={() => router.push(`/user/${user.id}`)}
                      />
                    );
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
