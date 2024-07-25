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

export const CHECK_AUTH = gql`
  query CheckAuth {
    isAuthenticated
  }
`;

export const CHECK_RESET_TOKEN = gql`
  query CheckResetToken($token: String!) {
    checkResetToken(token: $token) {
      success
      message
    }
  }
`;
