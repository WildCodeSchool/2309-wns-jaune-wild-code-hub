import React, { useState, useEffect } from "react";
import { Project } from "@/types/graphql";
import { 
  Button,
  Text,
  Input,
  Box,
} from "@chakra-ui/react";
import CustomToast from '@/components/ToastCustom/CustomToast';

interface ShareURLProps {
  project: Project | null;
}

const ShareURL: React.FC<ShareURLProps> = ({ project }) => {

  const { showAlert } = CustomToast();
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    if (project) {
      const url = `${window.location.origin}${window.location.pathname}`;
      setCurrentUrl(url);
    }
  }, [project]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentUrl)
      .then(() => {
        showAlert("success", "URL copied to clipboard!");
      })
      .catch(err => {
        showAlert("error", "Failed to copy URL!");
      });
  };

  return (
    <Box>
        <Text color="white" mb={2}>Link</Text>
        <Input value={currentUrl} isReadOnly placeholder="url" />
        <Box display="flex" justifyContent="center" mt={10}>
            <Button type="button" variant="secondary" onClick={copyToClipboard}>
            Copy
            </Button>
        </Box>
    </Box>
  );
};

export default ShareURL;