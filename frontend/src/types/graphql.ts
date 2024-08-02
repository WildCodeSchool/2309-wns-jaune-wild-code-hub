import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTimeISO: { input: any; output: any; }
};

export type CreateFileInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  extension: Scalars['String']['input'];
  language: Scalars['String']['input'];
  name: Scalars['String']['input'];
  project_id: Scalars['Float']['input'];
  type: Scalars['String']['input'];
};

export type CreateProjectInput = {
  category: Scalars['String']['input'];
  name: Scalars['String']['input'];
  private: Scalars['Boolean']['input'];
};

export type CreateUserInput = {
  ban: Scalars['Boolean']['input'];
  email: Scalars['String']['input'];
  firstname: Scalars['String']['input'];
  lastname: Scalars['String']['input'];
  password: Scalars['String']['input'];
  pseudo: Scalars['String']['input'];
  role?: InputMaybe<Scalars['String']['input']>;
  run_counter: Scalars['Float']['input'];
};

export type CreateUserProjectAccessesInput = {
  project_id: Scalars['Float']['input'];
  role?: InputMaybe<Scalars['String']['input']>;
  user_id: Scalars['Float']['input'];
};

export type DeleteUserInput = {
  id: Scalars['ID']['input'];
  password: Scalars['String']['input'];
};

export type DeleteUserProjectAccessesInput = {
  project_id: Scalars['Float']['input'];
  user_id: Scalars['Float']['input'];
};

export type File = {
  __typename?: 'File';
  content: Scalars['String']['output'];
  created_at: Scalars['DateTimeISO']['output'];
  extension: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  language: Scalars['String']['output'];
  name: Scalars['String']['output'];
  type: Scalars['String']['output'];
  update_at: Scalars['DateTimeISO']['output'];
};

export type FindAllInfoUserAccessesProject = {
  __typename?: 'FindAllInfoUserAccessesProject';
  created_at: Scalars['DateTimeISO']['output'];
  project?: Maybe<Project>;
  project_id: Scalars['Float']['output'];
  role: Scalars['String']['output'];
  updated_at: Scalars['DateTimeISO']['output'];
  user?: Maybe<User>;
  user_id: Scalars['Float']['output'];
};

export type InputLogin = {
  email?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  pseudo?: InputMaybe<Scalars['String']['input']>;
};

export type Message = {
  __typename?: 'Message';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addAccessProject: UserAccessProjectResponse;
  addLikeProject: Message;
  createFile: File;
  createProject: Project;
  deleteAccessProject: Message;
  deleteFile: Message;
  deleteLikeProject: Message;
  deleteProject: Message;
  deleteUser: Message;
  login: Message;
  register: User;
  updateAccessProject: Message;
  updateFile: Message;
  updateMultipleFiles: Array<Message>;
  updateProject: Message;
  updateUser: Message;
};


export type MutationAddAccessProjectArgs = {
  data: CreateUserProjectAccessesInput;
};


export type MutationAddLikeProjectArgs = {
  projectId: Scalars['Float']['input'];
};


export type MutationCreateFileArgs = {
  data: CreateFileInput;
};


export type MutationCreateProjectArgs = {
  data: CreateProjectInput;
};


export type MutationDeleteAccessProjectArgs = {
  data: DeleteUserProjectAccessesInput;
};


export type MutationDeleteFileArgs = {
  id: Scalars['Float']['input'];
};


export type MutationDeleteLikeProjectArgs = {
  projectId: Scalars['Float']['input'];
};


export type MutationDeleteProjectArgs = {
  id: Scalars['Float']['input'];
};


export type MutationDeleteUserArgs = {
  data: DeleteUserInput;
};


export type MutationLoginArgs = {
  infos: InputLogin;
};


export type MutationRegisterArgs = {
  data: CreateUserInput;
};


export type MutationUpdateAccessProjectArgs = {
  data: UpdateUserProjectAccessesInput;
};


export type MutationUpdateFileArgs = {
  data: UpdateFileInput;
};


export type MutationUpdateMultipleFilesArgs = {
  data: Array<UpdateFileInput>;
};


export type MutationUpdateProjectArgs = {
  data: UpdateProjectInput;
};


export type MutationUpdateUserArgs = {
  data: UpdateUserInput;
};

export type PaginatedProjects = {
  __typename?: 'PaginatedProjects';
  limit: Scalars['Float']['output'];
  offset: Scalars['Float']['output'];
  projects: Array<Project>;
  total: Scalars['Float']['output'];
};

export type Project = {
  __typename?: 'Project';
  category: Scalars['String']['output'];
  created_at: Scalars['DateTimeISO']['output'];
  files: Array<File>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  private: Scalars['Boolean']['output'];
  update_at: Scalars['DateTimeISO']['output'];
};

export type Query = {
  __typename?: 'Query';
  countLikesPerProject: Scalars['Int']['output'];
  findFileById: File;
  findProjectById: Project;
  findProjectByName: Project;
  findProjectOwner: User;
  findUserByEmail: User;
  findUserById: User;
  findUserByPseudo: User;
  listAccesProject: Array<Project>;
  listFilesByProject: Array<File>;
  listLikeProject: Array<Project>;
  listProjects: Array<Project>;
  listProjectsAccessesUser: Array<FindAllInfoUserAccessesProject>;
  listProjectsByCategory: Array<Project>;
  listProjectsByUser: Array<Project>;
  listProjectsByUserWithRole: Array<UserAccessProjectOutput>;
  listProjectsPublicLikeByUser: Array<Project>;
  listPublicProjects: PaginatedProjects;
  listPublicProjectsByName: Array<Project>;
  listPublicProjectsOwnedByUser: Array<UserAccessProjectOutput>;
  listUsers: Array<User>;
  listUsersAccessesProject: Array<FindAllInfoUserAccessesProject>;
  listUsersByPseudo: Array<User>;
  listUsersByRole: Array<User>;
  listUsersLikesPerProject: Array<User>;
  logout: Message;
};


export type QueryCountLikesPerProjectArgs = {
  projectId: Scalars['Float']['input'];
};


export type QueryFindFileByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryFindProjectByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryFindProjectByNameArgs = {
  name: Scalars['String']['input'];
};


export type QueryFindProjectOwnerArgs = {
  projectId: Scalars['String']['input'];
};


export type QueryFindUserByEmailArgs = {
  email: Scalars['String']['input'];
};


export type QueryFindUserByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryFindUserByPseudoArgs = {
  pseudo: Scalars['String']['input'];
};


export type QueryListAccesProjectArgs = {
  userId: Scalars['Float']['input'];
};


export type QueryListFilesByProjectArgs = {
  project_id: Scalars['String']['input'];
};


export type QueryListLikeProjectArgs = {
  userId: Scalars['String']['input'];
};


export type QueryListProjectsAccessesUserArgs = {
  user_id: Scalars['Float']['input'];
};


export type QueryListProjectsByCategoryArgs = {
  category: Scalars['String']['input'];
};


export type QueryListProjectsByUserArgs = {
  id: Scalars['String']['input'];
};


export type QueryListProjectsByUserWithRoleArgs = {
  id: Scalars['String']['input'];
  userRole?: InputMaybe<Array<Scalars['String']['input']>>;
};


export type QueryListProjectsPublicLikeByUserArgs = {
  userID: Scalars['Float']['input'];
};


export type QueryListPublicProjectsArgs = {
  limit?: Scalars['Int']['input'];
  offset?: Scalars['Int']['input'];
};


export type QueryListPublicProjectsByNameArgs = {
  name: Scalars['String']['input'];
};


export type QueryListPublicProjectsOwnedByUserArgs = {
  id: Scalars['String']['input'];
};


export type QueryListUsersAccessesProjectArgs = {
  project_id: Scalars['Float']['input'];
};


export type QueryListUsersByPseudoArgs = {
  pseudo: Scalars['String']['input'];
};


export type QueryListUsersByRoleArgs = {
  role: Scalars['String']['input'];
};


export type QueryListUsersLikesPerProjectArgs = {
  projectId: Scalars['Float']['input'];
};

export type UpdateFileInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  extension: Scalars['String']['input'];
  id: Scalars['Float']['input'];
  language: Scalars['String']['input'];
  name: Scalars['String']['input'];
  type: Scalars['String']['input'];
};

