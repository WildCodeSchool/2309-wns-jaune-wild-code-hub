import { gql } from "@apollo/client";

export const REGISTER = gql`
  mutation Register($data: CreateUserInput!) {
    register(data: $data) {
      pseudo
      run_counter
      role
      password
      lastname
      firstname
      email
      ban
    }
  }
`;

export const RESET_PASSWORD = gql`
  mutation ResetPassword($email: String!) {
    resetPassword(email: $email) {
      expirationDate
      id
      resetToken
    }
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation ChangePassword($data: InputChangePassword!) {
    changePassword(data: $data) {
      message
      success
    }
  }
`;
