import { File } from "@/types/graphql";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Button, Flex, IconButton, Tooltip } from "@chakra-ui/react";
import CSSIcon from "./Icons/CSSIcon";
import DefaultFileIcon from "./Icons/DefaultFile";
import HTMLIcon from "./Icons/HTMLIcon";
import JSIcon from "./Icons/JSIcon";

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
      <Flex alignItems={"center"}>
        <Tooltip label={"Rename file"} bgColor={"grey"} color={"text"}>
          <IconButton
            size={"xs"}
            aria-label="rename file"
            variant={"ghost"}
            icon={<EditIcon boxSize={3}></EditIcon>}
          />
        </Tooltip>
        <Tooltip label={"Delete file"} bgColor={"grey"} color={"text"}>
          <IconButton
            size={"xs"}
            aria-label="delete file"
            variant={"ghost"}
            icon={<DeleteIcon boxSize={3}></DeleteIcon>}
          />
        </Tooltip>
      </Flex>
    </Flex>
  );
};

export default FileItemList;