export type UpdateProjectInput = {
  category?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  private?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UpdateUserInput = {
  ban?: InputMaybe<Scalars['Boolean']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstname?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  lastname?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  pseudo?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
  run_counter?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateUserProjectAccessesInput = {
  project_id: Scalars['Float']['input'];
  role?: InputMaybe<Scalars['String']['input']>;
  user_id: Scalars['Float']['input'];
};

export type User = {
  __typename?: 'User';
  ban: Scalars['Boolean']['output'];
  created_at: Scalars['DateTimeISO']['output'];
  email: Scalars['String']['output'];
  firstname: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  last_login: Scalars['DateTimeISO']['output'];
  lastname: Scalars['String']['output'];
  password: Scalars['String']['output'];
  pseudo: Scalars['String']['output'];
  role: Scalars['String']['output'];
  run_counter: Scalars['Float']['output'];
  update_at: Scalars['DateTimeISO']['output'];
};

export type UserAccessProjectOutput = {
  __typename?: 'UserAccessProjectOutput';
  project: Project;
  role: Scalars['String']['output'];
};

export type UserAccessProjectResponse = {
  __typename?: 'UserAccessProjectResponse';
  listUsersAccessesProjectData: Array<FindAllInfoUserAccessesProject>;
  message?: Maybe<Message>;
};

export type RegisterMutationVariables = Exact<{
  data: CreateUserInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'User', pseudo: string, run_counter: number, role: string, password: string, lastname: string, firstname: string, email: string, ban: boolean } };

export type LoginMutationVariables = Exact<{
  infos: InputLogin;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'Message', success: boolean, message: string } };

export type UpdateMultipleFilesMutationVariables = Exact<{
  data: Array<UpdateFileInput> | UpdateFileInput;
}>;


export type UpdateMultipleFilesMutation = { __typename?: 'Mutation', updateMultipleFiles: Array<{ __typename?: 'Message', success: boolean, message: string }> };

export type DeleteFileMutationVariables = Exact<{
  deleteFileId: Scalars['Float']['input'];
}>;


export type DeleteFileMutation = { __typename?: 'Mutation', deleteFile: { __typename?: 'Message', success: boolean, message: string } };

export type UpdateFileMutationVariables = Exact<{
  data: UpdateFileInput;
}>;


export type UpdateFileMutation = { __typename?: 'Mutation', updateFile: { __typename?: 'Message', success: boolean, message: string } };

export type CreateFileMutationVariables = Exact<{
  data: CreateFileInput;
}>;


export type CreateFileMutation = { __typename?: 'Mutation', createFile: { __typename?: 'File', id: string, name: string, type: string, language: string, extension: string, content: string, created_at: any, update_at: any } };

export type UpdateProjectMutationVariables = Exact<{
  data: UpdateProjectInput;
}>;


export type UpdateProjectMutation = { __typename?: 'Mutation', updateProject: { __typename?: 'Message', success: boolean, message: string } };

export type DeleteProjectMutationVariables = Exact<{
  deleteProjectId: Scalars['Float']['input'];
}>;


export type DeleteProjectMutation = { __typename?: 'Mutation', deleteProject: { __typename?: 'Message', success: boolean, message: string } };

export type CreateProjectMutationVariables = Exact<{
  data: CreateProjectInput;
}>;


export type CreateProjectMutation = { __typename?: 'Mutation', createProject: { __typename?: 'Project', category: string, name: string, id: string, private: boolean, created_at: any, update_at: any, files: Array<{ __typename?: 'File', id: string, name: string, language: string, type: string, extension: string, content: string, created_at: any, update_at: any }> } };

export type UpdateUserMutationVariables = Exact<{
  data: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'Message', success: boolean, message: string } };

export type DeleteUserMutationVariables = Exact<{
  data: DeleteUserInput;
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser: { __typename?: 'Message', message: string, success: boolean } };

export type AddLikeProjectMutationVariables = Exact<{
  projectId: Scalars['Float']['input'];
}>;


export type AddLikeProjectMutation = { __typename?: 'Mutation', addLikeProject: { __typename?: 'Message', message: string, success: boolean } };

export type DeleteLikeProjectMutationVariables = Exact<{
  projectId: Scalars['Float']['input'];
}>;


export type DeleteLikeProjectMutation = { __typename?: 'Mutation', deleteLikeProject: { __typename?: 'Message', message: string, success: boolean } };

export type UpdateAccessProjectMutationVariables = Exact<{
  data: UpdateUserProjectAccessesInput;
}>;


export type UpdateAccessProjectMutation = { __typename?: 'Mutation', updateAccessProject: { __typename?: 'Message', success: boolean, message: string } };

export type DeleteAccessProjectMutationVariables = Exact<{
  data: DeleteUserProjectAccessesInput;
}>;


export type DeleteAccessProjectMutation = { __typename?: 'Mutation', deleteAccessProject: { __typename?: 'Message', success: boolean, message: string } };

export type AddAccessProjectMutationVariables = Exact<{
  data: CreateUserProjectAccessesInput;
}>;


export type AddAccessProjectMutation = { __typename?: 'Mutation', addAccessProject: { __typename?: 'UserAccessProjectResponse', listUsersAccessesProjectData: Array<{ __typename?: 'FindAllInfoUserAccessesProject', role: string, project_id: number, user_id: number, created_at: any, updated_at: any, user?: { __typename?: 'User', pseudo: string, email: string, firstname: string, lastname: string, id: string, password: string, role: string, ban: boolean, run_counter: number, last_login: any, created_at: any, update_at: any } | null, project?: { __typename?: 'Project', id: string, name: string, private: boolean, created_at: any, category: string, update_at: any, files: Array<{ __typename?: 'File', id: string, name: string, type: string, language: string, extension: string, content: string, update_at: any, created_at: any }> } | null }>, message?: { __typename?: 'Message', success: boolean, message: string } | null } };

export type LogoutQueryVariables = Exact<{ [key: string]: never; }>;


export type LogoutQuery = { __typename?: 'Query', logout: { __typename?: 'Message', success: boolean, message: string } };

export type ListFilesByProjectQueryVariables = Exact<{
  projectId: Scalars['String']['input'];
}>;


export type ListFilesByProjectQuery = { __typename?: 'Query', listFilesByProject: Array<{ __typename?: 'File', extension: string, language: string, name: string, type: string, id: string, content: string }> };

export type FindProjectByIdQueryVariables = Exact<{
  findProjectByIdId: Scalars['String']['input'];
}>;


export type FindProjectByIdQuery = { __typename?: 'Query', findProjectById: { __typename?: 'Project', id: string, name: string, private: boolean, update_at: any, created_at: any, category: string, files: Array<{ __typename?: 'File', language: string, extension: string, name: string, type: string, id: string, content: string, created_at: any, update_at: any }> } };

export type ListProjectsByUserQueryVariables = Exact<{
  listProjectsByUserId: Scalars['String']['input'];
}>;


export type ListProjectsByUserQuery = { __typename?: 'Query', listProjectsByUser: Array<{ __typename?: 'Project', category: string, created_at: any, id: string, name: string, private: boolean, update_at: any }> };

export type ListProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type ListProjectsQuery = { __typename?: 'Query', listProjects: Array<{ __typename?: 'Project', update_at: any, private: boolean, name: string, id: string, created_at: any, category: string }> };

export type ListProjectsByUserWithRoleQueryVariables = Exact<{
  userId: Scalars['String']['input'];
  userRole?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
}>;


export type ListProjectsByUserWithRoleQuery = { __typename?: 'Query', listProjectsByUserWithRole: Array<{ __typename?: 'UserAccessProjectOutput', role: string, project: { __typename?: 'Project', update_at: any, private: boolean, name: string, id: string, created_at: any, category: string } }> };

export type CountLikesPerProjectQueryVariables = Exact<{
  projectId: Scalars['Float']['input'];
}>;


export type CountLikesPerProjectQuery = { __typename?: 'Query', countLikesPerProject: number };

export type ListLikeProjectQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type ListLikeProjectQuery = { __typename?: 'Query', listLikeProject: Array<{ __typename?: 'Project', update_at: any, private: boolean, name: string, id: string, created_at: any, category: string }> };

export type ListPublicProjectsQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
}>;


export type ListPublicProjectsQuery = { __typename?: 'Query', listPublicProjects: { __typename?: 'PaginatedProjects', total: number, offset: number, limit: number, projects: Array<{ __typename?: 'Project', id: string, name: string, category: string, private: boolean, created_at: any, update_at: any }> } };

export type ListPublicProjectsByNameQueryVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type ListPublicProjectsByNameQuery = { __typename?: 'Query', listPublicProjectsByName: Array<{ __typename?: 'Project', id: string, name: string }> };

export type ListPublicOwnedByUserQueryVariables = Exact<{
  listPublicProjectsOwnedByUserId: Scalars['String']['input'];
}>;


export type ListPublicOwnedByUserQuery = { __typename?: 'Query', listPublicProjectsOwnedByUser: Array<{ __typename?: 'UserAccessProjectOutput', project: { __typename?: 'Project', id: string, name: string, category: string } }> };

export type ListProjectsPublicLikeByUserQueryVariables = Exact<{
  userId: Scalars['Float']['input'];
}>;


export type ListProjectsPublicLikeByUserQuery = { __typename?: 'Query', listProjectsPublicLikeByUser: Array<{ __typename?: 'Project', category: string, name: string, id: string }> };

export type FindUserByIdQueryVariables = Exact<{
  findUserByIdId: Scalars['String']['input'];
}>;


export type FindUserByIdQuery = { __typename?: 'Query', findUserById: { __typename?: 'User', id: string, created_at: any, email: string, firstname: string, lastname: string, pseudo: string, run_counter: number } };

export type FindUserInfosByIdQueryVariables = Exact<{
  findUserByIdId: Scalars['String']['input'];
}>;


export type FindUserInfosByIdQuery = { __typename?: 'Query', findUserById: { __typename?: 'User', id: string, pseudo: string, ban: boolean, last_login: any, firstname: string, lastname: string, email: string } };

export type FindProjectOwnerQueryVariables = Exact<{
  projectId: Scalars['String']['input'];
}>;


export type FindProjectOwnerQuery = { __typename?: 'Query', findProjectOwner: { __typename?: 'User', pseudo: string } };

export type ListUsersByPseudoQueryVariables = Exact<{
  pseudo: Scalars['String']['input'];
}>;


export type ListUsersByPseudoQuery = { __typename?: 'Query', listUsersByPseudo: Array<{ __typename?: 'User', pseudo: string, id: string, email: string }> };

export type ListUsersLikesPerProjectQueryVariables = Exact<{
  projectId: Scalars['Float']['input'];
}>;


export type ListUsersLikesPerProjectQuery = { __typename?: 'Query', listUsersLikesPerProject: Array<{ __typename?: 'User', pseudo: string, id: string }> };

export type ListUsersAccessesProjectQueryVariables = Exact<{
  projectId: Scalars['Float']['input'];
}>;


export type ListUsersAccessesProjectQuery = { __typename?: 'Query', listUsersAccessesProject: Array<{ __typename?: 'FindAllInfoUserAccessesProject', user_id: number, project_id: number, updated_at: any, role: string, created_at: any, user?: { __typename?: 'User', role: string, pseudo: string, id: string, created_at: any, update_at: any } | null, project?: { __typename?: 'Project', category: string, id: string, name: string, private: boolean, created_at: any, update_at: any } | null }> };

export type ListUsersWithAccessesQueryVariables = Exact<{
  projectId: Scalars['Float']['input'];
}>;


export type ListUsersWithAccessesQuery = { __typename?: 'Query', listUsersAccessesProject: Array<{ __typename?: 'FindAllInfoUserAccessesProject', role: string, user?: { __typename?: 'User', pseudo: string, id: string } | null }> };


export const RegisterDocument = gql`
    mutation Register($data: CreateUserInput!) {
  register(data: $data) {
    pseudo
    run_counter
    role
    password
    lastname
    firstname
    email
    ban
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const LoginDocument = gql`
    mutation Login($infos: InputLogin!) {
  login(infos: $infos) {
    success
    message
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      infos: // value for 'infos'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const UpdateMultipleFilesDocument = gql`
    mutation updateMultipleFiles($data: [UpdateFileInput!]!) {
  updateMultipleFiles(data: $data) {
    success
    message
  }
}
    `;
export type UpdateMultipleFilesMutationFn = Apollo.MutationFunction<UpdateMultipleFilesMutation, UpdateMultipleFilesMutationVariables>;

/**
 * __useUpdateMultipleFilesMutation__
 *
 * To run a mutation, you first call `useUpdateMultipleFilesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMultipleFilesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMultipleFilesMutation, { data, loading, error }] = useUpdateMultipleFilesMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateMultipleFilesMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMultipleFilesMutation, UpdateMultipleFilesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMultipleFilesMutation, UpdateMultipleFilesMutationVariables>(UpdateMultipleFilesDocument, options);
      }
export type UpdateMultipleFilesMutationHookResult = ReturnType<typeof useUpdateMultipleFilesMutation>;
export type UpdateMultipleFilesMutationResult = Apollo.MutationResult<UpdateMultipleFilesMutation>;
export type UpdateMultipleFilesMutationOptions = Apollo.BaseMutationOptions<UpdateMultipleFilesMutation, UpdateMultipleFilesMutationVariables>;
export const DeleteFileDocument = gql`
    mutation deleteFile($deleteFileId: Float!) {
  deleteFile(id: $deleteFileId) {
    success
    message
  }
}
    `;
export type DeleteFileMutationFn = Apollo.MutationFunction<DeleteFileMutation, DeleteFileMutationVariables>;

/**
 * __useDeleteFileMutation__
 *
 * To run a mutation, you first call `useDeleteFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteFileMutation, { data, loading, error }] = useDeleteFileMutation({
 *   variables: {
 *      deleteFileId: // value for 'deleteFileId'
 *   },
 * });
 */
export function useDeleteFileMutation(baseOptions?: Apollo.MutationHookOptions<DeleteFileMutation, DeleteFileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteFileMutation, DeleteFileMutationVariables>(DeleteFileDocument, options);
      }
export type DeleteFileMutationHookResult = ReturnType<typeof useDeleteFileMutation>;
export type DeleteFileMutationResult = Apollo.MutationResult<DeleteFileMutation>;
export type DeleteFileMutationOptions = Apollo.BaseMutationOptions<DeleteFileMutation, DeleteFileMutationVariables>;
export const UpdateFileDocument = gql`
    mutation updateFile($data: UpdateFileInput!) {
  updateFile(data: $data) {
    success
    message
  }
}
    `;
export type UpdateFileMutationFn = Apollo.MutationFunction<UpdateFileMutation, UpdateFileMutationVariables>;

/**
 * __useUpdateFileMutation__
 *
 * To run a mutation, you first call `useUpdateFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateFileMutation, { data, loading, error }] = useUpdateFileMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateFileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateFileMutation, UpdateFileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateFileMutation, UpdateFileMutationVariables>(UpdateFileDocument, options);
      }
export type UpdateFileMutationHookResult = ReturnType<typeof useUpdateFileMutation>;
export type UpdateFileMutationResult = Apollo.MutationResult<UpdateFileMutation>;
export type UpdateFileMutationOptions = Apollo.BaseMutationOptions<UpdateFileMutation, UpdateFileMutationVariables>;
export const CreateFileDocument = gql`
    mutation createFile($data: CreateFileInput!) {
  createFile(data: $data) {
    id
    name
    type
    language
    extension
    content
    created_at
    update_at
  }
}
    `;
export type CreateFileMutationFn = Apollo.MutationFunction<CreateFileMutation, CreateFileMutationVariables>;

/**
 * __useCreateFileMutation__
 *
 * To run a mutation, you first call `useCreateFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFileMutation, { data, loading, error }] = useCreateFileMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateFileMutation(baseOptions?: Apollo.MutationHookOptions<CreateFileMutation, CreateFileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateFileMutation, CreateFileMutationVariables>(CreateFileDocument, options);
      }
export type CreateFileMutationHookResult = ReturnType<typeof useCreateFileMutation>;
export type CreateFileMutationResult = Apollo.MutationResult<CreateFileMutation>;
export type CreateFileMutationOptions = Apollo.BaseMutationOptions<CreateFileMutation, CreateFileMutationVariables>;
export const UpdateProjectDocument = gql`
    mutation updateProject($data: UpdateProjectInput!) {
  updateProject(data: $data) {
    success
    message
  }
}
    `;
export type UpdateProjectMutationFn = Apollo.MutationFunction<UpdateProjectMutation, UpdateProjectMutationVariables>;

/**
 * __useUpdateProjectMutation__
 *
 * To run a mutation, you first call `useUpdateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProjectMutation, { data, loading, error }] = useUpdateProjectMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateProjectMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProjectMutation, UpdateProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProjectMutation, UpdateProjectMutationVariables>(UpdateProjectDocument, options);
      }
export type UpdateProjectMutationHookResult = ReturnType<typeof useUpdateProjectMutation>;
export type UpdateProjectMutationResult = Apollo.MutationResult<UpdateProjectMutation>;
export type UpdateProjectMutationOptions = Apollo.BaseMutationOptions<UpdateProjectMutation, UpdateProjectMutationVariables>;
export const DeleteProjectDocument = gql`
    mutation deleteProject($deleteProjectId: Float!) {
  deleteProject(id: $deleteProjectId) {
    success
    message
  }
}
    `;
export type DeleteProjectMutationFn = Apollo.MutationFunction<DeleteProjectMutation, DeleteProjectMutationVariables>;

/**
 * __useDeleteProjectMutation__
 *
 * To run a mutation, you first call `useDeleteProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProjectMutation, { data, loading, error }] = useDeleteProjectMutation({
 *   variables: {
 *      deleteProjectId: // value for 'deleteProjectId'
 *   },
 * });
 */
