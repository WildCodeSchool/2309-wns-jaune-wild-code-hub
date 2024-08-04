import React, { useState } from "react";
import { 
DeleteProjectMutation,
DeleteProjectMutationVariables,
Project,
} from "@/types/graphql";
import { 
Button,
Text,
Box,

ButtonGroup,
IconButton,
Tooltip
} from "@chakra-ui/react";
import CustomToast from '@/components/ToastCustom/CustomToast';
import { 
DELETE_PROJECT,
} from "@/requetes/mutations/project.mutations";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import GenericModal from "@/components/GenericModal";
import { DeleteIcon } from "@chakra-ui/icons";

interface SettingDeleteProjectProps {
  project: Project | null | Pick<Project, "id" | "category" | "name">;
  setIsSettingsModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  admin?: boolean;  
}

const SettingDeleteProject: React.FC<SettingDeleteProjectProps> = ({
  project,
  setIsSettingsModalOpen,
  admin
}) => {

  const router = useRouter();

  const { showAlert } = CustomToast();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const [deleteProject] = useMutation<
    DeleteProjectMutation,
    DeleteProjectMutationVariables
    >(DELETE_PROJECT, {
    onCompleted: (data) => {
        if (data?.deleteProject?.success) {
            showAlert("success", data?.deleteProject?.message);
            if (setIsSettingsModalOpen)
              setIsSettingsModalOpen(false);
            if (admin)
              router.push("/admin")
            else 
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


  const handleClickDelete: () => void = () => {
    if (!project) {
      return showAlert("error", "Please complete all fields in the form!");
    }

    deleteProject({
      variables: {
        deleteProjectId : +project?.id
      },
    });
  };

  const openModal: () => void = () => {
    setIsModalOpen(true);
  };

  const closeModal: () => void = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {
        admin ? 
          <Tooltip label={"Delete project"} bgColor={"grey"} color={"text"}>
            <IconButton
              size={"xs"}
              aria-label="Delete project"
              variant={"ghost"}
              icon={<DeleteIcon boxSize={3} />}
              onClick={openModal}
              zIndex={1}
              mt={2}
              mr={2}
            />
          </Tooltip>
        :
        <Box display="flex" justifyContent="center" mt={3}>
            <Button type="button" variant="outline" onClick={openModal}>
                Delete Project
            </Button>
        </Box>
      }
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
    </>
  );
};

export default SettingDeleteProject;