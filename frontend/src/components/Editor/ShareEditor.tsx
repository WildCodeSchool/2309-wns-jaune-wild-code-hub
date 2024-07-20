import React, { useState } from "react";
import { Project } from "@/types/graphql";
import GenericModal from "@/components/GenericModal";
import { Button, Text } from "@chakra-ui/react";
import CustomToast from '@/components/ToastCustom/CustomToast';

interface ShareEditorProps {
  project: Project | null;
  expectedOrigin : string | undefined;
}

const ShareEditor: React.FC<ShareEditorProps> = ({ project, expectedOrigin }) => {

    const { showAlert } = CustomToast();
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    
    const shareModalOpen: () => void = async () => {
      if (window.location.origin !== expectedOrigin) return;
      if(!project) {
        showAlert("error", "Please wait while the project loads!");
        return;
      }
      setIsShareModalOpen(true);
  };

    return (
        <>
          <Button type="button" variant="secondary" onClick={shareModalOpen}>
              Share
          </Button>

          <GenericModal
                isOpen={isShareModalOpen}
                onClose={() => setIsShareModalOpen(false)}
            >
                <Text color="white">Text</Text>

            </GenericModal>
        </>
    );
};

export default ShareEditor;