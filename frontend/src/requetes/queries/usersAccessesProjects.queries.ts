import { gql } from "@apollo/client";

export const LIST_USERS_ACCESSES_PROJECT = gql`
  query ListUsersAccessesProject($projectId: Float!) {
    listUsersAccessesProject(project_id: $projectId) {
      user {
        role
        pseudo
        id
        created_at
        update_at
      }
      project {
        category
        id
        name
        private
        created_at
        update_at
      }
      user_id
      project_id
      updated_at
      role
      created_at
    }
  }
`;
export const LIST_USERS_WITH_ACCESSES = gql`
  query ListUsersWithAccesses($projectId: Float!) {
    listUsersAccessesProject(project_id: $projectId) {
      user {
        pseudo
        id
      }
      role
    }
  }
`;
