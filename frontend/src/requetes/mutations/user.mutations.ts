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