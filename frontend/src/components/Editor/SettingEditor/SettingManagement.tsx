import React, { useState, useEffect } from "react";
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
Input 
} from "@chakra-ui/react";
import CustomToast from '@/components/ToastCustom/CustomToast';
import ReactSelect, { StylesConfig, SingleValue } from 'react-select';
import { LIST_USERS_BY_PSEUDO } from "@/requetes/queries/user.queries";
import { 
UPDATE_PROJECT
} from "@/requetes/mutations/project.mutations";
import { 
  AddAccessProjectMutation,
  AddAccessProjectMutationVariables
} from "@/types/graphql";
import { useLazyQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";

interface SettingManagementProps {
    project: Project | null;
    setProject: React.Dispatch<React.SetStateAction<Project | null>>;
    setIsSettingsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SettingManagement: React.FC<SettingManagementProps> = ({ project, setProject, setIsSettingsModalOpen }) => {

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
                "success",
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

  const handleClick = () => {
    if (!nameProject || !project || !router.query.id || typeof +router.query.id !== "number") {
      return showAlert("error", "Please complete all fields in the form!");
    }

    console.log(project)
    
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
      <Box width="250px"  borderRadius="md" boxShadow="lg">
        <Box mt={2}>
          <Text color="white" mb={2}>Name of the project</Text>
          <Input
            value={nameProject}
            onChange={(e) => setNameProject(e.target.value)}
            placeholder="Enter project name"
            size="sm"
            mb={3}
          />
        </Box>

        <Box mt={2}>
          <Text color="white" mb={2}>Visibility</Text>
          <Select
            size="sm"
            value={privateProject ? "private" : "public"}
            onChange={(e) => setPrivateProject(e.target.value === "private")}
            mb={3}
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </Select>
        </Box>

        <Box display="flex" justifyContent="center" mt={10}>
          <Button type="button" variant="secondary" onClick={handleClick}>
              Save Change
          </Button>
        </Box>
        <Box display="flex" justifyContent="center" mt={3}>
          <Button type="button" variant="outline">
              Delete Project
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SettingManagement;