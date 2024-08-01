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
  Box,
  Divider,
  Flex,
  Heading,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import FileItemList from "./FileManagementEditor/FileItemList"
import AddFile from "@/components/Editor/InfoPanel/FileManagementEditor/AddFile";
import DownloadFile from "./FileManagementEditor/DownloadFile";
import Cookies from "js-cookie";
import ContributorsList from "./ContributorsManagement/ContributorsList";
import ProjectInfo from "./ProjectInfo";
import { 
  GenerateLanguageProps,
  GetContributorsProps,
  GetOwnerUserProps,
  GetSupportersProps,
} from "@/types/InfosPanel";
import LikeList from "./LikeManagement/LikeList";
import AddLike from "./LikeManagement/AddLike";
import DeleteLike from "./LikeManagement/DeleteLike";

type InfosPanelProps = {
  project: Project | null;
  setOpenFiles: React.Dispatch<React.SetStateAction<EditorFile[]>>;
  setCode: React.Dispatch<React.SetStateAction<string>>;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  setProject: React.Dispatch<React.SetStateAction<Project | null>>;
  setData: React.Dispatch<React.SetStateAction<File[]>>;
  data: File[];
};

const InfosPanel = ({ project, setOpenFiles, setCode, setFile, setProject, setData, data }: InfosPanelProps) => {
  
  const [maxAvatar, setMaxAvatar] = useState<number>(9);
  const [owner, setOwner] = useState<GetOwnerUserProps | null | undefined>(null);
  const [contributors, setContributors] = useState<GetContributorsProps[] | null>(null);
  const [supporters, setSupporters] = useState<GetSupportersProps[]>([]);
  const [meLike, setMeLike] = useState<boolean>(false);
  const [meInfoUser, setMeInfoUser] = useState<GetSupportersProps | null>(null)

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

  useEffect(() => {
    const getCookieIdUser = Cookies.get("id");
    const getCookiePseudoUser = Cookies.get("pseudo");
    if (supporters) {
      const checkLike = supporters.filter(user => user.id == getCookieIdUser);
      if (checkLike.length !== 0)
        setMeLike(true);
      else
        setMeLike(false);  
    }
  }, [supporters])

  useEffect(() => {
    const getCookieIdUser = Cookies.get("id");
    const getCookiePseudoUser = Cookies.get("pseudo");
    if (!getCookieIdUser || !getCookiePseudoUser)
      setMeInfoUser(null);
    else
      setMeInfoUser({
        id: getCookieIdUser,
        pseudo: getCookiePseudoUser,
      })   
  }, [])

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
          {
            project ?
              meLike ?
                <DeleteLike setSupporters={setSupporters} supporters={supporters} meInfoUser={meInfoUser} project={project}/>
              :
                <AddLike setSupporters={setSupporters} supporters={supporters} meInfoUser={meInfoUser} project={project} />
            :
            null
          }
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
              <ProjectInfo project={project} owner={owner} /> 
              <Divider orientation="horizontal" />
              <ContributorsList contributors={contributors} />
              <Divider orientation="horizontal" />
              <LikeList supporters={supporters} maxAvatar={maxAvatar} setMaxAvatar={setMaxAvatar} />
            </Flex>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Flex>
  );
};

export default InfosPanel;
