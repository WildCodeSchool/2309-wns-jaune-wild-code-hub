import React, { useState } from "react";
import { 
UpdateProjectMutation,
UpdateProjectMutationVariables,
Project,
} from "@/types/graphql";
import { 
Button,
Text,
Box,
Select,
Input,
} from "@chakra-ui/react";
import CustomToast from '@/components/ToastCustom/CustomToast';
import { 
UPDATE_PROJECT,
} from "@/requetes/mutations/project.mutations";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import SettingDeleteProject from "./SettingDeleteProject";

interface SettingManagementProps {
  project: Project | null;
  setProject: React.Dispatch<React.SetStateAction<Project | null>>;
  setIsSettingsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SettingManagement: React.FC<SettingManagementProps> = ({
  project,
  setProject,
  setIsSettingsModalOpen
}) => {

  const router = useRouter();

  const { showAlert } = CustomToast();

  const [nameProject, setNameProject] = useState<string>(project?.name ? project?.name : "");
  const [privateProject, setPrivateProject] = useState<boolean>(project?.private ? true : false);

  const [updateProject] = useMutation<
    UpdateProjectMutation,
    UpdateProjectMutationVariables
    >(UPDATE_PROJECT, {
    onCompleted: (data) => {
      if (data?.updateProject?.success) {
        setProject((prevProject) => {
          if (prevProject) {
              return { ...prevProject, name: nameProject, private: privateProject };
          }
          return prevProject;
        });
        
        showAlert("success", data?.updateProject?.message);
        setIsSettingsModalOpen(false);
      } else {
        showAlert(
          "error",
          data?.updateProject?.message ? 
          data?.updateProject?.message
        :
          "We are sorry, there seems to be an error with the server. Please try again later."
        );
      }
    },
    onError(error) {
      showAlert(
      'error',
      error.message ?
        error.message
      :
        "We are sorry, there seems to be an error with the server. Please try again later."
      );
    }
    });

  const handleClickUpdate: () => void = () => {
    if (!nameProject || !project || !router.query.id || typeof +router.query.id !== "number") {
      return showAlert("error", "Please complete all fields in the form!");
    }
    
    updateProject({
      variables: {
        data: {
          id : project.id,
          name : nameProject,
          private : privateProject
        }
      },
    });
  };

  return (
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
    >
      <Box width="250px" borderRadius="md" boxShadow="lg">
        <Box mt={2}>
          <Text color="white" mb={2}>Name of the project</Text>
          <Input
            value={nameProject}
            onChange={(e) => setNameProject(e.target.value)}
            placeholder="Enter project name"
            size="sm"
            mb={3}
            bg="white"
            color="black"
            borderRadius={5}
          />
        </Box>

        <Box mt={2}>
          <Text color="white" mb={2}>Visibility</Text>
          <Select
            size="sm"
            value={privateProject ? "private" : "public"}
            onChange={(e) => setPrivateProject(e.target.value === "private")}
            mb={3}
            bg="white"
            color="black"
            borderRadius={5}
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </Select>
        </Box>

        <Box display="flex" justifyContent="center" mt={10}>
          <Button type="button" variant="secondary" onClick={handleClickUpdate}>
              Save Change
          </Button>
        </Box>
        <SettingDeleteProject project={project} setIsSettingsModalOpen={setIsSettingsModalOpen}  />
      </Box>
    </Box>
  );
};

export default SettingManagement;