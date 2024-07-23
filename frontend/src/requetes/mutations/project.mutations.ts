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