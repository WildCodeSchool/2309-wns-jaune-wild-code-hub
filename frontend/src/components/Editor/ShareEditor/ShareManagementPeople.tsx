import React, { useState } from "react";
import { FindAllInfoUserAccessesProject } from "@/types/graphql";
import { 
  Text,
  Box,
  Select,
  List, 
  ListItem,
  useBreakpointValue,
  Button,
} from "@chakra-ui/react";
import CustomToast from '@/components/ToastCustom/CustomToast';
import { CloseIcon } from "@chakra-ui/icons";
import {
  UpdateAccessProjectMutation,
  UpdateAccessProjectMutationVariables,
  DeleteAccessProjectMutation,
  DeleteAccessProjectMutationVariables,
} from "@/types/graphql";
import { useMutation } from "@apollo/client";
import { 
  UPDATE_USERS_ACCESSES_PROJECTS,
  DELETE_USERS_ACCESSES_PROJECTS,
} from "@/requetes/mutations/usersAccessesProjects.mutations";
import { useRouter } from "next/router";
import GenericModal from '@/components/GenericModal';

interface ShareManagementPeopleProps {
  users : FindAllInfoUserAccessesProject[] | null;
  setUsers: React.Dispatch<React.SetStateAction<FindAllInfoUserAccessesProject[] | null>>;
}

interface MutationContext {
  id: number;
  role: string;
  pseudo: string;
}

const ShareManagementPeople: React.FC<ShareManagementPeopleProps> = ({ users, setUsers }) => {

  const { showAlert } = CustomToast();
  const router = useRouter();

  const [deleteAccessProject] = useMutation<
    DeleteAccessProjectMutation,
    DeleteAccessProjectMutationVariables
  >(DELETE_USERS_ACCESSES_PROJECTS, {
    onCompleted: (data, context) => {
      if (data.deleteAccessProject.success) {
        const mutationContext = context?.context as MutationContext;
        const updatedUsers = (users ?? []).filter(user => user.user_id !== mutationContext.id);
        setUsers(updatedUsers);
        showAlert("success", `Deleted user with pseudo: ${mutationContext.pseudo}`);
      } else {
        showAlert("error", data.deleteAccessProject.message);
      }
    },
    onError(error) {
      console.log("error", error)
      showAlert('error', 'We are sorry, there seems to be an error with the server. Please try again later.');
    }
  });

  const [updateAccessProject] = useMutation<
    UpdateAccessProjectMutation,
    UpdateAccessProjectMutationVariables
  >(UPDATE_USERS_ACCESSES_PROJECTS, {
    onCompleted: (data, context) => {
      if (data.updateAccessProject.success) {
        const mutationContext = context?.context as MutationContext;
        const updatedUsers = (users ?? []).map(user => 
          user.user_id === mutationContext.id ? { ...user, role: mutationContext.role } : user
        );
        setUsers(updatedUsers);
        showAlert("success", `Changed role to ${mutationContext.role} for user with pseudo: ${mutationContext.pseudo}`);
      } else {
        showAlert("error", data.updateAccessProject.message);
      }
    },
    onError(error) {
      console.log("error", error)
      showAlert('error', 'We are sorry, there seems to be an error with the server. Please try again later.');
    }
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<{ id: number, pseudo: string | undefined } | null>(null);

  const openModal = (id: number, pseudo: string | undefined) => {
    setUserToDelete({ id, pseudo });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setUserToDelete(null);
  };

  const confirmDelete = () => {
    if (userToDelete && router.query.id) {
      deleteAccessProject({
        variables: {
          data: {
            user_id: userToDelete.id,
            project_id: +router.query.id,
          }
        },
        context: {
          id: userToDelete.id,
          pseudo: userToDelete.pseudo
        }
      });
      closeModal();
    } else {
      showAlert("error", "Please wait while the project loads!");
    }
  };

  const handleRoleChange = (id: number, role: string, pseudo: string | undefined) => {
    if (!users || !router.query.id || !pseudo || !role)
      return showAlert("error", "Please wait while the project loads!");

    updateAccessProject({
      variables: {
        data: {
          user_id: id,
          role: role,
          project_id: +router.query.id,
        }
      },
      context: {
        id: id,
        role: role,
        pseudo: pseudo
      }
    });
  };

  const pseudoFontSize = useBreakpointValue({ base: "12px", sm: "14px", md: "16px", lg: "18px" });

  return (
    <Box mt={5}>
      <Text color="white" mb={2} fontSize="18px">Management People :</Text>
      <Box mt={5}>
        <List spacing={3}>
          {users?.map(user => {
            if (user.role === "OWNER") return null; 
            return (
              <ListItem 
                key={user.user_id} 
                display="flex" 
                alignItems="center" 
                justifyContent="space-between" 
              >
                <Box display="flex" alignItems="center" flex="1">
                  <Text color="white" mr={3} fontSize={pseudoFontSize}>{user.user?.pseudo}</Text>
                </Box>
                <Select
                    size="sm"
                    width="auto"
                    mr={3}
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.user_id, e.target.value, user.user?.pseudo)}
                  >
                    <option value="EDITOR">Editor</option>
                    <option value="VIEWER">Viewer</option>
                  </Select>
                <CloseIcon onClick={() => openModal(user.user_id, user.user?.pseudo)} cursor={"pointer"} />
              </ListItem>
            );
          })}
        </List>
      </Box>
      <GenericModal isOpen={isModalOpen} onClose={closeModal} title="Confirm Deletion">
        <Text color="white">Are you sure you want to remove access to {userToDelete?.pseudo}?</Text>
        <Box mt={4} display="flex" justifyContent="center">
          <Button type="button" variant="ghost" onClick={closeModal}>
            Cancel
          </Button>
          <Button type="button" variant="secondary" onClick={confirmDelete}>
            Confirm
          </Button>
        </Box>
      </GenericModal>
    </Box>
  );
};

export default ShareManagementPeople;