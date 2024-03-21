import { buildSchema, buildSchemaSync } from "type-graphql";
import { ProjectResolver } from "../src/resolvers/project.resolver";
import { ApolloServer } from "@apollo/server";
import datasourceInitial from "../src/lib/db"; //on importe la datasource de test
import datasource from "../src/lib/db_test"; //on importe la datasource initial pour le spyOn
import { Project } from "../src/entities/project.entity";
import { Message } from "../src/entities/user.entity";
import assert from "assert";

let server: ApolloServer;

//------------------------------------ REQUETE APOLLO ---------------------------------------//
export const LIST_PROJECTS = `#graphql
    query Projects {
      listProjects {            
            id
            name
        }
    }
`;

export const FIND_PROJECT_BY_ID = `#graphql
    query Project ($id: String!) {
      findProjectById(id: $id) {            
            id
            name
            category
        }
    }
`;

export const FIND_PROJECT_BY_NAME = `#graphql
    query Project ($name: String!) {
      findProjectByName(name: $name) {            
            id
            name
            category
        }
    }
`;

export const LIST_PROJECTS_BY_CATEGORY = `#graphql
    query projects ($category: String!) {
      findUserByPseudo(category: $category) {            
            id
            name
            category
        }
    }
`;

export const CREATE_PROJECT = `#graphql
    mutation Projects($data: CreateProjectInput!) {
      register(data: $data) {            
            id
            name
            category
            private
            created_at
            update_at            
        }
    }
`;

export const UPDATE_PROJECT = `#graphql
  mutation Project($data: UpdateProjectInput!) {
    updateProject(data: $data) {
      message
      success
    }
  }
`

export const DELETE_PROJECT = `#graphql
    mutation  ($id: String!) {
      deleteProject(id: $id) {            
          message
          success
        }
    }
`;

//----------------------------------------- TYPAGE -------------------------------------------//

  type ResponseDataListProject = {
    listProjects: Project[]
  }

  type ResponseDataListProjectByCategory = {
    listProjectsByCategory: Project[]
  }

  type ResponseDataFindProjectById = {
    findProjectById: Project;
  }

  type ResponseDataFindProjectByName = {
    findProjectByName:Project;
  }

  type ResponseDataCreate = {
    createProject: Project;
  }

  type ResponseDataUpdate = {
    updateProject: Message;
  }

  type ResponseDataDelete = {
    deleteProject: Message;
  }

//------------------------------------------ DATA -------------------------------------------//


beforeAll(async () => {
  const baseSchema = await buildSchema({
    resolvers: [ProjectResolver],
    authChecker: () => true,
    
  });
  
  server = new ApolloServer({
    schema: baseSchema,
  });

  jest
    .spyOn(datasourceInitial, "getRepository")
    .mockReturnValue(datasource.getRepository(Project));

  await datasource.initialize(); //initialisation de la datasource
  // await datasource.getRepository(User).clear(); //vidage de la table et non drop de la base de donnée complète
});

afterAll(async () => {
  await datasource.dropDatabase(); //suppression de la base de donnée
});

//------------------------------------------ TESTS -------------------------------------------//

describe("Test for a new project", () => {
  it("Find 0 projects", async () => {
    const response = await server.executeOperation<ResponseDataListProject>({
      query: LIST_PROJECTS,      
    });

    assert(response.body.kind === "single");
    expect(response.body.singleResult.data?.listProjects).toHaveLength(0);   
  });

  it("Create project", async () => { 
    const response = await server.executeOperation<ResponseDataCreate>({
      query: CREATE_PROJECT,   
      variables: {
        data:{
          name :"Project1",
          category : "Javascript",
          private : false,
          created_at: '24-03-18 15:34:24',
          update_at : '24-03-18 16:34:24'
        }
      }   
    })

    assert(response.body.kind === "single");
    const id = response.body.singleResult.data?.createProject?.id;     
    expect(id).not.toBeNull();   
    expect(response.body.singleResult.data?.createProject?.name).toEqual("Project1");
  });

  it("Update project", async () => { 
    const response = await server.executeOperation<ResponseDataUpdate>({
      query: UPDATE_PROJECT,   
      variables: {
        data:{
          id : 1,
          name :"Project2",
          category : "Javascript",
          private : false,
          created_at: '24-03-18 15:34:24',
          update_at : '24-03-18 16:34:24'
        }
      }   
    });
    console.log("response.body UPDATE Project", JSON.stringify(response.body));
    assert(response.body.kind === "single");  
    expect(response.body.singleResult.data?.updateProject?.success).toEqual(true);
  });

  it("Find projects after creation of the project in the db", async () => {
    const response = await server.executeOperation<ResponseDataListProject>({
      query: LIST_PROJECTS,    
    });
    assert(response.body.kind === "single");
    expect(response.body.singleResult.data?.listProjects).toHaveLength(1);
  });

  it("Find list projects by category", async () => {
    const response = await server.executeOperation<ResponseDataListProjectByCategory>({
      query: LIST_PROJECTS_BY_CATEGORY,
      variables: {
        category: "Javascript"
      }     
    });

    assert(response.body.kind === "single");
    expect(response.body.singleResult.data?.listProjectsByCategory).toHaveLength(1);
  });

  it("Find project by ID", async () => {
    const response = await server.executeOperation<ResponseDataFindProjectById>({
      query: FIND_PROJECT_BY_ID,  
      variables: {
        id: "1"
      }  
    });
    assert(response.body.kind === "single");
    expect(response.body.singleResult.data?.findProjectById?.name).toEqual("Project2");
    });

    it("Find project by Name", async () => {
      const response = await server.executeOperation<ResponseDataFindProjectByName>({
        query: FIND_PROJECT_BY_NAME,  
        variables: {
          name: "Project2"
        }  
      });
      assert(response.body.kind === "single");
      expect(response.body.singleResult.data?.findProjectByName?.name).toEqual("Project2");
      });

     it("Delete project", async () => { 
      const response = await server.executeOperation<ResponseDataDelete>({
        query: DELETE_PROJECT,   
        variables: {
          id : 1
        }   
      });
      assert(response.body.kind === "single");
      expect(response.body.singleResult.data?.deleteProject?.success).toEqual(true);
    });
});
