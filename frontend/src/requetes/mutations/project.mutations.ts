import { gql } from "@apollo/client";

export const UPDATE_PROJECT = gql`
  mutation updateProject($data:UpdateProjectInput!) {
    updateProject(data: $data) {
      success
      message
    }
  }
`;

export const DELETE_PROJECT = gql`
  mutation deleteProject($deleteProjectId: Float!) {
    deleteProject(id: $deleteProjectId) {
      success
      message
    }
  }
`;

export const CREATE_PROJECT = gql`
  mutation createProject($data:CreateProjectInput!) {
    createProject(data: $data) {
      category
      name
      id
      private
      created_at
      update_at
      files {
        id
        name
        language
        type
        extension
        content
        created_at
        update_at
      }
    }
  }
`;