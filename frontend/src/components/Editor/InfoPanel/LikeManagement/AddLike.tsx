import React from "react";
import CustomToast from '@/components/ToastCustom/CustomToast';

interface AddLikeProps {
}

const AddLike: React.FC<AddLikeProps> = ({}: AddLikeProps) => {

  const { showAlert } = CustomToast();

  return (
    <>
    <p>Add like</p>
    </>
  );
};

export default AddLike;