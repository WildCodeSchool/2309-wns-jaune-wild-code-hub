import React from "react";
import CustomToast from '@/components/ToastCustom/CustomToast';
import HeartIcon from "@/Icons/HeartIcon";
import { Button, IconButton, Tooltip } from "@chakra-ui/react";

interface DeleteLikeProps {
}

const DeleteLike: React.FC<DeleteLikeProps> = ({}: DeleteLikeProps) => {
  
  const { showAlert } = CustomToast();

  return (
    <>
      <Tooltip label={"Remove my like"} bgColor={"grey"} color={"text"}>
        <IconButton
          size={"xs"}
          aria-label="Remove my like"
          variant={"ghost"}
          icon={<HeartIcon boxSize={4}  />}
          color="red"
          // onClick={openModal}
        />
      </Tooltip>
    </>
  );
};

export default DeleteLike;