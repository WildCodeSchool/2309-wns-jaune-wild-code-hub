import { gql } from "@apollo/client";

export const UPDATE_USERS_ACCESSES_PROJECTS = gql`
  mutation UpdateAccessProject($data: UpdateUserProjectAccessesInput!) {
    updateAccessProject(data: $data) {
      success
      message
    }
  }
`;

export const DELETE_USERS_ACCESSES_PROJECTS = gql`
  mutation DeleteAccessProject($data: DeleteUserProjectAccessesInput!) {
    deleteAccessProject(data: $data) {
      success
      message
    }
  }
`;

export const CREATE_USERS_ACCESSES_PROJECTS = gql`
  mutation AddAccessProject($data: CreateUserProjectAccessesInput!) {
    addAccessProject(data: $data) {
      listUsersAccessesProjectData {
        role
        project_id
        user_id
        created_at
        updated_at
        user {
          pseudo
          email
          firstname
          lastname
          id
          password
          role
          ban
          run_counter
          last_login
          created_at
          update_at
        }
        project {
          id
          name
          private
          created_at
          category
          update_at
          files {
            id
            name
            type
            language
            extension
            content
            update_at
            created_at
          }
        }
      }
      message {
        success
        message
      }
    }
  }
`;