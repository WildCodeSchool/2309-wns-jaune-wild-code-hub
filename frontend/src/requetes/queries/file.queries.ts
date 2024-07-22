import { gql } from "@apollo/client";

export const LIST_FILES_BY_PROJECT = gql`
  query ListFilesByProject($projectId: String!) {
    listFilesByProject(project_id: $projectId) {
        extension
        language
        name
        type
        id
        content
    }
  }
`;