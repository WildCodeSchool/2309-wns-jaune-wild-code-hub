import React from "react";
import { Button, Flex } from "@chakra-ui/react";
import CustomToast from "@/components/ToastCustom/CustomToast";
import {
  UpdateMultipleFilesMutation,
  UpdateMultipleFilesMutationVariables,
  Project,
  File,
} from "@/types/graphql";
import { useMutation } from "@apollo/client";
import { UPDATE_MULTIPLE_FILES } from "@/requetes/mutations/file.mutations";
import { FindAllInfoUserAccessesProject } from "@/types/graphql";
import Cookies from "js-cookie";

interface UpdateListFilesEditorProps {
  data: File[];
  project: Project | null;
  expectedOrigin: string | undefined;
  listUserAuthorisationSave: FindAllInfoUserAccessesProject[] | null;
}

const UpdateListFilesEditor: React.FC<UpdateListFilesEditorProps> = ({
  data,
  project,
  expectedOrigin,
  listUserAuthorisationSave,
}) => {
  const { showAlert } = CustomToast();

  const [updateMultipleFiles] = useMutation<
    UpdateMultipleFilesMutation,
    UpdateMultipleFilesMutationVariables
  >(UPDATE_MULTIPLE_FILES, {
    onCompleted: (data) => {
      data.updateMultipleFiles.forEach((message) => {
        if (message.success) showAlert("success", `${message.message}`);
        else showAlert("error", `${message.message}`);
      });
    },
    onError(error) {
      showAlert(
        'error',
        error.message ?
          error.message
        :
          "We are sorry, there seems to be an error with the server. Please try again later."
      );
    },
  });

  const updateFilesListBDD: () => void = async () => {
    if (window.location.origin !== expectedOrigin) return;

    if (!project || listUserAuthorisationSave == null)
      return showAlert("error", "Please wait while the project loads!");

    const getCookieIdUser: string | undefined = Cookies.get("id");
    if (getCookieIdUser) {
      const checkAuthorisationSave = listUserAuthorisationSave?.find(
        (user: FindAllInfoUserAccessesProject) =>
          user.user_id === +getCookieIdUser
      );
      if (checkAuthorisationSave) {
        const newData = data.map((item: any) => {
          const { __typename, id, created_at, update_at, ...rest } = item;
          return { ...rest, id: +id };
        });

        if (newData) {
          updateMultipleFiles({
            variables: {
              data: newData,
            },
          });
        }
      } else {
        showAlert("error", "You are not authorized to save files!");
      }
    } else {
      showAlert("error", "Access denied! You need to be authenticated to perform this action!");
    }
  };

  return (
    <Flex paddingInline={6}>
      <Button
        type="button"
        variant="secondary"
        size={"sm"}
        paddingInline={6}
        onClick={updateFilesListBDD}
      >
        Save
      </Button>
    </Flex>
  );
};

export default UpdateListFilesEditor;
