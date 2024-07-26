import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React, { Dispatch, useEffect, useRef, useState } from "react";
import UpdateListFilesEditor from "./UpdateListFilesEditor";
import FileEditor from "./FileEditor";
import FileInfo from "./FileInfo";
import { FindAllInfoUserAccessesProject, Project } from "@/types/graphql";
import { File } from "@/types/editor";

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
  file
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
  }, [file, setOpenFiles]);

  const handleCodeChange = (newCode: string): void => {
    setCode(newCode);
    setData((prevData) =>
      prevData.map((f) => (f.id === file?.id ? { ...f, content: newCode } : f))
    );
  };

  const handleFileClose = (fileId: number): void => {
    console.log("fileId", fileId);
    setOpenFiles((prevOpenFiles) => {
      const newOpenFiles = prevOpenFiles.filter((f) => +f.id !== fileId);
      console.log("newOpenFiles", newOpenFiles);
      if (newOpenFiles.length === 0) {
        setFile(null);
        setCode("");
      } else if (Number(file?.id) === fileId) {
        setFile(newOpenFiles[0]);
        setCode(newOpenFiles[0].content);
      }
      return newOpenFiles;
    });
  };
  console.log("openFiles", openFiles);
  const handleScroll = (event: React.WheelEvent<HTMLDivElement>) => {
    const { deltaY } = event;
    if (fileBarRef.current) {
      fileBarRef.current.scrollLeft += deltaY;
    }
  };
  
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
                onClick={() => setFile(openFile)}
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