export function useDeleteProjectMutation(baseOptions?: Apollo.MutationHookOptions<DeleteProjectMutation, DeleteProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteProjectMutation, DeleteProjectMutationVariables>(DeleteProjectDocument, options);
      }
export type DeleteProjectMutationHookResult = ReturnType<typeof useDeleteProjectMutation>;
export type DeleteProjectMutationResult = Apollo.MutationResult<DeleteProjectMutation>;
export type DeleteProjectMutationOptions = Apollo.BaseMutationOptions<DeleteProjectMutation, DeleteProjectMutationVariables>;
export const CreateProjectDocument = gql`
    mutation createProject($data: CreateProjectInput!) {
  createProject(data: $data) {
    category
    name
    id
    private
    created_at
    update_at
    files {
      id
      name
      language
      type
      extension
      content
      created_at
      update_at
    }
  }
}
    `;
export type CreateProjectMutationFn = Apollo.MutationFunction<CreateProjectMutation, CreateProjectMutationVariables>;

/**
 * __useCreateProjectMutation__
 *
 * To run a mutation, you first call `useCreateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProjectMutation, { data, loading, error }] = useCreateProjectMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateProjectMutation(baseOptions?: Apollo.MutationHookOptions<CreateProjectMutation, CreateProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProjectMutation, CreateProjectMutationVariables>(CreateProjectDocument, options);
      }
export type CreateProjectMutationHookResult = ReturnType<typeof useCreateProjectMutation>;
export type CreateProjectMutationResult = Apollo.MutationResult<CreateProjectMutation>;
export type CreateProjectMutationOptions = Apollo.BaseMutationOptions<CreateProjectMutation, CreateProjectMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($data: UpdateUserInput!) {
  updateUser(data: $data) {
    success
    message
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const DeleteUserDocument = gql`
    mutation DeleteUser($data: DeleteUserInput!) {
  deleteUser(data: $data) {
    message
    success
  }
}
    `;
export type DeleteUserMutationFn = Apollo.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useDeleteUserMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, options);
      }
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = Apollo.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>;
export const AddLikeProjectDocument = gql`
    mutation AddLikeProject($projectId: Float!) {
  addLikeProject(projectId: $projectId) {
    message
    success
  }
}
    `;
export type AddLikeProjectMutationFn = Apollo.MutationFunction<AddLikeProjectMutation, AddLikeProjectMutationVariables>;

/**
 * __useAddLikeProjectMutation__
 *
 * To run a mutation, you first call `useAddLikeProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddLikeProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addLikeProjectMutation, { data, loading, error }] = useAddLikeProjectMutation({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useAddLikeProjectMutation(baseOptions?: Apollo.MutationHookOptions<AddLikeProjectMutation, AddLikeProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddLikeProjectMutation, AddLikeProjectMutationVariables>(AddLikeProjectDocument, options);
      }
export type AddLikeProjectMutationHookResult = ReturnType<typeof useAddLikeProjectMutation>;
export type AddLikeProjectMutationResult = Apollo.MutationResult<AddLikeProjectMutation>;
export type AddLikeProjectMutationOptions = Apollo.BaseMutationOptions<AddLikeProjectMutation, AddLikeProjectMutationVariables>;
export const DeleteLikeProjectDocument = gql`
    mutation DeleteLikeProject($projectId: Float!) {
  deleteLikeProject(projectId: $projectId) {
    message
    success
  }
}
    `;
export type DeleteLikeProjectMutationFn = Apollo.MutationFunction<DeleteLikeProjectMutation, DeleteLikeProjectMutationVariables>;

/**
 * __useDeleteLikeProjectMutation__
 *
 * To run a mutation, you first call `useDeleteLikeProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteLikeProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteLikeProjectMutation, { data, loading, error }] = useDeleteLikeProjectMutation({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useDeleteLikeProjectMutation(baseOptions?: Apollo.MutationHookOptions<DeleteLikeProjectMutation, DeleteLikeProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteLikeProjectMutation, DeleteLikeProjectMutationVariables>(DeleteLikeProjectDocument, options);
      }
export type DeleteLikeProjectMutationHookResult = ReturnType<typeof useDeleteLikeProjectMutation>;
export type DeleteLikeProjectMutationResult = Apollo.MutationResult<DeleteLikeProjectMutation>;
export type DeleteLikeProjectMutationOptions = Apollo.BaseMutationOptions<DeleteLikeProjectMutation, DeleteLikeProjectMutationVariables>;
export const UpdateAccessProjectDocument = gql`
    mutation UpdateAccessProject($data: UpdateUserProjectAccessesInput!) {
  updateAccessProject(data: $data) {
    success
    message
  }
}
    `;
export type UpdateAccessProjectMutationFn = Apollo.MutationFunction<UpdateAccessProjectMutation, UpdateAccessProjectMutationVariables>;

/**
 * __useUpdateAccessProjectMutation__
 *
 * To run a mutation, you first call `useUpdateAccessProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAccessProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAccessProjectMutation, { data, loading, error }] = useUpdateAccessProjectMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateAccessProjectMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAccessProjectMutation, UpdateAccessProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAccessProjectMutation, UpdateAccessProjectMutationVariables>(UpdateAccessProjectDocument, options);
      }
export type UpdateAccessProjectMutationHookResult = ReturnType<typeof useUpdateAccessProjectMutation>;
export type UpdateAccessProjectMutationResult = Apollo.MutationResult<UpdateAccessProjectMutation>;
export type UpdateAccessProjectMutationOptions = Apollo.BaseMutationOptions<UpdateAccessProjectMutation, UpdateAccessProjectMutationVariables>;
export const DeleteAccessProjectDocument = gql`
    mutation DeleteAccessProject($data: DeleteUserProjectAccessesInput!) {
  deleteAccessProject(data: $data) {
    success
    message
  }
}
    `;
export type DeleteAccessProjectMutationFn = Apollo.MutationFunction<DeleteAccessProjectMutation, DeleteAccessProjectMutationVariables>;

/**
 * __useDeleteAccessProjectMutation__
 *
 * To run a mutation, you first call `useDeleteAccessProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAccessProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAccessProjectMutation, { data, loading, error }] = useDeleteAccessProjectMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useDeleteAccessProjectMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAccessProjectMutation, DeleteAccessProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteAccessProjectMutation, DeleteAccessProjectMutationVariables>(DeleteAccessProjectDocument, options);
      }
export type DeleteAccessProjectMutationHookResult = ReturnType<typeof useDeleteAccessProjectMutation>;
export type DeleteAccessProjectMutationResult = Apollo.MutationResult<DeleteAccessProjectMutation>;
export type DeleteAccessProjectMutationOptions = Apollo.BaseMutationOptions<DeleteAccessProjectMutation, DeleteAccessProjectMutationVariables>;
export const AddAccessProjectDocument = gql`
    mutation AddAccessProject($data: CreateUserProjectAccessesInput!) {
  addAccessProject(data: $data) {
    listUsersAccessesProjectData {
      role
      project_id
      user_id
      created_at
      updated_at
      user {
        pseudo
        email
        firstname
        lastname
        id
        password
        role
        ban
        run_counter
        last_login
        created_at
        update_at
      }
      project {
        id
        name
        private
        created_at
        category
        update_at
        files {
          id
          name
          type
          language
          extension
          content
          update_at
          created_at
        }
      }
    }
    message {
      success
      message
    }
  }
}
    `;
export type AddAccessProjectMutationFn = Apollo.MutationFunction<AddAccessProjectMutation, AddAccessProjectMutationVariables>;

/**
 * __useAddAccessProjectMutation__
 *
 * To run a mutation, you first call `useAddAccessProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddAccessProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addAccessProjectMutation, { data, loading, error }] = useAddAccessProjectMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAddAccessProjectMutation(baseOptions?: Apollo.MutationHookOptions<AddAccessProjectMutation, AddAccessProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddAccessProjectMutation, AddAccessProjectMutationVariables>(AddAccessProjectDocument, options);
      }
export type AddAccessProjectMutationHookResult = ReturnType<typeof useAddAccessProjectMutation>;
export type AddAccessProjectMutationResult = Apollo.MutationResult<AddAccessProjectMutation>;
export type AddAccessProjectMutationOptions = Apollo.BaseMutationOptions<AddAccessProjectMutation, AddAccessProjectMutationVariables>;
export const LogoutDocument = gql`
    query Logout {
  logout {
    success
    message
  }
}
    `;

/**
 * __useLogoutQuery__
 *
 * To run a query within a React component, call `useLogoutQuery` and pass it any options that fit your needs.
 * When your component renders, `useLogoutQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLogoutQuery({
 *   variables: {
 *   },
 * });
 */
