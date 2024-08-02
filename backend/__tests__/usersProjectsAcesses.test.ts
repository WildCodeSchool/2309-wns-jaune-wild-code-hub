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
import { UsersProjectsAccesses, UserAccessProjectResponse, CreateUserProjectAccessesInput, FindAllInfoUserAccessesProject } from "../src/entities/usersProjectsAccesses.entity";
import { UserResolver } from "../src/resolvers/user.resolver";

const CREATE_USER = `#graphql
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

const UPDATE_USERS_ACCESSES_PROJECTS = `#graphql
mutation UsersProjectsAccesses ($data: UpdateUserProjectAccessesInput!) {
  updateAccessProject(data: $data) {            
    message
    success
  }
}
`;

const LIST_USERS_ACCESSES_PROJECT = `#graphql
  query UsersProjectsAccesses($projectId: Float!) {
    listUsersAccessesProject(project_id: $projectId) {            
      user_id
      project_id
      role
      created_at
      updated_at
    }
  }
`;

const LIST_PROJECTS_ACCESSES_USER = `#graphql
  query UsersProjectsAccesses($userId: Float!) {
    listProjectsAccessesUser(user_id: $userId) {            
      user_id
      project_id
      role
      created_at
      updated_at
    }
  }
`;

// Define Types

type ResponseDataListUsersAccessesProject = {
  listUsersAccessesProject: [FindAllInfoUserAccessesProject];
}

type ResponseDataListProjectsAccessesUser = {
  listProjectsAccessesUser: [FindAllInfoUserAccessesProject];
}


type ResponseDataCreateUser = {
  register: User;
}

type ResponseDataUpdateUserAccessesProject = {
  updateAccessProject: Message;
}

type ResponseDataCreate = {
  createProject: Project;
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
  // const entityMetadatas = datasource.entityMetadatas;
  // const entities = entityMetadatas.map(metadata => metadata.name);
});

afterAll(async () => {
  await datasource.dropDatabase();
});

describe("Test for a new user accesses project", () => {
  
  it("Create user - Test User accesses porject", async () => { 
    const response = await server.executeOperation<ResponseDataCreateUser>({
      query: CREATE_USER,   
      variables: {
        data:{
          lastname :"Toto",
          firstname : "Toto",
          pseudo : "Toto",
          email : "toto@gmail.com",
          password: "TOTOTOTO!a1",
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

  it("Create project - Test User accesses porject", async () => {
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
    assert(response.body.kind === "single");
    const id = response.body.singleResult.data?.createProject?.id;
    expect(id).not.toBeNull();
    expect(response.body.singleResult.data?.createProject?.name).toEqual("Project1");
  });

  it("Find list Users Accesses Project", async () => {
    const response = await server.executeOperation<ResponseDataListUsersAccessesProject>({
      query: LIST_USERS_ACCESSES_PROJECT,
      variables: {
        projectId: 1,
      },
    });

    assert(response.body.kind === "single");
    expect(response.body.singleResult.data?.listUsersAccessesProject[0].project_id).toEqual(1);
  });

  it("Find list Projects Accesses user", async () => {
    const response = await server.executeOperation<ResponseDataListProjectsAccessesUser>({
      query: LIST_PROJECTS_ACCESSES_USER,
      variables: {
        userId: 1,
      },
    });

    assert(response.body.kind === "single");
    expect(response.body.singleResult.data?.listProjectsAccessesUser[0].user_id).toEqual(1);
  });

  it("Update user access project - Update Editor : Test Update Project", async () => {
    const response = await server.executeOperation<ResponseDataUpdateUserAccessesProject>({
      query: UPDATE_USERS_ACCESSES_PROJECTS,
      variables: {
        data: {
          role: "EDITOR",
          project_id: 1,
          user_id: 1
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
    expect(response.body.singleResult.data?.updateAccessProject?.success).toEqual(true);
  });


  it("Update user access project - Update Owner : Test Delete Project", async () => {
    const response = await server.executeOperation<ResponseDataUpdateUserAccessesProject>({
      query: UPDATE_USERS_ACCESSES_PROJECTS,
      variables: {
        "data": {
          role: "OWNER",
          project_id: 1,
          user_id: 1
        },
      },
    },
    {
      contextValue : {
        user : {
          id : 1,
          role : "ADMIN"
        }
      }
    }
  );
    assert(response.body.kind === "single");
    expect(response.body.singleResult.data?.updateAccessProject?.success).toEqual(true);
  });
});