import { gql } from "@apollo/client";

export const PROJECTS_BY_USER = gql`
  query ListProjectsByUser($listProjectsByUserId: String!) {
    listProjectsByUser(id: $listProjectsByUserId) {
      category
      created_at
      id
      name
      private
      update_at
    }
  }
`;

export const PROJECTS = gql`
  query ListProjects {
    listProjects {
      update_at
      private
      name
      id
      created_at
      category
    }
  }
`;
