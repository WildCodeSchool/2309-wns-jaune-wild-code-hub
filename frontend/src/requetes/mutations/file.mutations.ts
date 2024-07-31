import { gql } from "@apollo/client";

export const UPDATE_MULTIPLE_FILES = gql`
  mutation updateMultipleFiles($data:[UpdateFileInput!]!) {
    updateMultipleFiles(data: $data) {
        success
        message
    }
  }
`;

export const DELETE_FILE = gql`
  mutation deleteFile($deleteFileId: Float!) {
    deleteFile(id: $deleteFileId) {
      success
      message
    }
  }
`;

export const UPDATE_FILE = gql`
  mutation updateFile($data: UpdateFileInput!) {
    updateFile(data: $data) {
      success
      message
    }
  }
`;

export const CREATE_FILE = gql`
  mutation createFile($data: CreateFileInput!) {
    createFile(data: $data) {
      id
      name
      type
      language
      extension
      content
      created_at
      update_at
    }
  }
`;