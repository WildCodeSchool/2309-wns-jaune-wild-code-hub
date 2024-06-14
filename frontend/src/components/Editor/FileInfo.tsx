import React from "react";
import { CloseIcon } from "@chakra-ui/icons";

interface FileInfoProps {
  fileName: string;
  onClose: () => void;
  isSelected: boolean;
  onClick: () => void;
}

const FileInfo: React.FC<FileInfoProps> = ({ fileName, onClose, isSelected, onClick }) => {
  const handleCloseClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent triggering the onClick event of the FileInfo div

    // if (window.confirm(`Are you sure you want to close ${fileName}?`)) {
      onClose();
    // }
  };

  return (
    <div
      style={{
        backgroundColor: isSelected ? "#1a202c" : "#2D3649",
        color: "#ffffff",
        padding: "1px",
        display: "flex",
        alignItems: "center",
        marginRight: "1px",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <p style={{ marginLeft:"3px", marginRight: "5px" }}>{fileName}</p>
      <CloseIcon style={{ marginLeft: "15px", height: "13px"}} cursor="pointer" onClick={handleCloseClick} />
    </div>
  );
};

export default FileInfo;