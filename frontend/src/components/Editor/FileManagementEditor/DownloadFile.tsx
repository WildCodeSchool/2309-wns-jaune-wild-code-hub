import React from "react";
import CustomToast from '@/components/ToastCustom/CustomToast';
import { Project, File } from '@/types/graphql';
import { DownloadIcon } from "@chakra-ui/icons";
import { IconButton, Tooltip } from "@chakra-ui/react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import DOMPurify from 'dompurify'; // Library to sanitize HTML

interface DownloadFileProps {
  data: File[];
  project: Project | null;
}

const DownloadFile: React.FC<DownloadFileProps> = ({ data, project }: DownloadFileProps) => {
  const { showAlert } = CustomToast();

  const sanitizeContent = (content: string) => {
    return DOMPurify.sanitize(content);
  };

  const handleCkick: () => void = (): void => {
    if (!project) {
      return showAlert("error", "Please wait while the project loads!");
    }

    const zip = new JSZip();

    data.forEach((file) => {
      const sanitizedContent = sanitizeContent(file.content);
      const sanitizedFileName = DOMPurify.sanitize(`${file.name}.${file.extension}`);
      zip.file(sanitizedFileName, sanitizedContent);
    });

    zip.generateAsync({ type: "blob" }).then((content) => {
      const sanitizedProjectName = DOMPurify.sanitize(project.name);
      saveAs(content, `${sanitizedProjectName}.zip`);
    });

    showAlert("success", "Download in progress...");
  };

  return (
    <Tooltip label={"Download the project files"} bgColor={"grey"} color={"text"}>
      <IconButton
        size={"xs"}
        aria-label="Download the project files"
        variant={"ghost"}
        icon={<DownloadIcon boxSize={3} />}
        onClick={handleCkick}
      />
    </Tooltip>
  );
};

export default DownloadFile;