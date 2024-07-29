import { useState } from "react";
import { File, Project } from "@/types/graphql";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, IconButton, Tooltip, ButtonGroup, Text } from "@chakra-ui/react";
import CSSIcon from "./Icons/CSSIcon";
import DefaultFileIcon from "./Icons/DefaultFile";
import HTMLIcon from "./Icons/HTMLIcon";
import JSIcon from "./Icons/JSIcon";
import GenericModal from "../GenericModal";
import {
  DeleteFileMutation,
  DeleteFileMutationVariables,
} from '@/types/graphql'
import { DELETE_FILE } from "@/requetes/mutations/file.mutations";
import CustomToast from '@/components/ToastCustom/CustomToast';
import { useMutation } from "@apollo/client";

type Props = {
  file: File;
  openFiles: (fileId: number) => void;
  project: Project;
  setProject: React.Dispatch<React.SetStateAction<Project | null>>;
  setData: React.Dispatch<React.SetStateAction<File[]>>;
};

const FileItemList = ({ file, openFiles, project, setProject, setData}: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleClickRename = () => {
    // logique de renommage
  };

  const handleClickDelete = () => {
    deleteFile({
      variables: {
        deleteFileId : +file.id,
      },
    });
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Flex justifyContent={"space-between"} width={"100%"}>
        <Button
          onClick={() => openFiles(+file.id)}
          variant={"ghost"}
          leftIcon={
            file.extension === "js" ? (
              <JSIcon boxSize={3} />
            ) : file.extension === "css" ? (
              <CSSIcon boxSize={3} />
            ) : file.extension === "html" ? (
              <HTMLIcon boxSize={3} />
            ) : (
              <DefaultFileIcon boxSize={3} />
            )
          }
        >
          {file.name}
        </Button>
        <Flex alignItems={"center"}>
          <Tooltip label={"Rename file"} bgColor={"grey"} color={"text"}>
            <IconButton
              size={"xs"}
              aria-label="rename file"
              variant={"ghost"}
              icon={<EditIcon boxSize={3} />}
              onClick={handleClickRename}
            />
          </Tooltip>
          <Tooltip label={"Delete file"} bgColor={"grey"} color={"text"}>
            <IconButton
              size={"xs"}
              aria-label="delete file"
              variant={"ghost"}
              icon={<DeleteIcon boxSize={3} />}
              onClick={openModal}
            />
          </Tooltip>
        </Flex>
      </Flex>
      <GenericModal isOpen={isModalOpen} onClose={closeModal} title="Deleting file">
        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
          <Box width="100%" maxWidth="250px" textAlign="center">
            <Text color="white" mb={8}>
              Deleting your file will erase all your information and data from Wild Code Hub. This action is irreversible.
            </Text>
            <Text color="white" mb={8}>
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

export default FileItemList;