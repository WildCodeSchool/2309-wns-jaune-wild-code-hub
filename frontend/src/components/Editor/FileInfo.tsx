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
  
  {/* V1 close file */}
  const handleCloseClick = (event: React.MouseEvent) => {
    event.stopPropagation();
      onClose();
  };

  return (
    <Box
        bg={isSelected ? "grey" : "background2"}
        color={isSelected ? "white" : "grey"}
        p="1px"
        cursor="pointer"
        mr="1px"
        style={{
          display: "flex",
          alignItems: "center",
        }}
        onClick={onClick}
    >
      <p style={{ marginLeft:"3px", marginRight: "5px" }}>{fileName}</p>
      {/* V1 close file */}
      {/* <CloseIcon 
        ml="9px"
        mr="9px"
        width="10px"
        mt="3px"
        cursor="pointer"
        onClick={handleCloseClick}
        /> */}
    </Box>
  );
};

export default FileInfo;