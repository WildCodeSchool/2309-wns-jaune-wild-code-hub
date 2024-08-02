import { gql } from "@apollo/client";

export const LOGOUT = gql`
  query Logout {
    logout {
      success
      message
    }
  }
`;