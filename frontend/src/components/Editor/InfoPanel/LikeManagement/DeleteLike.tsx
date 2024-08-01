import React from "react";
import CustomToast from '@/components/ToastCustom/CustomToast';

interface DeleteLikeProps {
}

const DeleteLike: React.FC<DeleteLikeProps> = ({}: DeleteLikeProps) => {
  
  const { showAlert } = CustomToast();

  return (
    <>
    </>
  );
};

export default DeleteLike;