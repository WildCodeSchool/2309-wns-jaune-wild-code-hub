import { buildSchema } from "type-graphql";
import { ApolloServer } from "@apollo/server";
import { ProjectResolver } from "../src/resolvers/project.resolver";
import { FileResolver } from "../src/resolvers/file.resolver";
import { Project } from "../src/entities/project.entity";
import { File } from "../src/entities/file.entity";
import { Message, User } from "../src/entities/user.entity";
import datasourceInitial from "../src/lib/db";
import datasource from "../src/lib/db_test";
import { EntityTarget, Repository } from "typeorm";
import assert from "assert";
import { UserProjectAccessesResolver } from "../src/resolvers/userProjectAccesses.resolver";
import { UsersProjectsAccesses, UserAccessProjectResponse, CreateUserProjectAccessesInput } from "../src/entities/userProjectAccesses.entity";
import { UserResolver } from "../src/resolvers/user.resolver";

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

// Define GraphQL Queries and Mutations
const LIST_PROJECTS = `#graphql
  query Projects {
    listProjects {            
      id
      name
    }
  }
`;

const FIND_PROJECT_BY_ID = `#graphql
  query Project ($id: String!) {
    findProjectById(id: $id) {            
      id
      name
      category
    }
  }
`;

const FIND_PROJECT_BY_NAME = `#graphql
  query Project ($name: String!) {
    findProjectByName(name: $name) {            
      id
      name
      category
    }
  }
`;

const LIST_PROJECTS_PUBLIC = `#graphql
  query Projects {
    listPublicProjects {            
      id
      name
      category
      private
    }
  }
`;

const LIST_PROJECTS_BY_CATEGORY = `#graphql
  query Projects ($category: String!) {
    listProjectsByCategory(category: $category) {            
      id
      name
      category
    }
  }
`;

const CREATE_PROJECT = `#graphql
  mutation Projects ($data: CreateProjectInput!) {
    createProject(data: $data) {
      id
      name
      private
      update_at
      created_at
      category
    }
  }
`;

const UPDATE_PROJECT = `#graphql
  mutation Project($data: UpdateProjectInput!) {
    updateProject(data: $data) {
      message
      success
    }
  }
`;

const DELETE_PROJECT = `#graphql
  mutation Project ($id: Float!) {
    deleteProject(id: $id) {            
      message
      success
    }
  }
`;

// Define Types

type ResponseDataCreateUser = {
  register: User;
}

type ResponseDataListProject = {
  listProjects: Project[];
}

type ResponseDataListProjectByCategory = {
  listProjectsByCategory: Project[];
}

type ResponseDataFindProjectById = {
  findProjectById: Project;
}

type ResponseDataFindProjectByName = {
  findProjectByName: Project;
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
  listPublicProjects: Project[];
}

let server: ApolloServer;

beforeAll(async () => {
  const baseSchema = await buildSchema({
    resolvers: [ProjectResolver, FileResolver, UserProjectAccessesResolver, UserResolver],
    authChecker: () => true,
  });

  server = new ApolloServer({
    schema: baseSchema,
  });

  jest.spyOn(datasourceInitial, 'getRepository').mockImplementation(
    (entity: EntityTarget<any>): Repository<any> => {
      if (entity === File) {
        return datasource.getRepository(File);
      } else if (entity === Project) {
        return datasource.getRepository(Project);
      } else if (entity === UsersProjectsAccesses) {
        return datasource.getRepository(UsersProjectsAccesses);
      } else if (entity === User) {
        return datasource.getRepository(User);
      } else {
        throw new Error(`Unexpected entity: ${entity}`);
      }
    }
  );

  await datasource.initialize();
  const entityMetadatas = datasource.entityMetadatas;
  const entities = entityMetadatas.map(metadata => metadata.name);
  console.log("Entities in the Data Source:", entities);
});

afterAll(async () => {
  await datasource.dropDatabase();
});

describe("Test for a new project", () => {
  
  it("Create user", async () => { 
    const response = await server.executeOperation<ResponseDataCreateUser>({
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
        data: {
          name: "Project1",
          category: "Javascript",
          private: false,
        },
      },
    }, 
    {
      contextValue : {
        user : {
          id : "1"
        }
      }
    }
  );
    console.log(JSON.stringify(response.body))
    assert(response.body.kind === "single");
    if (response.body.singleResult.errors) {
      console.error('Errors:', response.body.singleResult.errors);
    }
    const id = response.body.singleResult.data?.createProject?.id;
    expect(id).not.toBeNull();
    expect(response.body.singleResult.data?.createProject?.name).toEqual("Project1");
  });

  it("Find 1 project", async () => {
    const response = await server.executeOperation<ResponseDataListProject>({
      query: LIST_PROJECTS,
    });

    assert(response.body.kind === "single");
    expect(response.body.singleResult.data?.listProjects).toHaveLength(1);
  });

  it("Update project", async () => {
    const response = await server.executeOperation<ResponseDataUpdate>({
      query: UPDATE_PROJECT,
      variables: {
        data: {
          id: 1,
          name: "Project2",
          category: "Javascript",
          private: false,
        },
      },
    },
    {
      contextValue : {
        user : {
          id : 1
        }
      }
    }
  );

    assert(response.body.kind === "single");
    expect(response.body.singleResult.data?.updateProject?.success).toEqual(true);
  });

  it("Find projects after update", async () => {
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
        category: "Javascript",
      },
    });

    assert(response.body.kind === "single");
    expect(response.body.singleResult.data?.listProjectsByCategory).toHaveLength(1);
  });

  it("Find project by ID", async () => {
    const response = await server.executeOperation<ResponseDataFindProjectById>({
      query: FIND_PROJECT_BY_ID,
      variables: {
        id: "1",
      },
    });

    assert(response.body.kind === "single");
    expect(response.body.singleResult.data?.findProjectById?.name).toEqual("Project2");
  });

  it("Find project by Name", async () => {
    const response = await server.executeOperation<ResponseDataFindProjectByName>({
      query: FIND_PROJECT_BY_NAME,
      variables: {
        name: "Project2",
      },
    });

    assert(response.body.kind === "single");
    expect(response.body.singleResult.data?.findProjectByName?.name).toEqual("Project2");
  });

  it("Find public projects", async () => {
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
        id: 1,
      },
    },
    {
      contextValue : {
        user : {
          id : 1
        }
      }
    }
  );

    assert(response.body.kind === "single");
    expect(response.body.singleResult.data?.deleteProject?.success).toEqual(true);
  });
});