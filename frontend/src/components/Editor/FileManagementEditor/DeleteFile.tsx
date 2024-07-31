import React, { useState } from "react";
import {
  Button,
  Tooltip,
  IconButton,
  ButtonGroup,
  Box,
  Text,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import CustomToast from '@/components/ToastCustom/CustomToast';
import GenericModal from "@/components/GenericModal";
import { DELETE_FILE } from "@/requetes/mutations/file.mutations";
import {
  DeleteFileMutation,
  DeleteFileMutationVariables,
  Project,
  File,
} from '@/types/graphql';
import { useMutation } from "@apollo/client";
import { GenerateLanguageProps } from "@/components/Editor/InfosPanel";

interface DeleteFileProps {
  file: File;
  project: Project;
  setProject: React.Dispatch<React.SetStateAction<Project | null>>;
  setData: React.Dispatch<React.SetStateAction<File[]>>;
  setOpenFiles: React.Dispatch<React.SetStateAction<File[]>>;
  setCode: React.Dispatch<React.SetStateAction<string>>;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  generateLanguage : (name : string, extention : string) => GenerateLanguageProps;
}

const DeleteFile : React.FC<DeleteFileProps> = ({ file, project, setProject, setData, setOpenFiles, setCode, setFile, generateLanguage} : DeleteFileProps) => {

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { showAlert } = CustomToast();

  const [deleteFile] = useMutation<
  DeleteFileMutation,
  DeleteFileMutationVariables
  >(DELETE_FILE, {
  onCompleted: (data) => {
    if (data?.deleteFile?.success) {
      showAlert("success", data?.deleteFile?.message);
      setTimeout(() => {
        const filesRest = project?.files?.filter(filePoject => filePoject.id !== file.id );

        setOpenFiles((prevOpenFiles) => {
          const newOpenFiles = prevOpenFiles.filter((f) => +f.id !== +file.id);
          if (newOpenFiles.length === 0) {
            setFile(null);
            setCode("");
          } else if (Number(file?.id) ===  +file.id) {
            setFile(newOpenFiles[newOpenFiles.length - 1]);
            setCode(newOpenFiles[newOpenFiles.length - 1].content);
          }
          return newOpenFiles;
        });

        setProject({ ...project, files: filesRest });
        setData(filesRest);
        setIsModalOpen(false)
      }, 100)
    } else {
      showAlert(
        "error",
        data?.deleteFile?.message ? 
        data?.deleteFile?.message
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

  const handleClickDelete: () => void  = () => {
    deleteFile({
      variables: {
        deleteFileId : +file.id,
      },
    });
  };

  const openModal: () => void  = () => {
    setIsModalOpen(true);
  };

  const closeModal: () => void  = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Tooltip label={"Delete file"} bgColor={"grey"} color={"text"}>
        <IconButton
          size={"xs"}
          aria-label="Delete file"
          variant={"ghost"}
          icon={<DeleteIcon boxSize={3} />}
          onClick={openModal}
        />
      </Tooltip>
      <GenericModal isOpen={isModalOpen} onClose={closeModal} title="Deleting file">
        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
          <Box width="100%" maxWidth="250px" textAlign="center">
            <Text color="white" mb={25}>
              Deleting your file will erase all your information and data from Wild Code Hub. This action is irreversible.
            </Text>
            <Text color="white" mb={25}>
              Are you sure you want to delete the file {file?.name}.{file?.extension} ?
            </Text>
            <ButtonGroup spacing={5} mt={4} display="flex" justifyContent="center">
              <Button type="button" variant="outline" onClick={closeModal}>
                Cancel
              </Button>
              <Button type="button" variant="primary" onClick={handleClickDelete}>
                {"Yes, I'm sure"}
              </Button>
            </ButtonGroup>
          </Box>
        </Box>
      </GenericModal>
    </>
  );
};

export default DeleteFile;