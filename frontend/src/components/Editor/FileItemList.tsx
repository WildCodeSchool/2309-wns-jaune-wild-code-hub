import { useState } from "react";
import { File, Project } from "@/types/graphql";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, IconButton, Tooltip, ButtonGroup, Text, Input, Select } from "@chakra-ui/react";
import CSSIcon from "./Icons/CSSIcon";
import DefaultFileIcon from "./Icons/DefaultFile";
import HTMLIcon from "./Icons/HTMLIcon";
import JSIcon from "./Icons/JSIcon";
import GenericModal from "../GenericModal";
import {
  DeleteFileMutation,
  DeleteFileMutationVariables,
  UpdateFileMutation,
  UpdateFileMutationVariables,
} from '@/types/graphql'
import { DELETE_FILE, UPDATE_FILE } from "@/requetes/mutations/file.mutations";
import CustomToast from '@/components/ToastCustom/CustomToast';
import { useMutation } from "@apollo/client";

type Props = {
  file: File;
  handleOpenFiles: (fileId: number) => void;
  project: Project;
  setProject: React.Dispatch<React.SetStateAction<Project | null>>;
  setData: React.Dispatch<React.SetStateAction<File[]>>;
  setOpenFiles: React.Dispatch<React.SetStateAction<File[]>>;
  setCode: React.Dispatch<React.SetStateAction<string>>;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
};

type GenerateLanguageProps =  {
  name : string,
  extension : string,
  language : string,
}

const FileItemList = ({ file, handleOpenFiles, project, setProject, setData, setOpenFiles, setCode, setFile }: Props) => {

  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState<boolean>(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState<boolean>(false);
  const [nameFile, setNameFile] = useState<string>(file.name);
  const [extentionFile, setExtentionFile] = useState<string>(file.extension);

  const { showAlert } = CustomToast();

  const generateLanguage: () => GenerateLanguageProps = (): GenerateLanguageProps => {
    let newData : GenerateLanguageProps = {
      name : nameFile,
      extension : extentionFile,
      language : "",
    }
    
    switch (extentionFile) {
      case "js":
        newData.language = "javascript"
        break;
      case "css":
        newData.language = "css"
        break;
      case "html":
        newData.language = "html"
        break;
    }
    return newData;
  }

  const [updateFile] = useMutation<
  UpdateFileMutation,
  UpdateFileMutationVariables
  >(UPDATE_FILE, {
  onCompleted: (data) => {
      if (data?.updateFile?.success) {
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

        setData((prevFiles) => {
          const updatedFiles = prevFiles.map((f) => 
            f.id === file.id ? { ...f, name: generateLanguage().name, extension: generateLanguage().extension, language : generateLanguage().language } : f
          );
          return updatedFiles;
        });
    
        setProject((prevProject) => {
          if (prevProject) {
            const updatedFiles = prevProject.files.map((f) => 
              f.id === file.id ? { ...f, name: generateLanguage().name, extension: generateLanguage().extension, language : generateLanguage().language } : f
            );
            return { ...prevProject, files: updatedFiles };
          }
          return prevProject;
        });
        
        showAlert("success", data?.updateFile?.message);
        setIsModalUpdateOpen(false);
      } else {
        showAlert(
          "error",
          data?.updateFile?.message ? 
          data?.updateFile?.message
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
        setIsModalDeleteOpen(false)
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


  const handleClickUpdate: () => void = () => {
    if (!nameFile || !extentionFile ) 
      return showAlert("error", "Please complete all fields in the form!");
    updateFile({
      variables: {
        data : {
          id : +file.id,
          name : generateLanguage().name,
          extension : generateLanguage().extension,
          language : generateLanguage().language,
          type : "file",
        }
      },
    });
  };

  const handleClickDelete: () => void  = () => {
    deleteFile({
      variables: {
        deleteFileId : +file.id,
      },
    });
  };

  const openModalDelete: () => void  = () => {
    setIsModalDeleteOpen(true);
  };

  const closeModalDelete: () => void  = () => {
    setIsModalDeleteOpen(false);
  };

  const openModalUpdate: () => void  = () => {
    setIsModalUpdateOpen(true);
  };

  const closeModalUpdate: () => void  = () => {
    setIsModalUpdateOpen(false);
  };

  return (
    <>
      <Flex justifyContent={"space-between"} width={"100%"}>
        <Button
          onClick={() => handleOpenFiles(+file.id)}
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
          <Tooltip label={"Edit file"} bgColor={"grey"} color={"text"}>
            <IconButton
              size={"xs"}
              aria-label="Edit file"
              variant={"ghost"}
              icon={<EditIcon boxSize={3} />}
              onClick={openModalUpdate}
            />
          </Tooltip>
          <Tooltip label={"Delete file"} bgColor={"grey"} color={"text"}>
            <IconButton
              size={"xs"}
              aria-label="Delete file"
              variant={"ghost"}
              icon={<DeleteIcon boxSize={3} />}
              onClick={openModalDelete}
            />
          </Tooltip>
        </Flex>
      </Flex>
      <GenericModal isOpen={isModalDeleteOpen} onClose={closeModalDelete} title="Deleting file">
        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
          <Box width="100%" maxWidth="250px" textAlign="center">
            <Text color="white" mb={8}>
              Deleting your file will erase all your information and data from Wild Code Hub. This action is irreversible.
            </Text>
            <Text color="white" mb={8}>
              Are you sure you want to delete the file {file?.name}.{file?.extension} ?
            </Text>
            <ButtonGroup spacing={5} mt={4} display="flex" justifyContent="center">
              <Button type="button" variant="outline" onClick={closeModalDelete}>
                Cancel
              </Button>
              <Button type="button" variant="primary" onClick={handleClickDelete}>
                {"Yes, I'm sure"}
              </Button>
            </ButtonGroup>
          </Box>
        </Box>
      </GenericModal>
      <GenericModal isOpen={isModalUpdateOpen} onClose={closeModalUpdate} title="Edit file">
        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
          <Box width="100%" maxWidth="250px" textAlign="center">
            <Text color="white" mb={2}>Enter Name of the File </Text>
            <Input 
              color="black"
              bg="white"
              type='text'
              name='emailOrPseudo'
              value={nameFile}
              onChange={(e) => setNameFile(e.target.value)} 
              mb={2}
              />
              <Text color="white" mb={2}>Languge</Text>
              <Select
                size="sm"
                width="100%"
                value={extentionFile}
                onChange={(e) => setExtentionFile(e.target.value)}
                bg="white"
                color="black"
                borderRadius={5}
                mb={20}
              >
                <option value="js">JavaScript</option>
                <option value="css">CSS</option>
                <option value="html">HTML</option>
              </Select>
            <ButtonGroup spacing={5} mt={4} display="flex" justifyContent="center">
              <Button type="button" variant="outline" onClick={closeModalUpdate}>
                Cancel
              </Button>
              <Button type="button" variant="secondary" onClick={handleClickUpdate}>
                Update File
              </Button>
            </ButtonGroup>
          </Box>
        </Box>
      </GenericModal>
    </>
  );
};

export default FileItemList;