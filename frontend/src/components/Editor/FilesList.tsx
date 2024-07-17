import React from "react";

interface File {
  id: number;
  name: string;
  extension: string;
  content: string;
  language: string;
}

interface FilesListProps {
  data: File[];
  setFile: (file: File) => void;
}

const FilesList: React.FC<FilesListProps> = ({ data, setFile }) => {
  const handleClick = (file: File) => {
    setFile(file);
  };

  return (
    <ul>
      {data?.map((file) => (
        <li key={file.id} onClick={() => handleClick(file)}>
          {file?.name}.{file?.extension}
        </li>
      ))}
    </ul>
  );
};

export default FilesList;