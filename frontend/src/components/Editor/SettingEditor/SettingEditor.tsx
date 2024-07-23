import React, { useState } from "react";
import { Project } from "@/types/graphql";
import GenericModal from "@/components/GenericModal";
import CustomToast from '@/components/ToastCustom/CustomToast';
import { SettingsIcon } from "@chakra-ui/icons";
import SettingManagement from "./SettingManagement";

interface SettingEditorProps {
  project: Project | null;
  expectedOrigin : string | undefined;
  setProject: React.Dispatch<React.SetStateAction<Project | null>>;
}

const SettingEditor: React.FC<SettingEditorProps> = ({ project, expectedOrigin, setProject }) => {

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
                title="Manage your project"
            >
                <SettingManagement project={project} setProject={setProject} setIsSettingsModalOpen={setIsSettingsModalOpen}/>
            </GenericModal>
        </>
    );
};

export default SettingEditor;