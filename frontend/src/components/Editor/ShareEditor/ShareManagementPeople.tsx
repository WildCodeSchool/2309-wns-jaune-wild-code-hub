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
  ButtonGroup,
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
  
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState<{ id: number, pseudo: string | undefined } | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const userPerPage: number = 4;
    const indexLast = currentPage * userPerPage;
    const indexFirst = indexLast - userPerPage;

    const pagination = () : FindAllInfoUserAccessesProject[] | undefined => {
      const filterOwner = users?.filter((user: FindAllInfoUserAccessesProject) => user.role !== "OWNER");
      return filterOwner?.slice(indexFirst, indexLast);
    };

    const next = (): void => {
      if(!users) 
        return showAlert("error", "Please complete all fields in the form!");
      if (!(currentPage < Math.ceil(users?.length / userPerPage))) 
        return showAlert("error", "You are on the last page!");
      setCurrentPage(currentPage + 1);
    };
  
    const previous = (): void => {
      if(!users) 
        return showAlert("error", "Please complete all fields in the form!");
      if (!(currentPage > 1)) 
        return showAlert("error", "You are on the first page!");
      setCurrentPage(currentPage - 1);
    };

  const [deleteAccessProject] = useMutation<
    DeleteAccessProjectMutation,
    DeleteAccessProjectMutationVariables
  >(DELETE_USERS_ACCESSES_PROJECTS, {
    onCompleted: (data, context) => {
      if (data.deleteAccessProject.success) {

        const mutationContext = context?.context as MutationContext;
        const updatedUsers = (users ?? []).filter(user => user.user_id !== mutationContext.id);

        setUsers(updatedUsers);

        const newTotalUsers = updatedUsers.filter((user: FindAllInfoUserAccessesProject) => user.role !== "OWNER").length;
        
        if (indexFirst >= newTotalUsers && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }

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
    <Box display="flex" flexDirection="column" alignItems="center" >
      <Box  width="100%" maxWidth="250px">
        <List spacing={3}>
          {pagination()?.map(user => {
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
                    bg="white"
                    color="#000000"
                    borderRadius={5}
                  >
                    <option value="EDITOR" style={{ color :"dark"}}>Editor</option>
                    <option value="VIEWER" style={{ color :"dark"}}>Viewer</option>
                  </Select>
                <CloseIcon onClick={() => openModal(user.user_id, user.user?.pseudo)} cursor={"pointer"} />
              </ListItem>
            );
          })}
        </List>
        <ButtonGroup display="flex" alignItems="center" mt="10" ml="4" spacing={4}>
          <Button type="button" variant="outline" onClick={previous} ml={1} >
            {"< Prev"}
          </Button>
          <Button type="button" variant="secondary" onClick={next}>
            {"Next >"}
          </Button>
        </ButtonGroup>
      </Box>
      <GenericModal isOpen={isModalOpen} onClose={closeModal} title="Confirm Deletion">
        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
          <Box width="100%" maxWidth="250px" textAlign="center">
            <Text color="white">
              Are you sure you want to remove access to {userToDelete?.pseudo}?
              This action could cause interruptions and complications for users who rely on it.
            </Text>
            <ButtonGroup spacing={5} mt={4} display="flex" justifyContent="center">
              <Button  type="button" variant="outline" onClick={closeModal}>
                Cancel
              </Button>
              <Button type="button" variant="primary" onClick={confirmDelete}>
                {"Yes, l'm sure"}
              </Button>
            </ButtonGroup>
          </Box>
        </Box>
      </GenericModal>
    </Box>
  );
};

export default ShareManagementPeople;