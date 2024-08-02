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
        created_at
        update_at
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

export const LIST_PUBLIC_PROJECTS = gql`
  query ListPublicProjects($limit: Int!, $offset: Int!) {
    listPublicProjects(limit: $limit, offset: $offset) {
      projects {
        id
        name
        category
        private
        created_at
        update_at
      }
      total
      offset
      limit
      }
  }
`;
 
export const LIST_PUBLIC_PROJECTS_BY_NAME = gql`
  query listPublicProjectsByName($name: String!) {
    listPublicProjectsByName(name: $name) {
      id
      name      
    }
  }
`;

export const LIST_PUBLIC_PROJECTS_OWNED_BY_USER = gql`
  query ListPublicOwnedByUser($listPublicProjectsOwnedByUserId: String!) {
    listPublicProjectsOwnedByUser(id: $listPublicProjectsOwnedByUserId) {
      project {
        id
        name
        category
      }
    }
  }
`;

export const LIST_PROJECTS_PUBLIC_LIKE_BY_USER = gql`
  query ListProjectsPublicLikeByUser($userId: Float!) {
    listProjectsPublicLikeByUser(userID: $userId) {
      category
      name
      id
    }
  }
`;

