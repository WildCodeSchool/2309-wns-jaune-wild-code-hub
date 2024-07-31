import { File as EditorFile } from "@/types/graphql";
import {
  Project,
  useListUsersLikesPerProjectLazyQuery,
  useListUsersWithAccessesLazyQuery,
  File,
} from "@/types/graphql";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Avatar,
  AvatarGroup,
  Badge,
  Box,
  Divider,
  Flex,
  Heading,
  Stack,
  Text
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import FileItemList from "./FileItemList"
import AddFile from "@/components/Editor/FileManagementEditor/AddFile";
import DownloadFile from "./FileManagementEditor/DownloadFile";

type InfosPanelProps = {
  project: Project | null;
  setOpenFiles: React.Dispatch<React.SetStateAction<EditorFile[]>>;
  setCode: React.Dispatch<React.SetStateAction<string>>;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  setProject: React.Dispatch<React.SetStateAction<Project | null>>;
  setData: React.Dispatch<React.SetStateAction<File[]>>;
  data: File[];
};

export type GenerateLanguageProps =  {
  name : string,
  extension : string,
  language : string,
}

const InfosPanel = ({ project, setOpenFiles, setCode, setFile, setProject, setData, data }: InfosPanelProps) => {
  const router = useRouter();
  const [maxAvatar, setMaxAvatar] = useState<number>(9);
  const [owner, setOwner] = useState<
    | {
        __typename?: "User";
        pseudo: string;
        id: string;
      }
    | null
    | undefined
  >(null);

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
          setContributors(
            data.listUsersAccessesProject.filter((user) => user.role != "OWNER")
          );
          setOwner(
            data.listUsersAccessesProject.find((user) => user.role === "OWNER")
              ?.user
          );
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

  const handleOpenFiles: (fileId: number) => void = (fileId: number) => {
    if (project) {
      const { files } = project;
      const newFile = files.find((file) => +file.id === fileId);
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

  const generateLanguage: (name : string, extention : string) => GenerateLanguageProps = (name : string, extention : string): GenerateLanguageProps => {
    let newData : GenerateLanguageProps = {
      name : name,
      extension : extention,
      language : "",
    }
    
    switch (extention) {
      case "js":
        newData.language = "javascript"
        break;
      case "css":
        newData.language = "css"
        break;
      case "html":
        newData.language = "html"
        break;
    }
    return newData;
  }

  return (
    <Flex height={"100%"} flexDirection={"column"}>
      <Flex flexDirection={"column"} textAlign={"center"} paddingBlock={4}>
        <Heading size={"md"} textAlign={"center"}>
          {project?.name}
        </Heading>
      </Flex>

      <Accordion allowToggle defaultIndex={[0]}>
        <AccordionItem position={"relative"}>
          {({ isExpanded }) => {
            return (
              <>
                <h2>
                  <AccordionButton as="div">
                    <Box as="span" flex="1" textAlign="left">
                      Files
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <AddFile
                    project={project}
                    setProject={setProject}
                    setData={setData}
                    setOpenFiles={setOpenFiles}
                    setCode={setCode}
                    setFile={setFile}
                    generateLanguage={generateLanguage}
                  />
                  <DownloadFile 
                    data={data}
                    project={project}
                  />
                  <Flex flexDirection={"column"}>
                    {project?.files
                      ? project.files.map((file) => (
                          <FileItemList
                            key={file.id}
                            file={file}
                            handleOpenFiles={handleOpenFiles}
                            project={project}
                            setProject={setProject}
                            setData={setData}
                            setOpenFiles={setOpenFiles}
                            setCode={setCode}
                            setFile={setFile}
                            generateLanguage={generateLanguage}
                          />
                        ))
                      : "There will be files here in the near futur"}
                  </Flex>
                </AccordionPanel>
              </>
            );
          }}
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
            <Flex flexDirection={"column"} gap={2}>
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
              <Divider orientation="horizontal" />
              <Box width={"100%"}>
                <Stack direction={"row"} alignItems={"center"}>
                  <Text>Contributors : </Text>
                  <Badge
                    height={"fit-content"}
                    bgColor="primary"
                    color={"black"}
                  >
                    {contributors?.length || 0}
                  </Badge>
                </Stack>
                <AvatarGroup spacing={1} flexWrap={"wrap"} size={"sm"} max={9}>
                  {contributors && contributors.length > 0 ? (
                    contributors?.map((contributor) => {
                      const { user } = contributor;
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
                    })
                  ) : (
                    <Text>No contributors on this project</Text>
                  )}
                </AvatarGroup>
              </Box>
              <Divider orientation="horizontal" />
              <Box width={"100%"}>
                <Stack direction={"row"} alignItems={"center"}>
                  <Text>Likes : </Text>
                  <Badge height={"fit-content"} bgColor="secondary">
                    {supporters.length}
                  </Badge>
                </Stack>
                <AvatarGroup spacing={1} flexWrap={"wrap"} size={"sm"}>
                  {supporters?.map((user, index) => {
                    if (index < maxAvatar) {
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
                    }
                  })}
                  {supporters.length > maxAvatar && (
                    <Avatar
                      title="Show all users"
                      _hover={{
                        cursor: "pointer",
                      }}
                      name={`+${supporters.length - maxAvatar}`}
                      getInitials={(name) => name}
                      backgroundColor={"grey"}
                      onClick={() => setMaxAvatar(supporters.length)}
                    />
                  )}
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
