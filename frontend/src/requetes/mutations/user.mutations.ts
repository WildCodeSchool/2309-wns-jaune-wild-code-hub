import { gql } from "@apollo/client";

export const UPDATE_USER = gql`
  mutation UpdateUser($data: UpdateUserInput!) {
    updateUser(data: $data) {
      success
      message
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($data: DeleteUserInput!) {
    deleteUser(data: $data) {
      message
      success
    }
  }
`;

export const ADD_LIKE_PROJECT = gql`
  mutation AddLikeProject($projectId: Float!) {
    addLikeProject(projectId: $projectId) {
      message
      success
    }
  }
`;

export const DELETE_LIKE_PROJECT = gql`
  mutation DeleteLikeProject($projectId: Float!) {
    deleteLikeProject(projectId: $projectId) {
      message
      success
    }
  }
`;
