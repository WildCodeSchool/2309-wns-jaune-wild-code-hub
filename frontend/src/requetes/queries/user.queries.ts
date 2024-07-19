import { gql } from "@apollo/client";



export const FIND_USER_BY_ID = gql`
  query FindUserById($findUserByIdId: String!) {
    findUserById(id: $findUserByIdId) {
      created_at
      email
      firstname
      lastname
      pseudo
      run_counter
    }
  }
`;
