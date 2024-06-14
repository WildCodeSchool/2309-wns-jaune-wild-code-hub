import React from "react";
import { CloseIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/react";

interface FileInfoProps {
  fileName: string;
  onClose: () => void;
  isSelected: boolean;
  onClick: () => void;
}

const FileInfo: React.FC<FileInfoProps> = ({ fileName, onClose, isSelected, onClick }) => {
  const handleCloseClick = (event: React.MouseEvent) => {
    event.stopPropagation();
      onClose();
  };

  return (
    <Box
        bg={isSelected ? "grey" : "background2"}
        color={isSelected ? "white" : "grey"}
        p="1px"
        style={{
        display: "flex",
        alignItems: "center",
        marginRight: "1px",
        cursor: "pointer",
        }}
        onClick={onClick}
    >
      <p style={{ marginLeft:"3px", marginRight: "5px" }}>{fileName}</p>
      <CloseIcon ml="10px" mr="10px" cursor="pointer" onClick={handleCloseClick} />
    </Box>
  );
};

export default FileInfo;