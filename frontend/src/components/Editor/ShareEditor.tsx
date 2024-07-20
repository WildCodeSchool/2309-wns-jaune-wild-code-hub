import React, { useState, useEffect } from "react";
import { Project } from "@/types/graphql";
import GenericModal from "@/components/GenericModal";
import { 
  Button,
  Text,
  Input,
  Box,
} from "@chakra-ui/react";
import CustomToast from '@/components/ToastCustom/CustomToast';

interface ShareEditorProps {
  project: Project | null;
  expectedOrigin: string | undefined;
}

const ShareEditor: React.FC<ShareEditorProps> = ({ project, expectedOrigin }) => {
  const { showAlert } = CustomToast();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");

  const shareModalOpen: () => void = async () => {
    if (window.location.origin !== expectedOrigin) return;
    if (!project) {
      showAlert("error", "Please wait while the project loads!");
      return;
    }

    setIsShareModalOpen(true);
  };

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
    <>
      <Button type="button" variant="secondary" onClick={shareModalOpen}>
        Share
      </Button>

      <GenericModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        title="Share project"
      >
        <Box>
          <Text color="white">Link</Text>
          <Input value={currentUrl} isReadOnly placeholder="url" />
          <Box display="flex" justifyContent="center" mt={10}>
            <Button type="button" variant="secondary" onClick={copyToClipboard}>
              Copy
            </Button>
          </Box>
        </Box>
      </GenericModal>
    </>
  );
};

export default ShareEditor;