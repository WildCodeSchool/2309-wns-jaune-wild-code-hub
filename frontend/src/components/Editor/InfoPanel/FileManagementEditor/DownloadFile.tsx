import React from "react";
import CustomToast from '@/components/ToastCustom/CustomToast';
import { Project, File } from '@/types/graphql';
import { DownloadIcon } from "@chakra-ui/icons";
import { IconButton, Tooltip } from "@chakra-ui/react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import DOMPurify from 'dompurify';

interface DownloadFileProps {
  data: File[];
  project: Project | null;
}

const DownloadFile: React.FC<DownloadFileProps> = ({ 
  data,
  project
}: DownloadFileProps) => {
  
  const { showAlert } = CustomToast();

  const sanitizeContent = (content: string): string => {
    try {
      return DOMPurify.sanitize(content);
    } catch (error) {
      showAlert("error", "Download stop, check your code!");
      throw new Error("Sanitization failed");
    }
  };

  const handleClick: () => void = async (): Promise<any> => {
    if (!project) {
      return showAlert("error", "Please wait while the project loads!");
    }

    const zip = new JSZip();

    try {
      data.forEach((file) => {
        const sanitizedContent = sanitizeContent(file.content);
        const sanitizedFileName = sanitizeContent(`${file.name}.${file.extension}`);
        zip.file(sanitizedFileName, sanitizedContent);
      });

      const content = await zip.generateAsync({ type: "blob" });
      const sanitizedProjectName = sanitizeContent(project.name);
      saveAs(content, `${sanitizedProjectName}.zip`);

      showAlert("success", "Download in progress...");
    } catch (error) {
      console.error("Error processing files:", error);
      showAlert("error", "Failed to download the project files. Please try again.");
    }
  };

  return (
    <Tooltip label={"Download the project files"} bgColor={"grey"} color={"text"}>
      <IconButton
        size={"xs"}
        aria-label="Download the project files"
        variant={"ghost"}
        icon={<DownloadIcon boxSize={5} />}
        onClick={handleClick}
      />
    </Tooltip>
  );
};

export default DownloadFile;