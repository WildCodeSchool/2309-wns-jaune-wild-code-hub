import { gql } from "@apollo/client";


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

export const LIST_USERS_BY_PSEUDO = gql`
  query ListUsersByPseudo($pseudo: String!)  {
    listUsersByPseudo(pseudo: $pseudo) {
      pseudo
      id
      email
    }
  }
`;
