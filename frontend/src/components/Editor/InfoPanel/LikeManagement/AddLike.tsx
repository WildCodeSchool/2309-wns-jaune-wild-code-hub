import React from "react";
import CustomToast from '@/components/ToastCustom/CustomToast';
import HeartIcon from "@/Icons/HeartIcon";
import { IconButton, Tooltip } from "@chakra-ui/react";
import { GetSupportersProps } from "@/types/InfosPanel";
import { ADD_LIKE_PROJECT } from "@/requetes/mutations/user.mutations";
import { 
  AddLikeProjectMutation,
  AddLikeProjectMutationVariables,
  Project
} from "@/types/graphql";
import { useMutation } from "@apollo/client";

interface AddLikeProps {
  setSupporters: React.Dispatch<React.SetStateAction<GetSupportersProps[]>>;
  supporters : GetSupportersProps[];
  meInfoUser : GetSupportersProps | null;
  project: Project | null;
}

const AddLike: React.FC<AddLikeProps> = ({ setSupporters, supporters, meInfoUser, project}: AddLikeProps) => {

  const { showAlert } = CustomToast();

  const [addLikeProject] = useMutation<
  AddLikeProjectMutation,
  AddLikeProjectMutationVariables
  >(ADD_LIKE_PROJECT, {
  onCompleted: (data) => {
    if (data.addLikeProject.success) {
      if (!meInfoUser)
        return showAlert("error", "The like was saved successfully, but an error occurred. Please refresh the page.");
      setSupporters((prev) =>{
        return [...prev, meInfoUser]
      })
      showAlert("success", data.addLikeProject.message);
    } else {
      showAlert("error", data.addLikeProject.message);
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
    if (!project)
      return showAlert("error", "Please wait while the project loads!");
    
    addLikeProject({
      variables: {
        projectId : +project.id
      },
    });
  }

  return (
    <>
      <Tooltip label={"Add a like"} bgColor={"grey"} color={"text"}>
        <IconButton
          size={"xs"}
          aria-label="Add a like"
          variant={"ghost"}
          icon={<HeartIcon boxSize={4}  />}
          color="white"
          onClick={handleClick}
        />
      </Tooltip>
    </>
  );
};

export default AddLike;