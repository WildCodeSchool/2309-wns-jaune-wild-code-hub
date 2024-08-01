import React from "react";
import CustomToast from '@/components/ToastCustom/CustomToast';
import HeartIcon from "@/Icons/HeartIcon";
import { IconButton, Tooltip } from "@chakra-ui/react";
import { GetSupportersProps } from "@/types/InfosPanel";
import { DELETE_LIKE_PROJECT } from "@/requetes/mutations/user.mutations";
import { 
  DeleteLikeProjectMutation,
  DeleteLikeProjectMutationVariables,
  Project
} from "@/types/graphql";
import { useMutation } from "@apollo/client";

interface DeleteLikeProps {
  setSupporters: React.Dispatch<React.SetStateAction<GetSupportersProps[]>>;
  supporters : GetSupportersProps[];
  meInfoUser : GetSupportersProps | null;
  project: Project;
}

const DeleteLike: React.FC<DeleteLikeProps> = ({ setSupporters, supporters, meInfoUser, project }: DeleteLikeProps) => {
  
  const { showAlert } = CustomToast();

  const [deleteLikeProject] = useMutation<
  DeleteLikeProjectMutation,
  DeleteLikeProjectMutationVariables
  >(DELETE_LIKE_PROJECT, {
  onCompleted: (data) => {
    if (data.deleteLikeProject.success) {
      if (!meInfoUser)
        return showAlert("error", "The like was saved successfully, but an error occurred. Please refresh the page.");
      setSupporters((prev) =>{
        const deleteUser = prev.filter(user => user.id !== meInfoUser.id);
        return deleteUser;
      })
      showAlert("success", data.deleteLikeProject.message)
    } else {
      showAlert("error", data.deleteLikeProject.message)
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

  const handleClick: () => void = (): void => {
    if (!meInfoUser || !supporters)
      return showAlert("error", "Please log in to use this feature!");

    deleteLikeProject({
      variables: {
        projectId : +project.id
      },
    });
  }

  return (
    <>

      <Tooltip label={"Remove my like"} bgColor={"grey"} color={"text"}>
        <IconButton
          size={"xs"}
          aria-label="Remove my like"
          variant={"ghost"}
          icon={<HeartIcon boxSize={4}  />}
          color="red"
          onClick={handleClick}
        />
      </Tooltip>
    </>
  );
};

export default DeleteLike;