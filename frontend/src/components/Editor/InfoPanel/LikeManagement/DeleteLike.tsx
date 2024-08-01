import React from "react";
import CustomToast from '@/components/ToastCustom/CustomToast';

interface DeleteLikeProps {
}

const DeleteLike: React.FC<DeleteLikeProps> = ({}: DeleteLikeProps) => {
  
  const { showAlert } = CustomToast();

  return (
    <>
    <p>delete like</p>
    </>
  );
};

export default DeleteLike;