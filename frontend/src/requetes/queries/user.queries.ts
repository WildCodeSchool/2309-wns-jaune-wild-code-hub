import { gql } from "@apollo/client";


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