export function useLogoutQuery(baseOptions?: Apollo.QueryHookOptions<LogoutQuery, LogoutQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LogoutQuery, LogoutQueryVariables>(LogoutDocument, options);
      }
export function useLogoutLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LogoutQuery, LogoutQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LogoutQuery, LogoutQueryVariables>(LogoutDocument, options);
        }
export function useLogoutSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<LogoutQuery, LogoutQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<LogoutQuery, LogoutQueryVariables>(LogoutDocument, options);
        }
export type LogoutQueryHookResult = ReturnType<typeof useLogoutQuery>;
export type LogoutLazyQueryHookResult = ReturnType<typeof useLogoutLazyQuery>;
export type LogoutSuspenseQueryHookResult = ReturnType<typeof useLogoutSuspenseQuery>;
export type LogoutQueryResult = Apollo.QueryResult<LogoutQuery, LogoutQueryVariables>;
export const ListFilesByProjectDocument = gql`
    query ListFilesByProject($projectId: String!) {
  listFilesByProject(project_id: $projectId) {
    extension
    language
    name
    type
    id
    content
  }
}
    `;

/**
 * __useListFilesByProjectQuery__
 *
 * To run a query within a React component, call `useListFilesByProjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useListFilesByProjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListFilesByProjectQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useListFilesByProjectQuery(baseOptions: Apollo.QueryHookOptions<ListFilesByProjectQuery, ListFilesByProjectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListFilesByProjectQuery, ListFilesByProjectQueryVariables>(ListFilesByProjectDocument, options);
      }
export function useListFilesByProjectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListFilesByProjectQuery, ListFilesByProjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListFilesByProjectQuery, ListFilesByProjectQueryVariables>(ListFilesByProjectDocument, options);
        }
export function useListFilesByProjectSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ListFilesByProjectQuery, ListFilesByProjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListFilesByProjectQuery, ListFilesByProjectQueryVariables>(ListFilesByProjectDocument, options);
        }
export type ListFilesByProjectQueryHookResult = ReturnType<typeof useListFilesByProjectQuery>;
export type ListFilesByProjectLazyQueryHookResult = ReturnType<typeof useListFilesByProjectLazyQuery>;
export type ListFilesByProjectSuspenseQueryHookResult = ReturnType<typeof useListFilesByProjectSuspenseQuery>;
export type ListFilesByProjectQueryResult = Apollo.QueryResult<ListFilesByProjectQuery, ListFilesByProjectQueryVariables>;
export const FindProjectByIdDocument = gql`
    query findProjectById($findProjectByIdId: String!) {
  findProjectById(id: $findProjectByIdId) {
    id
    name
    private
    update_at
    created_at
    category
    files {
      language
      extension
      name
      type
      id
      content
      created_at
      update_at
    }
  }
}
    `;

/**
 * __useFindProjectByIdQuery__
 *
 * To run a query within a React component, call `useFindProjectByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindProjectByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindProjectByIdQuery({
 *   variables: {
 *      findProjectByIdId: // value for 'findProjectByIdId'
 *   },
 * });
 */
export function useFindProjectByIdQuery(baseOptions: Apollo.QueryHookOptions<FindProjectByIdQuery, FindProjectByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindProjectByIdQuery, FindProjectByIdQueryVariables>(FindProjectByIdDocument, options);
      }
export function useFindProjectByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindProjectByIdQuery, FindProjectByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindProjectByIdQuery, FindProjectByIdQueryVariables>(FindProjectByIdDocument, options);
        }
export function useFindProjectByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FindProjectByIdQuery, FindProjectByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindProjectByIdQuery, FindProjectByIdQueryVariables>(FindProjectByIdDocument, options);
        }
export type FindProjectByIdQueryHookResult = ReturnType<typeof useFindProjectByIdQuery>;
export type FindProjectByIdLazyQueryHookResult = ReturnType<typeof useFindProjectByIdLazyQuery>;
export type FindProjectByIdSuspenseQueryHookResult = ReturnType<typeof useFindProjectByIdSuspenseQuery>;
export type FindProjectByIdQueryResult = Apollo.QueryResult<FindProjectByIdQuery, FindProjectByIdQueryVariables>;
export const ListProjectsByUserDocument = gql`
    query ListProjectsByUser($listProjectsByUserId: String!) {
  listProjectsByUser(id: $listProjectsByUserId) {
    category
    created_at
    id
    name
    private
    update_at
  }
}
    `;

/**
 * __useListProjectsByUserQuery__
 *
 * To run a query within a React component, call `useListProjectsByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useListProjectsByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListProjectsByUserQuery({
 *   variables: {
 *      listProjectsByUserId: // value for 'listProjectsByUserId'
 *   },
 * });
 */
export function useListProjectsByUserQuery(baseOptions: Apollo.QueryHookOptions<ListProjectsByUserQuery, ListProjectsByUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListProjectsByUserQuery, ListProjectsByUserQueryVariables>(ListProjectsByUserDocument, options);
      }
export function useListProjectsByUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListProjectsByUserQuery, ListProjectsByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListProjectsByUserQuery, ListProjectsByUserQueryVariables>(ListProjectsByUserDocument, options);
        }
export function useListProjectsByUserSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ListProjectsByUserQuery, ListProjectsByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListProjectsByUserQuery, ListProjectsByUserQueryVariables>(ListProjectsByUserDocument, options);
        }
export type ListProjectsByUserQueryHookResult = ReturnType<typeof useListProjectsByUserQuery>;
export type ListProjectsByUserLazyQueryHookResult = ReturnType<typeof useListProjectsByUserLazyQuery>;
export type ListProjectsByUserSuspenseQueryHookResult = ReturnType<typeof useListProjectsByUserSuspenseQuery>;
export type ListProjectsByUserQueryResult = Apollo.QueryResult<ListProjectsByUserQuery, ListProjectsByUserQueryVariables>;
export const ListProjectsDocument = gql`
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

/**
 * __useListProjectsQuery__
 *
 * To run a query within a React component, call `useListProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListProjectsQuery({
 *   variables: {
 *   },
 * });
 */
export function useListProjectsQuery(baseOptions?: Apollo.QueryHookOptions<ListProjectsQuery, ListProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListProjectsQuery, ListProjectsQueryVariables>(ListProjectsDocument, options);
      }
export function useListProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListProjectsQuery, ListProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListProjectsQuery, ListProjectsQueryVariables>(ListProjectsDocument, options);
        }
export function useListProjectsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ListProjectsQuery, ListProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListProjectsQuery, ListProjectsQueryVariables>(ListProjectsDocument, options);
        }
