import { buildSchema, buildSchemaSync } from "type-graphql";
import { ProjectResolver } from "../src/resolvers/project.resolver";
import { ApolloServer } from "@apollo/server";
import datasourceInitial from "../src/lib/db"; //on importe la datasource de test
import datasource from "../src/lib/db_test"; //on importe la datasource initial pour le spyOn
import { Project } from "../src/entities/project.entity";
import { Message } from "../src/entities/user.entity";
import assert from "assert";
import { FileResolver } from "../src/resolvers/file.resolver";
import { EntityTarget, Repository } from "typeorm";
import {File} from "../src/entities/file.entity"
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

export const LIST_PROJECTS_PUBLIC = `#graphql
  query Projects  {
    listPublicProjects {            
      id
      name
      category
      private
    }
  }
`;

export const LIST_PROJECTS_BY_CATEGORY = `#graphql
  query Projects ($category: String!) {
    listProjectsByCategory(category: $category) {            
      id
      name
      category
    }
  }
`;

export const CREATE_PROJECT = `#graphql
  mutation Projects ($data: CreateProjectInput!) {
    # createProject(data: $data) {            
    #   id
    #   name
    #   category
    #   private
    #   created_at
    #   update_at            
    # }
    createProject(data: $data) {
    id
    name
    private
    update_at
    # files {
    #   created_at
    #   extension
    #   id
    #   language
    #   name
    #   type
    #   update_at
    #   content
    # }
    created_at
    category
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
  mutation Project ($id: Float!) {
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

  type ResponseDataListProjectPublic = {
    listPublicProjects: Project[]
  }

//------------------------------------------ DATA -------------------------------------------//


beforeAll(async () => {
  const baseSchema = await buildSchema({
    resolvers: [ProjectResolver, FileResolver],
    authChecker: () => true,
    
  });
  
  server = new ApolloServer({
    schema: baseSchema,
  });

  jest.spyOn(datasourceInitial, 'getRepository').mockImplementation(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (entity: EntityTarget<any>): Repository<any> => {
        if (entity === File) {
            return datasource.getRepository(File)
        } else if (entity === Project) {
            return datasource.getRepository(Project)
        } else {
            throw new Error(`Unexpected entity: ${entity}`)
        }
    }
)
  await datasource.initialize(); //initialisation de la datasource
  // await datasource.getRepository(User).clear(); //vidage de la table et non drop de la base de donnée complète
  const entityMetadatas = datasource.entityMetadatas;
  const entities = entityMetadatas.map(metadata => metadata.name);

  console.log("Entities in the Data Source:", entities);
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

  it.only("Create project", async () => { 
    const response = await server.executeOperation<ResponseDataCreate>({
      query: CREATE_PROJECT,   
      variables: {
        data:{
          name :"Project1",
          category : "Javascript",
          private : false
        }
      }   
    })
    assert(response.body.kind === "single");
    if (response.body.singleResult.errors) {
      console.error('Errors:', response.body.singleResult.errors);
    }
    const id = response.body.singleResult.data?.createProject?.id;     
    expect(id).not.toBeNull(); 
    expect(response.body.singleResult.data?.createProject?.name).toEqual("Project1");
  });

  it("Find 1 projects", async () => {
    const response = await server.executeOperation<ResponseDataListProject>({
      query: LIST_PROJECTS,      
    });

    assert(response.body.kind === "single");
    console.log("find 1 projects", response.body.singleResult.data?.listProjects)
    // Avec la listes des files
    //    console.log find 1 projects [ [Object: null prototype] { id: '1', name: 'Project1' } ]
    // Sans la liste des files
    //    console.log find 1 projects [ [Object: null prototype] { id: '1', name: 'Project1' } ]
    expect(response.body.singleResult.data?.listProjects).toHaveLength(1);   
  });

  it("Update project", async () => { 
    const response = await server.executeOperation<ResponseDataUpdate>({
      query: UPDATE_PROJECT,   
      variables: {
        data:{
          id : 1,
          name :"Project2",
          category : "Javascript",
          private : false
        }
      }   
    });
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

  it("Find lists Projects  Public (one result)", async () => {
    const response = await server.executeOperation<ResponseDataListProjectPublic>({
      query: LIST_PROJECTS_PUBLIC,      
    });
    
    assert(response.body.kind === "single");
    expect(response.body.singleResult.data?.listPublicProjects).toHaveLength(1);   
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
