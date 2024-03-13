import { gql } from "@apollo/client";

export const REGISTER = gql`
  mutation Register($data: InputRegister!) {
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