export type ListProjectsQueryHookResult = ReturnType<typeof useListProjectsQuery>;
export type ListProjectsLazyQueryHookResult = ReturnType<typeof useListProjectsLazyQuery>;
export type ListProjectsSuspenseQueryHookResult = ReturnType<typeof useListProjectsSuspenseQuery>;
export type ListProjectsQueryResult = Apollo.QueryResult<ListProjectsQuery, ListProjectsQueryVariables>;
export const ListProjectsByUserWithRoleDocument = gql`
    query ListProjectsByUserWithRole($userId: String!, $userRole: [String!]) {
  listProjectsByUserWithRole(id: $userId, userRole: $userRole) {
    project {
      update_at
      private
      name
      id
      created_at
      category
    }
    role
  }
}
    `;

/**
 * __useListProjectsByUserWithRoleQuery__
 *
 * To run a query within a React component, call `useListProjectsByUserWithRoleQuery` and pass it any options that fit your needs.
 * When your component renders, `useListProjectsByUserWithRoleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListProjectsByUserWithRoleQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      userRole: // value for 'userRole'
 *   },
 * });
 */
export function useListProjectsByUserWithRoleQuery(baseOptions: Apollo.QueryHookOptions<ListProjectsByUserWithRoleQuery, ListProjectsByUserWithRoleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListProjectsByUserWithRoleQuery, ListProjectsByUserWithRoleQueryVariables>(ListProjectsByUserWithRoleDocument, options);
      }
export function useListProjectsByUserWithRoleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListProjectsByUserWithRoleQuery, ListProjectsByUserWithRoleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListProjectsByUserWithRoleQuery, ListProjectsByUserWithRoleQueryVariables>(ListProjectsByUserWithRoleDocument, options);
        }
export function useListProjectsByUserWithRoleSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ListProjectsByUserWithRoleQuery, ListProjectsByUserWithRoleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListProjectsByUserWithRoleQuery, ListProjectsByUserWithRoleQueryVariables>(ListProjectsByUserWithRoleDocument, options);
        }
export type ListProjectsByUserWithRoleQueryHookResult = ReturnType<typeof useListProjectsByUserWithRoleQuery>;
export type ListProjectsByUserWithRoleLazyQueryHookResult = ReturnType<typeof useListProjectsByUserWithRoleLazyQuery>;
export type ListProjectsByUserWithRoleSuspenseQueryHookResult = ReturnType<typeof useListProjectsByUserWithRoleSuspenseQuery>;
export type ListProjectsByUserWithRoleQueryResult = Apollo.QueryResult<ListProjectsByUserWithRoleQuery, ListProjectsByUserWithRoleQueryVariables>;
export const CountLikesPerProjectDocument = gql`
    query CountLikesPerProject($projectId: Float!) {
  countLikesPerProject(projectId: $projectId)
}
    `;

/**
 * __useCountLikesPerProjectQuery__
 *
 * To run a query within a React component, call `useCountLikesPerProjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useCountLikesPerProjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCountLikesPerProjectQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useCountLikesPerProjectQuery(baseOptions: Apollo.QueryHookOptions<CountLikesPerProjectQuery, CountLikesPerProjectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CountLikesPerProjectQuery, CountLikesPerProjectQueryVariables>(CountLikesPerProjectDocument, options);
      }
export function useCountLikesPerProjectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CountLikesPerProjectQuery, CountLikesPerProjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CountLikesPerProjectQuery, CountLikesPerProjectQueryVariables>(CountLikesPerProjectDocument, options);
        }
export function useCountLikesPerProjectSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<CountLikesPerProjectQuery, CountLikesPerProjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CountLikesPerProjectQuery, CountLikesPerProjectQueryVariables>(CountLikesPerProjectDocument, options);
        }
export type CountLikesPerProjectQueryHookResult = ReturnType<typeof useCountLikesPerProjectQuery>;
export type CountLikesPerProjectLazyQueryHookResult = ReturnType<typeof useCountLikesPerProjectLazyQuery>;
export type CountLikesPerProjectSuspenseQueryHookResult = ReturnType<typeof useCountLikesPerProjectSuspenseQuery>;
export type CountLikesPerProjectQueryResult = Apollo.QueryResult<CountLikesPerProjectQuery, CountLikesPerProjectQueryVariables>;
export const ListLikeProjectDocument = gql`
    query ListLikeProject($userId: String!) {
  listLikeProject(userId: $userId) {
    update_at
    private
    name
    id
    created_at
    category
  }
}
    `;

/**
 * __useListLikeProjectQuery__
 *
 * To run a query within a React component, call `useListLikeProjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useListLikeProjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListLikeProjectQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useListLikeProjectQuery(baseOptions: Apollo.QueryHookOptions<ListLikeProjectQuery, ListLikeProjectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListLikeProjectQuery, ListLikeProjectQueryVariables>(ListLikeProjectDocument, options);
      }
export function useListLikeProjectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListLikeProjectQuery, ListLikeProjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListLikeProjectQuery, ListLikeProjectQueryVariables>(ListLikeProjectDocument, options);
        }
export function useListLikeProjectSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ListLikeProjectQuery, ListLikeProjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListLikeProjectQuery, ListLikeProjectQueryVariables>(ListLikeProjectDocument, options);
        }
export type ListLikeProjectQueryHookResult = ReturnType<typeof useListLikeProjectQuery>;
export type ListLikeProjectLazyQueryHookResult = ReturnType<typeof useListLikeProjectLazyQuery>;
export type ListLikeProjectSuspenseQueryHookResult = ReturnType<typeof useListLikeProjectSuspenseQuery>;
export type ListLikeProjectQueryResult = Apollo.QueryResult<ListLikeProjectQuery, ListLikeProjectQueryVariables>;
export const ListPublicProjectsDocument = gql`
    query ListPublicProjects($limit: Int!, $offset: Int!) {
  listPublicProjects(limit: $limit, offset: $offset) {
    projects {
      id
      name
      category
      private
      created_at
      update_at
    }
    total
    offset
    limit
  }
}
    `;

/**
 * __useListPublicProjectsQuery__
 *
 * To run a query within a React component, call `useListPublicProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListPublicProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListPublicProjectsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useListPublicProjectsQuery(baseOptions: Apollo.QueryHookOptions<ListPublicProjectsQuery, ListPublicProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListPublicProjectsQuery, ListPublicProjectsQueryVariables>(ListPublicProjectsDocument, options);
      }
export function useListPublicProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListPublicProjectsQuery, ListPublicProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListPublicProjectsQuery, ListPublicProjectsQueryVariables>(ListPublicProjectsDocument, options);
        }
export function useListPublicProjectsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ListPublicProjectsQuery, ListPublicProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListPublicProjectsQuery, ListPublicProjectsQueryVariables>(ListPublicProjectsDocument, options);
        }
export type ListPublicProjectsQueryHookResult = ReturnType<typeof useListPublicProjectsQuery>;
export type ListPublicProjectsLazyQueryHookResult = ReturnType<typeof useListPublicProjectsLazyQuery>;
export type ListPublicProjectsSuspenseQueryHookResult = ReturnType<typeof useListPublicProjectsSuspenseQuery>;
export type ListPublicProjectsQueryResult = Apollo.QueryResult<ListPublicProjectsQuery, ListPublicProjectsQueryVariables>;
export const ListPublicProjectsByNameDocument = gql`
    query listPublicProjectsByName($name: String!) {
  listPublicProjectsByName(name: $name) {
    id
    name
  }
}
    `;

/**
 * __useListPublicProjectsByNameQuery__
 *
 * To run a query within a React component, call `useListPublicProjectsByNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useListPublicProjectsByNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListPublicProjectsByNameQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useListPublicProjectsByNameQuery(baseOptions: Apollo.QueryHookOptions<ListPublicProjectsByNameQuery, ListPublicProjectsByNameQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListPublicProjectsByNameQuery, ListPublicProjectsByNameQueryVariables>(ListPublicProjectsByNameDocument, options);
      }
export function useListPublicProjectsByNameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListPublicProjectsByNameQuery, ListPublicProjectsByNameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListPublicProjectsByNameQuery, ListPublicProjectsByNameQueryVariables>(ListPublicProjectsByNameDocument, options);
        }
export function useListPublicProjectsByNameSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ListPublicProjectsByNameQuery, ListPublicProjectsByNameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListPublicProjectsByNameQuery, ListPublicProjectsByNameQueryVariables>(ListPublicProjectsByNameDocument, options);
        }
export type ListPublicProjectsByNameQueryHookResult = ReturnType<typeof useListPublicProjectsByNameQuery>;
export type ListPublicProjectsByNameLazyQueryHookResult = ReturnType<typeof useListPublicProjectsByNameLazyQuery>;
export type ListPublicProjectsByNameSuspenseQueryHookResult = ReturnType<typeof useListPublicProjectsByNameSuspenseQuery>;
export type ListPublicProjectsByNameQueryResult = Apollo.QueryResult<ListPublicProjectsByNameQuery, ListPublicProjectsByNameQueryVariables>;
export const ListPublicOwnedByUserDocument = gql`
    query ListPublicOwnedByUser($listPublicProjectsOwnedByUserId: String!) {
  listPublicProjectsOwnedByUser(id: $listPublicProjectsOwnedByUserId) {
    project {
      id
      name
      category
    }
  }
}
    `;

/**
 * __useListPublicOwnedByUserQuery__
 *
 * To run a query within a React component, call `useListPublicOwnedByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useListPublicOwnedByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListPublicOwnedByUserQuery({
 *   variables: {
 *      listPublicProjectsOwnedByUserId: // value for 'listPublicProjectsOwnedByUserId'
 *   },
 * });
 */
