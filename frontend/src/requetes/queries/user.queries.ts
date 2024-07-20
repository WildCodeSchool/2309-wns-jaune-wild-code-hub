import { gql } from "@apollo/client";

export const FIND_USER_BY_ID = gql`
  query FindUserById($findUserByIdId: String!) {
    findUserById(id: $findUserByIdId) {
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
