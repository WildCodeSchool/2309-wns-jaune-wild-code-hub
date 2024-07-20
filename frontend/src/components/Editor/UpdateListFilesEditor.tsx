import React from "react";
import { Button } from "@chakra-ui/react";
import CustomToast from '@/components/ToastCustom/CustomToast';
import {
  UpdateMultipleFilesMutation,
  UpdateMultipleFilesMutationVariables,
  Project, 
} from "@/types/graphql";
import { useMutation } from "@apollo/client";
import { UPDATE_MULTIPLE_FILES } from "@/requetes/mutations/file.mutations";
import { File } from "@/types/editor";

interface UpdateListFilesEditorProps {
  data: File[];
  project: Project | null;
  expectedOrigin : string | undefined;
}

const UpdateListFilesEditor: React.FC<UpdateListFilesEditorProps> = ({ data, project, expectedOrigin }) => {
  
  const { showAlert } = CustomToast();

  const [updateMultipleFiles] = useMutation<
    UpdateMultipleFilesMutation,
    UpdateMultipleFilesMutationVariables
  >(UPDATE_MULTIPLE_FILES, {
    onCompleted: (data) => {
        data.updateMultipleFiles.forEach((message) => {
            if (message.success)
              showAlert('success', `${message.message}`);
            else
              showAlert('error', `${message.message}`);
        })
    },
    onError(error) {
        console.log("error", error)
        showAlert('error', 'We are sorry, there seems to be an error with the server. Please try again later.');
    }
  });

  const updateFilesListBDD: () => void = async () => {
    if (window.location.origin !== expectedOrigin) return;
    if(!project) {
        showAlert("error", "Please wait while the project loads!");
        return;
    }
    const newData = data.map((item: any) => {
        const { __typename, id, ...rest } = item;
        return { ...rest, id: +id };
    });
    if (data) {
        updateMultipleFiles({
            variables: {
                data: newData
            },
        });

    }
  }

  return (
    <>
      <Button type="button" variant="secondary" onClick={updateFilesListBDD}>
          Save
      </Button>
    </>
  );
};

export default UpdateListFilesEditor;