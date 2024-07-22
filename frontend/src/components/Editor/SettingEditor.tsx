import React, { useState } from "react";
import { Project } from "@/types/graphql";
import GenericModal from "@/components/GenericModal";
import { Button, Text, Input } from "@chakra-ui/react";
import CustomToast from '@/components/ToastCustom/CustomToast';
import { SettingsIcon } from "@chakra-ui/icons";

interface SettingEditorProps {
  project: Project | null;
  expectedOrigin : string | undefined;
}

const SettingEditor: React.FC<SettingEditorProps> = ({ project, expectedOrigin }) => {

    const { showAlert } = CustomToast();
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
    
    const settingProject: () => void = async () => {
        if (window.location.origin !== expectedOrigin) return;
        if(!project) {
            showAlert("error", "Please wait while the project loads!");
            return;
        }
        setIsSettingsModalOpen(true);
    };

    return (
        <>
          <SettingsIcon boxSize={9} cursor="pointer" onClick={settingProject} />

          <GenericModal
                isOpen={isSettingsModalOpen}
                onClose={() => setIsSettingsModalOpen(false)}
            >
                <Text color="white">Settings</Text>
            </GenericModal>
        </>
    );
};

export default SettingEditor;