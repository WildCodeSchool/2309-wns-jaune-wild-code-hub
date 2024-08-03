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
import { EditIcon } from "@chakra-ui/icons";
import CustomToast from '@/components/ToastCustom/CustomToast';
import GenericModal from "@/components/GenericModal";
import { UPDATE_FILE } from "@/requetes/mutations/file.mutations";
import {
  UpdateFileMutation,
  UpdateFileMutationVariables,
  Project,
  File,
} from '@/types/graphql';
import { useMutation } from "@apollo/client";
import { GenerateLanguageProps } from "@/types/InfosPanel";

interface UpdateFileProps {
  file: File;
  setProject: React.Dispatch<React.SetStateAction<Project | null>>;
  setData: React.Dispatch<React.SetStateAction<File[]>>;
  setOpenFiles: React.Dispatch<React.SetStateAction<File[]>>;
  setCode: React.Dispatch<React.SetStateAction<string>>;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  generateLanguage : (name : string, extention : string) => GenerateLanguageProps;
}

const UpdateFile : React.FC<UpdateFileProps> = ({
  file,
  setProject,
  setData,
  setOpenFiles,
  setCode,
  setFile,
  generateLanguage
} : UpdateFileProps) => {

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [nameFile, setNameFile] = useState<string>(file.name);
  const [extentionFile, setExtentionFile] = useState<string>(file.extension);

  const { showAlert } = CustomToast();

  const [updateFile] = useMutation<
  UpdateFileMutation,
  UpdateFileMutationVariables
  >(UPDATE_FILE, {
  onCompleted: (data) => {
    if (data?.updateFile?.success) {
      setOpenFiles((prevOpenFiles) => {
        const newOpenFiles = prevOpenFiles.filter((f) => +f.id !== +file.id);
    
        setCode(file.content)
        setFile({
          ...file,
          name: generateLanguage(nameFile, extentionFile).name,
          extension: generateLanguage(nameFile, extentionFile).extension,
          language : generateLanguage(nameFile, extentionFile).language
        })
        return newOpenFiles;
      });


      setData((prevFiles) => {
        const updatedFiles = prevFiles.map((f) => 
          f.id === file.id ? { ...f, name: generateLanguage(nameFile, extentionFile).name, extension: generateLanguage(nameFile, extentionFile).extension, language : generateLanguage(nameFile, extentionFile).language } : f
        );
        return updatedFiles;
      });
  
      setProject((prevProject) => {
        if (prevProject) {
          const updatedFiles = prevProject.files.map((f) => 
            f.id === file.id ? { ...f, name: generateLanguage(nameFile, extentionFile).name, extension: generateLanguage(nameFile, extentionFile).extension, language : generateLanguage(nameFile, extentionFile).language } : f
          );
          return { ...prevProject, files: updatedFiles };
        }
        return prevProject;
      });
      
      showAlert("success", data?.updateFile?.message);
      setIsModalOpen(false);
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

  const handleClickUpdate: () => void = () => {
    if (!nameFile || !extentionFile ) 
      return showAlert("error", "Please complete all fields in the form!");
    updateFile({
      variables: {
        data : {
          id : +file.id,
          name : generateLanguage(nameFile, extentionFile).name,
          extension : generateLanguage(nameFile, extentionFile).extension,
          language : generateLanguage(nameFile, extentionFile).language,
          type : "file",
        }
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
      <Tooltip label={"Edit file"} bgColor={"grey"} color={"text"}>
        <IconButton
          size={"xs"}
          aria-label="Edit file"
          variant={"ghost"}
          icon={<EditIcon boxSize={3} />}
          onClick={openModal}
        />
      </Tooltip>
      <GenericModal isOpen={isModalOpen} onClose={closeModal} title="Edit file">
        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
          <Box width="100%" maxWidth="250px">
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
              <Text color="white" mb={2}>Language</Text>
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
              <Button type="button" variant="outline" onClick={closeModal}>
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

export default UpdateFile;