import React from "react";
import { CloseIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/react";

interface FileInfoProps {
  fileName: string;
  onClose: () => void;
  isSelected: boolean;
  onClick: () => void;
}

const FileInfo: React.FC<FileInfoProps> = ({
  fileName,
  onClose,
  isSelected,
  onClick,
}) => {

  const handleCloseClick: (event: React.MouseEvent) => void = (event: React.MouseEvent) => {
    event.stopPropagation();
    onClose();
  };

  return (
    <Box
      display="flex"
      bg={isSelected ? "grey" : "background2"}
      color={isSelected ? "white" : "grey"}
      alignItems="center"
      cursor="pointer"
      onClick={onClick}
      height={"100%"}
      justifyContent={"space-between"}
      paddingInline={2}
      gap={2}
    >
      {fileName}
      <CloseIcon width="10px" cursor="pointer" onClick={handleCloseClick} />
    </Box>
  );
};

export default FileInfo;
