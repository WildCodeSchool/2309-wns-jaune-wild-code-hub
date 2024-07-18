import { gql } from "@apollo/client";

export const PROJECT_BY_ID = gql`
  query findProjectById($findProjectByIdId: String!) {
    findProjectById(id: $findProjectByIdId) {
        id
        name
        private
        update_at
        created_at
        category
        files {
          language
          extension
          name
          type
          id
          content
        }
    }
  }
`;