import { buildSchema, buildSchemaSync } from "type-graphql";
import { UserResolver } from "../src/resolvers/user.resolver";
import { ApolloServer } from "@apollo/server";
import datasourceInitial from "../src/lib/db"; //on importe la datasource de test
import datasource from "../src/lib/db_test"; //on importe la datasource initial pour le spyOn
import { User } from "../src/entities/user.entity";
import assert from "assert";
import { isUUID } from "class-validator";

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

export const FIND_USER_BY_ID = `#graphql
    query User ($id: String!) {
      findUserById(id: $id) {            
            id
            firstname
        }
    }
`;
export const CREATE_USER = `#graphql
    mutation Users($data: CreateUserInput!) {
      createUser(data: $data) {            
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

//------------------- TYPAGE ---------------------//

  type ResponseData = {
    listUsers: User[]
  }
  type ResponseDataFindOneUser = {
    findUserById: User;
  }

  type ResponseDataCreate = {
    createUser: User;
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
    const response = await server.executeOperation<ResponseData>({
      query: LIST_USERS,      
    });
    // console.log("toto", JSON.stringify(response));
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
          run_counter : 1
        }
      }   
    });
    assert(response.body.kind === "single");
    const id = response.body.singleResult.data?.createUser?.id;     
    expect(id).not.toBeNull();   
    expect(response.body.singleResult.data?.createUser?.firstname).toEqual("Toto");
  });

  it("Find users after creation of the user in the db", async () => {
    const response = await server.executeOperation<ResponseData>({
      query: LIST_USERS,    
    });
    assert(response.body.kind === "single");
    expect(response.body.singleResult.data?.listUsers).toHaveLength(1);
  });

  it("Find user by ID", async () => {
    const response = await server.executeOperation<ResponseDataFindOneUser>({
      query: FIND_USER_BY_ID,  
      variables: {
        id: "1"
      }  
    });
    console.log("toto", JSON.stringify(response));
    assert(response.body.kind === "single");
    expect(response.body.singleResult.data?.findUserById?.firstname).toEqual("Toto");
    });


});
