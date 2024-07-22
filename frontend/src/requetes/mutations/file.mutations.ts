import { gql } from "@apollo/client";

export const UPDATE_MULTIPLE_FILES = gql`
  mutation updateMultipleFiles($data:[UpdateFileInput!]!) {
    updateMultipleFiles(data: $data) {
        success
        message
    }
  }
`;