export function useListPublicOwnedByUserQuery(baseOptions: Apollo.QueryHookOptions<ListPublicOwnedByUserQuery, ListPublicOwnedByUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListPublicOwnedByUserQuery, ListPublicOwnedByUserQueryVariables>(ListPublicOwnedByUserDocument, options);
      }
export function useListPublicOwnedByUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListPublicOwnedByUserQuery, ListPublicOwnedByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListPublicOwnedByUserQuery, ListPublicOwnedByUserQueryVariables>(ListPublicOwnedByUserDocument, options);
        }
export function useListPublicOwnedByUserSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ListPublicOwnedByUserQuery, ListPublicOwnedByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListPublicOwnedByUserQuery, ListPublicOwnedByUserQueryVariables>(ListPublicOwnedByUserDocument, options);
        }
export type ListPublicOwnedByUserQueryHookResult = ReturnType<typeof useListPublicOwnedByUserQuery>;
export type ListPublicOwnedByUserLazyQueryHookResult = ReturnType<typeof useListPublicOwnedByUserLazyQuery>;
export type ListPublicOwnedByUserSuspenseQueryHookResult = ReturnType<typeof useListPublicOwnedByUserSuspenseQuery>;
export type ListPublicOwnedByUserQueryResult = Apollo.QueryResult<ListPublicOwnedByUserQuery, ListPublicOwnedByUserQueryVariables>;
export const ListProjectsPublicLikeByUserDocument = gql`
    query ListProjectsPublicLikeByUser($userId: Float!) {
  listProjectsPublicLikeByUser(userID: $userId) {
    category
    name
    id
  }
}
    `;

/**
 * __useListProjectsPublicLikeByUserQuery__
 *
 * To run a query within a React component, call `useListProjectsPublicLikeByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useListProjectsPublicLikeByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListProjectsPublicLikeByUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useListProjectsPublicLikeByUserQuery(baseOptions: Apollo.QueryHookOptions<ListProjectsPublicLikeByUserQuery, ListProjectsPublicLikeByUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListProjectsPublicLikeByUserQuery, ListProjectsPublicLikeByUserQueryVariables>(ListProjectsPublicLikeByUserDocument, options);
      }
export function useListProjectsPublicLikeByUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListProjectsPublicLikeByUserQuery, ListProjectsPublicLikeByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListProjectsPublicLikeByUserQuery, ListProjectsPublicLikeByUserQueryVariables>(ListProjectsPublicLikeByUserDocument, options);
        }
export function useListProjectsPublicLikeByUserSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ListProjectsPublicLikeByUserQuery, ListProjectsPublicLikeByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListProjectsPublicLikeByUserQuery, ListProjectsPublicLikeByUserQueryVariables>(ListProjectsPublicLikeByUserDocument, options);
        }
export type ListProjectsPublicLikeByUserQueryHookResult = ReturnType<typeof useListProjectsPublicLikeByUserQuery>;
export type ListProjectsPublicLikeByUserLazyQueryHookResult = ReturnType<typeof useListProjectsPublicLikeByUserLazyQuery>;
export type ListProjectsPublicLikeByUserSuspenseQueryHookResult = ReturnType<typeof useListProjectsPublicLikeByUserSuspenseQuery>;
export type ListProjectsPublicLikeByUserQueryResult = Apollo.QueryResult<ListProjectsPublicLikeByUserQuery, ListProjectsPublicLikeByUserQueryVariables>;
export const FindUserByIdDocument = gql`
    query FindUserById($findUserByIdId: String!) {
  findUserById(id: $findUserByIdId) {
    id
    created_at
    email
    firstname
    lastname
    pseudo
    run_counter
  }
}
    `;

/**
 * __useFindUserByIdQuery__
 *
 * To run a query within a React component, call `useFindUserByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindUserByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindUserByIdQuery({
 *   variables: {
 *      findUserByIdId: // value for 'findUserByIdId'
 *   },
 * });
 */
export function useFindUserByIdQuery(baseOptions: Apollo.QueryHookOptions<FindUserByIdQuery, FindUserByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindUserByIdQuery, FindUserByIdQueryVariables>(FindUserByIdDocument, options);
      }
export function useFindUserByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindUserByIdQuery, FindUserByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindUserByIdQuery, FindUserByIdQueryVariables>(FindUserByIdDocument, options);
        }
export function useFindUserByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FindUserByIdQuery, FindUserByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindUserByIdQuery, FindUserByIdQueryVariables>(FindUserByIdDocument, options);
        }
export type FindUserByIdQueryHookResult = ReturnType<typeof useFindUserByIdQuery>;
export type FindUserByIdLazyQueryHookResult = ReturnType<typeof useFindUserByIdLazyQuery>;
export type FindUserByIdSuspenseQueryHookResult = ReturnType<typeof useFindUserByIdSuspenseQuery>;
export type FindUserByIdQueryResult = Apollo.QueryResult<FindUserByIdQuery, FindUserByIdQueryVariables>;
export const FindUserInfosByIdDocument = gql`
    query FindUserInfosById($findUserByIdId: String!) {
  findUserById(id: $findUserByIdId) {
    id
    pseudo
    ban
    last_login
    firstname
    lastname
    email
  }
}
    `;

/**
 * __useFindUserInfosByIdQuery__
 *
 * To run a query within a React component, call `useFindUserInfosByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindUserInfosByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindUserInfosByIdQuery({
 *   variables: {
 *      findUserByIdId: // value for 'findUserByIdId'
 *   },
 * });
 */
export function useFindUserInfosByIdQuery(baseOptions: Apollo.QueryHookOptions<FindUserInfosByIdQuery, FindUserInfosByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindUserInfosByIdQuery, FindUserInfosByIdQueryVariables>(FindUserInfosByIdDocument, options);
      }
export function useFindUserInfosByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindUserInfosByIdQuery, FindUserInfosByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindUserInfosByIdQuery, FindUserInfosByIdQueryVariables>(FindUserInfosByIdDocument, options);
        }
export function useFindUserInfosByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FindUserInfosByIdQuery, FindUserInfosByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindUserInfosByIdQuery, FindUserInfosByIdQueryVariables>(FindUserInfosByIdDocument, options);
        }
export type FindUserInfosByIdQueryHookResult = ReturnType<typeof useFindUserInfosByIdQuery>;
export type FindUserInfosByIdLazyQueryHookResult = ReturnType<typeof useFindUserInfosByIdLazyQuery>;
export type FindUserInfosByIdSuspenseQueryHookResult = ReturnType<typeof useFindUserInfosByIdSuspenseQuery>;
export type FindUserInfosByIdQueryResult = Apollo.QueryResult<FindUserInfosByIdQuery, FindUserInfosByIdQueryVariables>;
export const FindProjectOwnerDocument = gql`
    query FindProjectOwner($projectId: String!) {
  findProjectOwner(projectId: $projectId) {
    pseudo
  }
}
    `;

