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

export const LOGIN = gql`
  mutation Login($infos: InputLogin!) {
    login(infos: $infos) {
      success
      message
    }
  }
`;