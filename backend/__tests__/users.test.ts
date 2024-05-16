import { buildSchema, buildSchemaSync } from "type-graphql";
import { UserResolver } from "../src/resolvers/user.resolver";
import { ApolloServer } from "@apollo/server";
import datasourceInitial from "../src/lib/db"; //on importe la datasource de test
import datasource from "../src/lib/db_test"; //on importe la datasource initial pour le spyOn
import { User, Message } from "../src/entities/user.entity";
import assert from "assert";

let server: ApolloServer;

//-------------- REQUETE APOLLO -----------------//
export const LIST_USERS = `#graphql
    query Users {
      listUsers {            
            id
            pseudo
        }
    }
`;

export const LIST_USERS_BY_ROLE = `#graphql
    query Users ($role: String!) {
      listUsersByRole(role: $role) {            
            id
            pseudo
            role
        }
    }
`;

export const FIND_USER_BY_ID = `#graphql
    query User ($id: String!) {
      findUserById(id: $id) {            
            id
            firstname
        }
    }
`;

export const FIND_USER_BY_EMAIL = `#graphql
    query User ($email: String!) {
      findUserByEmail(email: $email) {            
            id
            email
        }
    }
`;

export const FIND_USER_BY_PSEUDO = `#graphql
    query User ($pseudo: String!) {
      findUserByPseudo(pseudo: $pseudo) {            
            id
            pseudo
        }
    }
`;

export const CREATE_USER = `#graphql
    mutation Users($data: CreateUserInput!) {
      register(data: $data) {            
            id
            lastname
            firstname
            pseudo
            email
            password
            ban
            run_counter
        }
    }
`;

export const UPDATE_USER = `#graphql
  mutation User($data: UpdateUserInput!) {
    updateUser(data: $data) {
      message
      success
    }
  }
`

export const DELETE_USER = `#graphql
    mutation User ($id: Float!) {
      deleteUser(id: $id) {            
          message
          success
        }
    }
`;

//------------------- TYPAGE ---------------------//

  type ResponseDataListUser = {
    listUsers: User[]
  }

  type ResponseDataListUserByRole = {
    listUsersByRole: User[]
  }

  type ResponseDataFindUserById = {
    findUserById: User;
  }

  type ResponseDataFindUserByEmail = {
    findUserByEmail: User;
  }

  type ResponseDataFindUserByPseudo = {
    findUserByPseudo: User;
  }

  type ResponseDataCreate = {
    register: User;
  }

  type ResponseDataUpdate = {
    updateUser: Message;
  }

  type ResponseDataDelete = {
    deleteUser: Message;
  }

//-------------------- DATA ---------------------//


beforeAll(async () => {
  const baseSchema = await buildSchema({
    resolvers: [UserResolver],
    authChecker: () => true,
    
  });
  
  server = new ApolloServer({
    schema: baseSchema,
  });

  jest
    .spyOn(datasourceInitial, "getRepository")
    .mockReturnValue(datasource.getRepository(User));

  await datasource.initialize(); //initialisation de la datasource
  // await datasource.getRepository(User).clear(); //vidage de la table et non drop de la base de donnée complète
});

afterAll(async () => {
  await datasource.dropDatabase(); //suppression de la base de donnée
});

//-------------------- TESTS ---------------------//

describe("Test for a new user", () => {
  it("Find 0 users", async () => {
    const response = await server.executeOperation<ResponseDataListUser>({
      query: LIST_USERS,      
    });

    assert(response.body.kind === "single");
    expect(response.body.singleResult.data?.listUsers).toHaveLength(0);   
  });

  it("Create user", async () => { 
    const response = await server.executeOperation<ResponseDataCreate>({
      query: CREATE_USER,   
      variables: {
        data:{
          lastname :"Toto",
          firstname : "Toto",
          pseudo : "Toto",
          email : "toto@gmail.com",
          password: "toto",
          ban : false,
          role: "ADMIN",
          run_counter : 1
        }
      }   
    })

    assert(response.body.kind === "single");
    const id = response.body.singleResult.data?.register?.id;     
    expect(id).not.toBeNull();   
    expect(response.body.singleResult.data?.register?.firstname).toEqual("Toto");
  });

  it("Update user", async () => { 
    const response = await server.executeOperation<ResponseDataUpdate>({
      query: UPDATE_USER,   
      variables: {
        data:{
          id : 1,
          lastname :"tata",
          firstname : "Toto",
          pseudo : "tata",
          email : "tata@gmail.com",
          password: "tata",
          ban : false,
          run_counter : 1
        }
      }   
    });
    console.log("response.body UPDATE User", JSON.stringify(response.body));
    assert(response.body.kind === "single");  
    expect(response.body.singleResult.data?.updateUser?.success).toEqual(true);
  });

  it("Find users after creation of the user in the db", async () => {
    const response = await server.executeOperation<ResponseDataListUser>({
      query: LIST_USERS,    
    });
    assert(response.body.kind === "single");
    expect(response.body.singleResult.data?.listUsers).toHaveLength(1);
  });

  it("Find list users by role", async () => {
    const response = await server.executeOperation<ResponseDataListUserByRole>({
      query: LIST_USERS_BY_ROLE,
      variables: {
        role: "ADMIN"
      }     
    });

    assert(response.body.kind === "single");
    expect(response.body.singleResult.data?.listUsersByRole).toHaveLength(1);
  });

  it("Find user by ID", async () => {
    const response = await server.executeOperation<ResponseDataFindUserById>({
      query: FIND_USER_BY_ID,  
      variables: {
        id: "1"
      }  
    });
    assert(response.body.kind === "single");
    expect(response.body.singleResult.data?.findUserById?.firstname).toEqual("Toto");
    });

    it("Find user by Email", async () => {
      const response = await server.executeOperation<ResponseDataFindUserByEmail>({
        query: FIND_USER_BY_EMAIL,  
        variables: {
          email: "tata@gmail.com"
        }  
      });
      assert(response.body.kind === "single");
      expect(response.body.singleResult.data?.findUserByEmail?.email).toEqual("tata@gmail.com");
      });

      it("Find user by Pseudo", async () => {
        const response = await server.executeOperation<ResponseDataFindUserByPseudo>({
          query: FIND_USER_BY_PSEUDO,  
          variables: {
            pseudo: "tata"
          }  
        });
        assert(response.body.kind === "single");
        expect(response.body.singleResult.data?.findUserByPseudo?.pseudo).toEqual("tata");
        });

    it("Delete user", async () => { 
      const response = await server.executeOperation<ResponseDataDelete>({
        query: DELETE_USER,   
        variables: {
          id : 1
        }   
      });
      assert(response.body.kind === "single");
      expect(response.body.singleResult.data?.deleteUser?.success).toEqual(true);
    });
});
