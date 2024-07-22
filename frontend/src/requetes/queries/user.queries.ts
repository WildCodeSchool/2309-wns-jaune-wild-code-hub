import { gql } from "@apollo/client";

export const FIND_USER_BY_ID = gql`
  query FindUserById($findUserByIdId: String!) {
    findUserById(id: $findUserByIdId) {
      id
      created_at
      email
      firstname
      lastname
      pseudo
      run_counter
    }
  }
`;

export const FIND_PROJECT_OWNER = gql`
  query FindProjectOwner($projectId: String!) {
    findProjectOwner(projectId: $projectId) {
      pseudo
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($data: UpdateUserInput!) {
    updateUser(data: $data) {
      success
      message
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($deleteUserId: Float!) {
    deleteUser(id: $deleteUserId) {
      message
      success
    }
  }
`;
