import { File } from "@/types/graphql";
import { File as EditorFile } from "@/types/editor";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, IconButton } from "@chakra-ui/react";
import React from "react";
import JSIcon from "./Icons/JSIcon";
import CSSIcon from "./Icons/CSSIcon";
import HTMLIcon from "./Icons/HTMLIcon";
import DefaultFileIcon from "./Icons/DefaultFile";

type Props = {
  file: File;
  openFiles: (fileId: number) => void;
};

const FileItemList = ({ file, openFiles }: Props) => {
  const handleRename = () => {};

  return (
    <Flex justifyContent={"space-between"} width={"100%"}>
      <Button
        onDoubleClick={handleRename}
        onClick={() => openFiles(+file.id)}
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
      <Box>
        <IconButton
          size={"xs"}
          aria-label="rename file"
          variant={"ghost"}
          icon={<EditIcon boxSize={3}></EditIcon>}
        ></IconButton>
        <IconButton
          size={"xs"}
          aria-label="delete file"
          variant={"ghost"}
          icon={<DeleteIcon boxSize={3}></DeleteIcon>}
        ></IconButton>
      </Box>
    </Flex>
  );
};

export default FileItemList;
