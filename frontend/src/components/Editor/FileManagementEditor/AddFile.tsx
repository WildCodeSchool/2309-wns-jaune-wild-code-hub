import React, { useState } from "react";
import {
  Input,
  Button,
  Tooltip,
  IconButton,
  ButtonGroup,
  Box,
  Select,
  Text,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import CustomToast from '@/components/ToastCustom/CustomToast';
import GenericModal from "@/components/GenericModal";
import { CREATE_FILE } from "@/requetes/mutations/file.mutations";
import {
  CreateFileMutation,
  CreateFileMutationVariables,
  Project,
  File,
} from '@/types/graphql';
import { useMutation } from "@apollo/client";
import { GenerateLanguageProps } from "@/components/Editor/InfosPanel";

interface AddFileProps {
  project: Project | null;
  setProject: React.Dispatch<React.SetStateAction<Project | null>>;
  setData: React.Dispatch<React.SetStateAction<File[]>>;
  setOpenFiles: React.Dispatch<React.SetStateAction<File[]>>;
  setCode: React.Dispatch<React.SetStateAction<string>>;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  generateLanguage : (name : string, extention : string) => GenerateLanguageProps;
}

const AddFile: React.FC<AddFileProps> = ({project, setProject, setData, setOpenFiles, setCode, setFile, generateLanguage} : AddFileProps) => {

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [nameFile, setNameFile] = useState<string>("");
  const [extentionFile, setExtentionFile] = useState<string>("");

  const { showAlert } = CustomToast();
  const [createFile] = useMutation<
  CreateFileMutation,
  CreateFileMutationVariables
  >(CREATE_FILE, {
  onCompleted: (data) => {
    const newFile: File = {
      id: data.createFile.id,
      name: data.createFile.name,
      type: data.createFile.type,
      language: data.createFile.language,
      extension: data.createFile.extension,
      content: data.createFile.content,
      created_at: data.createFile.created_at,
      update_at: data.createFile.update_at,
      __typename: "File",
    };


    setOpenFiles((prevState) => {
      return [...prevState, newFile];
    }),

    setCode(newFile.content),
    setFile(newFile)

    setData((prevFiles) => {
      return [ ...prevFiles, newFile ];
    });

    setProject((prevProject) => {
      if (prevProject) {
        return { ...prevProject, files: [...prevProject.files, newFile ] };
      }
      return prevProject;
    });
    
    showAlert("success", "The file has been created successfully!");
    setIsModalOpen(false);
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

  const openModal: () => void  = () => {
    setIsModalOpen(true);
  };

  const closeModal: () => void  = () => {
    setIsModalOpen(false);
  };

  const handleClick: () => void  = () => {
    if (!project)
      return showAlert("error", "Please wait while the project loads!");

    if (!nameFile || !extentionFile )
      return showAlert("error", "Please complete all fields in the form!");
    createFile({
      variables: {
        data : {
          name : generateLanguage(nameFile, extentionFile).name,
          extension : generateLanguage(nameFile, extentionFile).extension,
          language : generateLanguage(nameFile, extentionFile).language,
          type : "file",
          content : "",
          project_id : +project?.id
        }
      },
    });
  };

  return (
    <>
      <Tooltip label={"Add file"} bgColor={"grey"} color={"text"}>
        <IconButton
          size={"xs"}
          aria-label="Add file"
          variant={"ghost"}
          icon={<AddIcon boxSize={3} />}
          onClick={openModal}
        />
      </Tooltip>
      <GenericModal isOpen={isModalOpen} onClose={closeModal} title="Created file">
        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
          <Box width="100%" maxWidth="250px">
            <Text color="white" mb={2}>
              Enter Name of the File 
            </Text>
            <Input 
              color="black"
              bg="white"
              type='text'
              name='emailOrPseudo'
              value={nameFile}
              onChange={(e) => setNameFile(e.target.value)} 
              mb={2}
              />
            <Text color="white" mb={2}>
              Language
            </Text>
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
              <option value="">Select Language</option>
              <option value="js">JavaScript</option>
              <option value="css">CSS</option>
              <option value="html">HTML</option>
            </Select>
            <ButtonGroup spacing={5} mt={4} display="flex" justifyContent="center">
              <Button type="button" variant="outline" onClick={closeModal}>
                Cancel
              </Button>
              <Button type="button" variant="secondary" onClick={handleClick}>
                Create File
              </Button>
            </ButtonGroup>
          </Box>
        </Box>
      </GenericModal>
    </>
  );
};

export default AddFile;