/**
 * __useFindProjectOwnerQuery__
 *
 * To run a query within a React component, call `useFindProjectOwnerQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindProjectOwnerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindProjectOwnerQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useFindProjectOwnerQuery(baseOptions: Apollo.QueryHookOptions<FindProjectOwnerQuery, FindProjectOwnerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindProjectOwnerQuery, FindProjectOwnerQueryVariables>(FindProjectOwnerDocument, options);
      }
export function useFindProjectOwnerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindProjectOwnerQuery, FindProjectOwnerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindProjectOwnerQuery, FindProjectOwnerQueryVariables>(FindProjectOwnerDocument, options);
        }
export function useFindProjectOwnerSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FindProjectOwnerQuery, FindProjectOwnerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindProjectOwnerQuery, FindProjectOwnerQueryVariables>(FindProjectOwnerDocument, options);
        }
export type FindProjectOwnerQueryHookResult = ReturnType<typeof useFindProjectOwnerQuery>;
export type FindProjectOwnerLazyQueryHookResult = ReturnType<typeof useFindProjectOwnerLazyQuery>;
export type FindProjectOwnerSuspenseQueryHookResult = ReturnType<typeof useFindProjectOwnerSuspenseQuery>;
export type FindProjectOwnerQueryResult = Apollo.QueryResult<FindProjectOwnerQuery, FindProjectOwnerQueryVariables>;
export const ListUsersByPseudoDocument = gql`
    query ListUsersByPseudo($pseudo: String!) {
  listUsersByPseudo(pseudo: $pseudo) {
    pseudo
    id
    email
  }
}
    `;

/**
 * __useListUsersByPseudoQuery__
 *
 * To run a query within a React component, call `useListUsersByPseudoQuery` and pass it any options that fit your needs.
 * When your component renders, `useListUsersByPseudoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListUsersByPseudoQuery({
 *   variables: {
 *      pseudo: // value for 'pseudo'
 *   },
 * });
 */
export function useListUsersByPseudoQuery(baseOptions: Apollo.QueryHookOptions<ListUsersByPseudoQuery, ListUsersByPseudoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListUsersByPseudoQuery, ListUsersByPseudoQueryVariables>(ListUsersByPseudoDocument, options);
      }
export function useListUsersByPseudoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListUsersByPseudoQuery, ListUsersByPseudoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListUsersByPseudoQuery, ListUsersByPseudoQueryVariables>(ListUsersByPseudoDocument, options);
        }
export function useListUsersByPseudoSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ListUsersByPseudoQuery, ListUsersByPseudoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListUsersByPseudoQuery, ListUsersByPseudoQueryVariables>(ListUsersByPseudoDocument, options);
        }
export type ListUsersByPseudoQueryHookResult = ReturnType<typeof useListUsersByPseudoQuery>;
export type ListUsersByPseudoLazyQueryHookResult = ReturnType<typeof useListUsersByPseudoLazyQuery>;
export type ListUsersByPseudoSuspenseQueryHookResult = ReturnType<typeof useListUsersByPseudoSuspenseQuery>;
export type ListUsersByPseudoQueryResult = Apollo.QueryResult<ListUsersByPseudoQuery, ListUsersByPseudoQueryVariables>;
export const ListUsersLikesPerProjectDocument = gql`
    query ListUsersLikesPerProject($projectId: Float!) {
  listUsersLikesPerProject(projectId: $projectId) {
    pseudo
    id
  }
}
    `;

/**
 * __useListUsersLikesPerProjectQuery__
 *
 * To run a query within a React component, call `useListUsersLikesPerProjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useListUsersLikesPerProjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListUsersLikesPerProjectQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useListUsersLikesPerProjectQuery(baseOptions: Apollo.QueryHookOptions<ListUsersLikesPerProjectQuery, ListUsersLikesPerProjectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListUsersLikesPerProjectQuery, ListUsersLikesPerProjectQueryVariables>(ListUsersLikesPerProjectDocument, options);
      }
export function useListUsersLikesPerProjectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListUsersLikesPerProjectQuery, ListUsersLikesPerProjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListUsersLikesPerProjectQuery, ListUsersLikesPerProjectQueryVariables>(ListUsersLikesPerProjectDocument, options);
        }
export function useListUsersLikesPerProjectSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ListUsersLikesPerProjectQuery, ListUsersLikesPerProjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListUsersLikesPerProjectQuery, ListUsersLikesPerProjectQueryVariables>(ListUsersLikesPerProjectDocument, options);
        }
export type ListUsersLikesPerProjectQueryHookResult = ReturnType<typeof useListUsersLikesPerProjectQuery>;
export type ListUsersLikesPerProjectLazyQueryHookResult = ReturnType<typeof useListUsersLikesPerProjectLazyQuery>;
export type ListUsersLikesPerProjectSuspenseQueryHookResult = ReturnType<typeof useListUsersLikesPerProjectSuspenseQuery>;
export type ListUsersLikesPerProjectQueryResult = Apollo.QueryResult<ListUsersLikesPerProjectQuery, ListUsersLikesPerProjectQueryVariables>;
export const ListUsersAccessesProjectDocument = gql`
    query ListUsersAccessesProject($projectId: Float!) {
  listUsersAccessesProject(project_id: $projectId) {
    user {
      role
      pseudo
      id
      created_at
      update_at
    }
    project {
      category
      id
      name
      private
      created_at
      update_at
    }
    user_id
    project_id
    updated_at
    role
    created_at
  }
}
    `;

/**
 * __useListUsersAccessesProjectQuery__
 *
 * To run a query within a React component, call `useListUsersAccessesProjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useListUsersAccessesProjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListUsersAccessesProjectQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useListUsersAccessesProjectQuery(baseOptions: Apollo.QueryHookOptions<ListUsersAccessesProjectQuery, ListUsersAccessesProjectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListUsersAccessesProjectQuery, ListUsersAccessesProjectQueryVariables>(ListUsersAccessesProjectDocument, options);
      }
export function useListUsersAccessesProjectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListUsersAccessesProjectQuery, ListUsersAccessesProjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListUsersAccessesProjectQuery, ListUsersAccessesProjectQueryVariables>(ListUsersAccessesProjectDocument, options);
        }
export function useListUsersAccessesProjectSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ListUsersAccessesProjectQuery, ListUsersAccessesProjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListUsersAccessesProjectQuery, ListUsersAccessesProjectQueryVariables>(ListUsersAccessesProjectDocument, options);
        }
export type ListUsersAccessesProjectQueryHookResult = ReturnType<typeof useListUsersAccessesProjectQuery>;
export type ListUsersAccessesProjectLazyQueryHookResult = ReturnType<typeof useListUsersAccessesProjectLazyQuery>;
export type ListUsersAccessesProjectSuspenseQueryHookResult = ReturnType<typeof useListUsersAccessesProjectSuspenseQuery>;
export type ListUsersAccessesProjectQueryResult = Apollo.QueryResult<ListUsersAccessesProjectQuery, ListUsersAccessesProjectQueryVariables>;
export const ListUsersWithAccessesDocument = gql`
    query ListUsersWithAccesses($projectId: Float!) {
  listUsersAccessesProject(project_id: $projectId) {
    user {
      pseudo
      id
    }
    role
  }
}
    `;

/**
 * __useListUsersWithAccessesQuery__
 *
 * To run a query within a React component, call `useListUsersWithAccessesQuery` and pass it any options that fit your needs.
 * When your component renders, `useListUsersWithAccessesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListUsersWithAccessesQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useListUsersWithAccessesQuery(baseOptions: Apollo.QueryHookOptions<ListUsersWithAccessesQuery, ListUsersWithAccessesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListUsersWithAccessesQuery, ListUsersWithAccessesQueryVariables>(ListUsersWithAccessesDocument, options);
      }
export function useListUsersWithAccessesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListUsersWithAccessesQuery, ListUsersWithAccessesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListUsersWithAccessesQuery, ListUsersWithAccessesQueryVariables>(ListUsersWithAccessesDocument, options);
        }
export function useListUsersWithAccessesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ListUsersWithAccessesQuery, ListUsersWithAccessesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListUsersWithAccessesQuery, ListUsersWithAccessesQueryVariables>(ListUsersWithAccessesDocument, options);
        }
export type ListUsersWithAccessesQueryHookResult = ReturnType<typeof useListUsersWithAccessesQuery>;
export type ListUsersWithAccessesLazyQueryHookResult = ReturnType<typeof useListUsersWithAccessesLazyQuery>;
export type ListUsersWithAccessesSuspenseQueryHookResult = ReturnType<typeof useListUsersWithAccessesSuspenseQuery>;
export type ListUsersWithAccessesQueryResult = Apollo.QueryResult<ListUsersWithAccessesQuery, ListUsersWithAccessesQueryVariables>;