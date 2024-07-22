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

export const PROJECTS__WITH_ROLE_BY_USER = gql`
  query ListProjectsByUserWithRole($userId: String!, $userRole: [String!]) {
    listProjectsByUserWithRole(id: $userId, userRole: $userRole) {
      project {
        update_at
        private
        name
        id
        created_at
        category
      }
      role
    }
  }
`;

export const COUNT_LIKE_PER_PROJECT = gql`
  query CountLikesPerProject($projectId: Float!) {
    countLikesPerProject(projectId: $projectId)
  }
`;

export const LIKED_PROJECTS = gql`
  query ListLikeProject($userId: String!) {
    listLikeProject(userId: $userId) {
      update_at
      private
      name
      id
      created_at
      category
    }
  }
`;

