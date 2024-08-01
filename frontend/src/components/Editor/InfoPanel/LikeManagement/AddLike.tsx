import React from "react";
import CustomToast from '@/components/ToastCustom/CustomToast';
import HeartIcon from "@/Icons/HeartIcon";
import { Button, IconButton, Tooltip } from "@chakra-ui/react";

interface AddLikeProps {
}

const AddLike: React.FC<AddLikeProps> = ({}: AddLikeProps) => {

  const { showAlert } = CustomToast();

  return (
    <>
      <Tooltip label={"Add my like"} bgColor={"grey"} color={"text"}>
        <IconButton
          size={"xs"}
          aria-label="Add my like"
          variant={"ghost"}
          icon={<HeartIcon boxSize={4}  />}
          color="red"
          // onClick={openModal}
        />
      </Tooltip>
    </>
  );
};

export default AddLike;