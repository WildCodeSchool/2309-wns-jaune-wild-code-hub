import React, { useState } from "react";
import { 
CreateProjectMutation,
CreateProjectMutationVariables,
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
CREATE_PROJECT,
} from "@/requetes/mutations/project.mutations";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import GenericModal from "@/components/GenericModal";


const CreateProject: React.FC = () => {

  const router = useRouter();

  const { showAlert } = CustomToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nameProject, setNameProject] = useState<string>("");
  const [privateProject, setPrivateProject] = useState<boolean>(false);

  const [createProject] = useMutation<
    CreateProjectMutation,
    CreateProjectMutationVariables
    >(CREATE_PROJECT, {
    onCompleted: (data) => {
        setIsModalOpen(false);
        showAlert("success", "Creation of a successful project!");
        router.push(`/editor/${data?.createProject?.id}`);
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
    if (!nameProject) {
      return showAlert("error", "Please complete all fields in the form!");
    }
    
    createProject({
      variables: {
        data: {
            "name": nameProject,
            "category": "JavaScript",
            "private": privateProject
        }
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
    <>
      <Button variant={"secondary"} onClick={openModal}>Create a project</Button>
      <GenericModal isOpen={isModalOpen} onClose={closeModal} title="Create project">
        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
          <Box width="100%" maxWidth="250px" textAlign="center">
            <Box>
                <Text color="white">
                    Sign up now to embark on a journey of unlimited possibilities in the world of coding
                </Text>
            </Box>
            <Box mt={5}>
                <Text color="white" mb={2}>Enter Name of the project</Text>
                <Input
                    value={nameProject}
                    onChange={(e) => setNameProject(e.target.value)}
                    placeholder="name"
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
            <ButtonGroup spacing={5} mt={5} display="flex" justifyContent="center">
              <Button  type="button" variant="outline" onClick={closeModal}>
                Cancel
              </Button>
              <Button type="button" variant="secondary" onClick={handleClick}>
                {"Let's start !"}
              </Button>
            </ButtonGroup>
          </Box>
        </Box>
      </GenericModal>
    </>
  );
};

export default CreateProject;