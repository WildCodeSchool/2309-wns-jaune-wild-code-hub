import React, { useState } from "react";
import { FindAllInfoUserAccessesProject, Project } from "@/types/graphql";
import GenericModal from "@/components/GenericModal";
import CustomToast from "@/components/ToastCustom/CustomToast";
import { SettingsIcon } from "@chakra-ui/icons";
import SettingManagement from "./SettingManagement";
import SettingInfo from "./SettingInfo";

interface SettingEditorProps {
  project: Project | null;
  expectedOrigin: string | undefined;
  setProject: React.Dispatch<React.SetStateAction<Project | null>>;
  checkOwner: boolean;
  users: FindAllInfoUserAccessesProject[] | null;
}

const SettingEditor: React.FC<SettingEditorProps> = ({
  project,
  expectedOrigin,
  setProject,
  checkOwner,
  users,
}) => {
  
  const { showAlert } = CustomToast();
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  const settingProject: () => void = async ()=> {
    if (window.location.origin !== expectedOrigin) return;
    if (!project) {
      showAlert("error", "Please wait while the project loads!");
      return;
    }
    setIsSettingsModalOpen(true);
  };

  return (
    <>
      <SettingsIcon boxSize={6} cursor="pointer" onClick={settingProject} />

      <GenericModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        title={checkOwner ? "Manage your project" : "Project information"}
      >
        {checkOwner ? (
          <SettingManagement
            project={project}
            setProject={setProject}
            setIsSettingsModalOpen={setIsSettingsModalOpen}
          />
        ) : (
          <SettingInfo users={users} project={project} />
        )}
      </GenericModal>
    </>
  );
};

export default SettingEditor;
