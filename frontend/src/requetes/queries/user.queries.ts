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

export const FIND_USER_INFOS_BY_ID = gql`
  query FindUserInfosById($findUserByIdId: String!) {
    findUserById(id: $findUserByIdId) {
      id
      pseudo
      ban
      last_login
      firstname
      lastname
      email
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

export const LIST_USERS_BY_PSEUDO = gql`
  query ListUsersByPseudo($pseudo: String!) {
    listUsersByPseudo(pseudo: $pseudo) {
      pseudo
      id
      email
    }
  }
`;

export const LIST_USERS_LIKING_PROJECT = gql`
  query ListUsersLikesPerProject($projectId: Float!) {
    listUsersLikesPerProject(projectId: $projectId) {
      pseudo
      id
    }
  }
`;
