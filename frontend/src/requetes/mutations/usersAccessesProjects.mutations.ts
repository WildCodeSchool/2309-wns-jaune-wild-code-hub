import { gql } from "@apollo/client";

export const UPDATE_USERS_ACCESSES_PROJECTS = gql`
  mutation UpdateAccessProject($data: UpdateUserProjectAccessesInput!) {
    updateAccessProject(data: $data) {
      success
      message
    }
  }
`;