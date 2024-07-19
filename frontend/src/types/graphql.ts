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
  category?: InputMaybe<Scalars['String']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
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

export type File = {
  __typename?: 'File';
  category: Scalars['String']['output'];
  content: Scalars['String']['output'];
  created_at: Scalars['DateTimeISO']['output'];
  id: Scalars['ID']['output'];
  language: Scalars['String']['output'];
  name: Scalars['String']['output'];
  type: Scalars['String']['output'];
  update_at: Scalars['DateTimeISO']['output'];
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
  addAccessProject: Message;
  addLikeProject: Message;
  createFile: File;
  createProject: Project;
  deleteAccessProject: Message;
  deleteFile: Message;
  deleteLikeProject: Message;
  deleteProject: Message;
  deleteUser: Message;
  register: User;
  updateFile: Message;
  updateProject: Message;
  updateUser: Message;
};


export type MutationAddAccessProjectArgs = {
  data: CreateUserProjectAccessesInput;
};


export type MutationAddLikeProjectArgs = {
  projectId: Scalars['Float']['input'];
  userId: Scalars['Float']['input'];
};


export type MutationCreateFileArgs = {
  data: CreateFileInput;
};


export type MutationCreateProjectArgs = {
  data: CreateProjectInput;
};


export type MutationDeleteAccessProjectArgs = {
  projectId: Scalars['Float']['input'];
  userId: Scalars['Float']['input'];
};


export type MutationDeleteFileArgs = {
  id: Scalars['Float']['input'];
};


export type MutationDeleteLikeProjectArgs = {
  projectId: Scalars['Float']['input'];
  userId: Scalars['Float']['input'];
};


export type MutationDeleteProjectArgs = {
  id: Scalars['Float']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['Float']['input'];
};


export type MutationRegisterArgs = {
  data: CreateUserInput;
};


export type MutationUpdateFileArgs = {
  data: UpdateFileInput;
};


export type MutationUpdateProjectArgs = {
  data: UpdateProjectInput;
};


export type MutationUpdateUserArgs = {
  data: UpdateUserInput;
};

export type Project = {
  __typename?: 'Project';
  category: Scalars['String']['output'];
  created_at: Scalars['DateTimeISO']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  private: Scalars['Boolean']['output'];
  update_at: Scalars['DateTimeISO']['output'];
};

export type Query = {
  __typename?: 'Query';
  countLikesPerProject: Scalars['Int']['output'];
  findFileById: Array<File>;
  findProjectById: Project;
  findProjectByName: Project;
  findUserByEmail: User;
  findUserById: User;
  findUserByPseudo: User;
  listAccesProject: Array<Project>;
  listFilesByProject: Array<File>;
  listLikeProject: Array<Project>;
  listProjects: Array<Project>;
  listProjectsByCategory: Array<Project>;
  listProjectsByUser: Array<Project>;
  listProjectsByUserWithRole: Array<UserAccessProjectOutput>;
  listPublicProjects: Array<Project>;
  listUsers: Array<User>;
  listUsersByRole: Array<User>;
  listUsersLikesPerProject: Array<User>;
  login: Message;
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
  userId: Scalars['Float']['input'];
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


export type QueryListUsersByRoleArgs = {
  role: Scalars['String']['input'];
};


export type QueryListUsersLikesPerProjectArgs = {
  projectId: Scalars['Float']['input'];
};


export type QueryLoginArgs = {
  infos: InputLogin;
};

export type UpdateFileInput = {
  content?: InputMaybe<Scalars['String']['input']>;
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

export type RegisterMutationVariables = Exact<{
  data: CreateUserInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'User', pseudo: string, run_counter: number, role: string, password: string, lastname: string, firstname: string, email: string, ban: boolean } };

export type LoginQueryVariables = Exact<{
  infos: InputLogin;
}>;


export type LoginQuery = { __typename?: 'Query', login: { __typename?: 'Message', success: boolean, message: string } };

export type LogoutQueryVariables = Exact<{ [key: string]: never; }>;


export type LogoutQuery = { __typename?: 'Query', logout: { __typename?: 'Message', success: boolean, message: string } };

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

export type FindUserByIdQueryVariables = Exact<{
  findUserByIdId: Scalars['String']['input'];
}>;


export type FindUserByIdQuery = { __typename?: 'Query', findUserById: { __typename?: 'User', created_at: any, email: string, firstname: string, lastname: string, pseudo: string, run_counter: number } };


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
    query Login($infos: InputLogin!) {
  login(infos: $infos) {
    success
    message
  }
}
    `;

/**
 * __useLoginQuery__
 *
 * To run a query within a React component, call `useLoginQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoginQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoginQuery({
 *   variables: {
 *      infos: // value for 'infos'
 *   },
 * });
 */
export function useLoginQuery(baseOptions: Apollo.QueryHookOptions<LoginQuery, LoginQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
      }
export function useLoginLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LoginQuery, LoginQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
        }
export function useLoginSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<LoginQuery, LoginQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
        }
export type LoginQueryHookResult = ReturnType<typeof useLoginQuery>;
export type LoginLazyQueryHookResult = ReturnType<typeof useLoginLazyQuery>;
export type LoginSuspenseQueryHookResult = ReturnType<typeof useLoginSuspenseQuery>;
export type LoginQueryResult = Apollo.QueryResult<LoginQuery, LoginQueryVariables>;
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
export const FindUserByIdDocument = gql`
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