import { File, Project } from "@/types/graphql";
import {  Button, Flex } from "@chakra-ui/react";
import CSSIcon from "../../../../Icons/CSSIcon";
import DefaultFileIcon from "../../../../Icons/DefaultFile";
import HTMLIcon from "../../../../Icons/HTMLIcon";
import JSIcon from "../../../../Icons/JSIcon";
import { GenerateLanguageProps } from "@/types/InfosPanel";
import DeleteFile from "./DeleteFile";
import UpdateFile from "./UpdateFile";

type Props = {
  file: File;
  handleOpenFiles: (fileId: number) => void;
  project: Project;
  setProject: React.Dispatch<React.SetStateAction<Project | null>>;
  setData: React.Dispatch<React.SetStateAction<File[]>>;
  setOpenFiles: React.Dispatch<React.SetStateAction<File[]>>;
  setCode: React.Dispatch<React.SetStateAction<string>>;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  generateLanguage : (name : string, extention : string) => GenerateLanguageProps;
  authorizeProject: boolean;
};

const FileItemList = ({
  file,
  handleOpenFiles,
  project,
  setProject,
  setData,
  setOpenFiles,
  setCode,
  setFile,
  generateLanguage,
  authorizeProject
}: Props) => {

  return (
    <Flex justifyContent={"space-between"} width={"100%"}>
      <Button
        onClick={() => handleOpenFiles(+file.id)}
        variant={"ghost"}
        leftIcon={
          file.extension === "js" ? (
            <JSIcon boxSize={3} />
          ) : file.extension === "css" ? (
            <CSSIcon boxSize={3} />
          ) : file.extension === "html" ? (
            <HTMLIcon boxSize={3} />
          ) : (
            <DefaultFileIcon boxSize={3} />
          )
        }
      >
        {file.name}
      </Button>
      <Flex alignItems={"center"}>
        {
          authorizeProject &&
          <>
            <UpdateFile
              file={file}
              setProject={setProject}
              setData={setData}
              setOpenFiles={setOpenFiles}
              setCode={setCode}
              setFile={setFile}
              generateLanguage={generateLanguage}
            /> 
            <DeleteFile
              file={file}
              project={project}
              setProject={setProject}
              setData={setData}
              setOpenFiles={setOpenFiles}
              setCode={setCode}
              setFile={setFile}
              generateLanguage={generateLanguage}
            />
          </>
        }
      </Flex>
    </Flex>
  );
};

export default FileItemList;