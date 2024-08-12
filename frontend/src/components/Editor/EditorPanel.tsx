import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React, { Dispatch, useEffect, useRef } from "react";
import UpdateListFilesEditor from "./InfoPanel/FileManagementEditor/UpdateListFilesEditor";
import FileEditor from "./FileEditor";
import FileInfo from "./FileInfo";
import { FindAllInfoUserAccessesProject, Project, File } from "@/types/graphql";

type EditorProps = {
  setData: Dispatch<React.SetStateAction<File[]>>;
  setOpenFiles: React.Dispatch<React.SetStateAction<File[]>>;
  openFiles: File[];
  data: File[];
  project: Project | null;
  expectedOrigin?: string;
  listUserAuthorisationSave: FindAllInfoUserAccessesProject[] | null;
  code: string;
  file: File | null;
  setCode: React.Dispatch<React.SetStateAction<string>>;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  setProject: React.Dispatch<React.SetStateAction<Project | null>>;
};

const EditorPanel = ({
  setData,
  setOpenFiles,
  openFiles,
  data,
  project,
  expectedOrigin,
  listUserAuthorisationSave,
  setCode,
  code,
  setFile,
  file,
  setProject
}: EditorProps) => {

  const fileBarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (file) {
      setCode(file.content);
      setOpenFiles((prevOpenFiles) => {
        if (!prevOpenFiles.find((f) => f.id === file.id)) {
          return [...prevOpenFiles, file];
        }
        return prevOpenFiles;
      });
    }
  }, [file, setOpenFiles, setFile, setCode]);

  const handleCodeChange: (newCode: string) => void = (newCode: string): void => {
    setData((prevFiles) =>
      prevFiles.map((f) =>
        f.id === file?.id ? { ...f, content: newCode } : f
      )
    );
  
    setProject((prevProject) => {
      if (prevProject) {
        const updatedFiles = prevProject.files.map((f) =>
          f.id === file?.id ? { ...f, content: newCode } : f
        );
        return { ...prevProject, files: updatedFiles };
      }
      return prevProject;
    });
  
    setCode(newCode);

    setFile((prevFile) => {
      if (prevFile && prevFile.id === file?.id) {
        console.log('Updating file content:', newCode);
        return { ...prevFile, content: newCode };
      }
      return prevFile;
    });
  };
  
  const handleFileClose: (fileId: number) => void = (fileId: number): void => {
    setData((prevFiles) => {
      const updatedFiles = prevFiles.map((f) => 
        +f.id === fileId ? { ...f, content:code } : f
      );
      return updatedFiles;
    });

    setProject((prevProject) => {
      if (prevProject) {
        const updatedFiles = prevProject.files.map((f) => 
          +f.id === fileId  ? { ...f, content:code } : f
        );
        return { ...prevProject, files: updatedFiles };
      }
      return prevProject;
    });

    setOpenFiles((prevOpenFiles) => {
      const newOpenFiles = prevOpenFiles.filter((f) => +f.id !== fileId);
      if (newOpenFiles.length === 0) {
        setFile(null);
        setCode("");
      } else if (Number(file?.id) === fileId) {
        setFile(newOpenFiles[newOpenFiles.length - 1]);
        setCode(newOpenFiles[newOpenFiles.length - 1].content);
      }
      return newOpenFiles;
    });
  };

  const handleScroll: (event: React.WheelEvent<HTMLDivElement>) => void = (event: React.WheelEvent<HTMLDivElement>) => {
    const { deltaY } = event;
    if (fileBarRef.current) {
      fileBarRef.current.scrollLeft += deltaY;
    }
  };

  const toto = (openFile : any) => {
    console.log("cdl,dd,d,d")
    setData((prevFiles) => {
      const updatedFiles = prevFiles.map((f) => 
        f.id === file?.id ? { ...f, content:code } : f
      );
      return updatedFiles;
    });

    setProject((prevProject) => {
      if (prevProject) {
        const updatedFiles = prevProject.files.map((f) => 
          f.id === file?.id ? { ...f, content:code } : f
        );
        return { ...prevProject, files: updatedFiles };
      }
      return prevProject;
    });

    setOpenFiles((prevOpenFiles) => {
      return prevOpenFiles.map((f) =>
        f.id === file?.id ? { ...f, content: code } : f
      );
    });

    setFile(openFile);

  }
  
  return (
    <>
      <Flex
        height={"2.5rem"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Flex
          ref={fileBarRef}
          height={"100%"}
          overflowX={"auto"}
          overflowY={"hidden"}
          width={"100%"}
          sx={{
            scrollbarColor: "#8A98A4 #363636",
            scrollbarWidth: "thin",
          }}
          onWheel={handleScroll}
        >
          {openFiles &&
            openFiles.map((openFile) => (
              <FileInfo
                key={openFile.id}
                fileName={`${openFile.name}.${openFile.extension}`}
                onClose={() => handleFileClose(+openFile.id)}
                isSelected={openFile.id === file?.id}
                onClick={() => toto(openFile)}
              />
            ))}
        </Flex>

        <UpdateListFilesEditor
          data={data}
          project={project}
          expectedOrigin={expectedOrigin}
          listUserAuthorisationSave={listUserAuthorisationSave}
        />
      </Flex>
      <Flex height={"100%"}>
        {file ? (
          <FileEditor
            code={code}
            setCode={handleCodeChange}
            file={file}
            setData={setData}
            language={file.language}
          />
        ) : (
          <Box p={4} width="100%" bg="background2">
            <Text color="white" textAlign="center">
              Select a file to edit its content.
            </Text>
          </Box>
        )}
      </Flex>
    </>
  );
};

export default EditorPanel;
