import React, { useState } from "react";
import { 
UpdateProjectMutation,
UpdateProjectMutationVariables,
DeleteProjectMutation,
DeleteProjectMutationVariables,
Project,
} from "@/types/graphql";
import { 
Button,
Text,
Box,
Select,
Input,
ButtonGroup
} from "@chakra-ui/react";
import CustomToast from '@/components/ToastCustom/CustomToast';
import { 
UPDATE_PROJECT,
DELETE_PROJECT,
} from "@/requetes/mutations/project.mutations";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import GenericModal from "@/components/GenericModal";

interface SettingManagementProps {
  project: Project | null;
  setProject: React.Dispatch<React.SetStateAction<Project | null>>;
  setIsSettingsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SettingManagement: React.FC<SettingManagementProps> = ({ project, setProject, setIsSettingsModalOpen }) => {

  const router = useRouter();

  const { showAlert } = CustomToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
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

    const [deleteProject] = useMutation<
    DeleteProjectMutation,
    DeleteProjectMutationVariables
    >(DELETE_PROJECT, {
    onCompleted: (data) => {
        if (data?.deleteProject?.success) {
            
            showAlert("success", data?.deleteProject?.message);
            setIsSettingsModalOpen(false);
            router.push('/me')
        } else {
            showAlert(
                "error",
                data?.deleteProject?.message ? 
                data?.deleteProject?.message
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

  const handleClickUpdate = () => {
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

  const handleClickDelete = () => {
    if (!nameProject || !project || !router.query.id || typeof +router.query.id !== "number") {
      return showAlert("error", "Please complete all fields in the form!");
    }

    deleteProject({
      variables: {
          deleteProjectId : +project?.id
      },
    });
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
        <Box display="flex" justifyContent="center" mt={3}>
          <Button type="button" variant="outline" onClick={openModal}>
              Delete Project
          </Button>
        </Box>
      </Box>
      <GenericModal isOpen={isModalOpen} onClose={closeModal} title="Deleting  project">
        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
          <Box width="100%" maxWidth="250px" textAlign="center">
            <Text color="white" mb={8}>
              Deleting your Project will wipe all your info and data from Wild Code Hub. This action is irreversible.
            </Text>
            <Text color="white" mt={2}>
              Are you sure you want to delete your Project ?
            </Text>
            <ButtonGroup spacing={5} mt={4} display="flex" justifyContent="center">
              <Button  type="button" variant="outline" onClick={closeModal}>
                Cancel
              </Button>
              <Button type="button" variant="primary" onClick={handleClickDelete}>
                {"Yes, l'm sure"}
              </Button>
            </ButtonGroup>
          </Box>
        </Box>
      </GenericModal>
    </Box>
  );
};

export default SettingManagement;