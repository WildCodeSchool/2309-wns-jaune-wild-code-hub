import { gql } from "@apollo/client";

export const LOGIN = gql`
  query Login($infos: InputLogin!) {
    login(infos: $infos) {
      success
      message
    }
  }
`;

export const LOGOUT = gql`
  query Logout {
    logout {
      success
      message
    }
  }
`;