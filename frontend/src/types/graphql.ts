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
  project_id: Scalars['String']['output'];
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
  createProject: Project;
  deleteAccessProject: Message;
  deleteLikeProject: Message;
  deleteProject: Message;
  deleteUser: Message;
  register: User;
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


export type MutationCreateProjectArgs = {
  data: CreateProjectInput;
};


export type MutationDeleteAccessProjectArgs = {
  projectId: Scalars['Float']['input'];
  userId: Scalars['Float']['input'];
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
  findProjectById: Project;
  findProjectByName: Project;
  findUserByEmail: User;
  findUserById: User;
  findUserByPseudo: User;
  listAccesProject: Array<Project>;
  listLikeProject: Array<Project>;
  listProjects: Array<Project>;
  listProjectsByCategory: Array<Project>;
  listPublicProjects: Array<Project>;
  listUsers: Array<User>;
  listUsersByRole: Array<User>;
  listUsersLikesPerProject: Array<User>;
  login: Message;
  logout: Message;
  search: Array<File>;
};


export type QueryCountLikesPerProjectArgs = {
  projectId: Scalars['Float']['input'];
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


export type QueryListLikeProjectArgs = {
  userId: Scalars['Float']['input'];
};


export type QueryListProjectsByCategoryArgs = {
  category: Scalars['String']['input'];
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


export type QuerySearchArgs = {
  term: Scalars['String']['input'];
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

export type RegisterMutationVariables = Exact<{
  data: CreateUserInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'User', pseudo: string, run_counter: number, role: string, password: string, lastname: string, firstname: string, email: string, ban: boolean } };

export type SearchQueryQueryVariables = Exact<{
  searchTerm: Scalars['String']['input'];
}>;


export type SearchQueryQuery = { __typename?: 'Query', search: Array<{ __typename?: 'File', id: string, name: string, category: string, project_id: string }> };


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
export const SearchQueryDocument = gql`
    query SearchQuery($searchTerm: String!) {
  search(term: $searchTerm) {
    id
    name
    category
    project_id
  }
}
    `;

/**
 * __useSearchQueryQuery__
 *
 * To run a query within a React component, call `useSearchQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchQueryQuery({
 *   variables: {
 *      searchTerm: // value for 'searchTerm'
 *   },
 * });
 */
export function useSearchQueryQuery(baseOptions: Apollo.QueryHookOptions<SearchQueryQuery, SearchQueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchQueryQuery, SearchQueryQueryVariables>(SearchQueryDocument, options);
      }
export function useSearchQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchQueryQuery, SearchQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchQueryQuery, SearchQueryQueryVariables>(SearchQueryDocument, options);
        }
export function useSearchQuerySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<SearchQueryQuery, SearchQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SearchQueryQuery, SearchQueryQueryVariables>(SearchQueryDocument, options);
        }
export type SearchQueryQueryHookResult = ReturnType<typeof useSearchQueryQuery>;
export type SearchQueryLazyQueryHookResult = ReturnType<typeof useSearchQueryLazyQuery>;
export type SearchQuerySuspenseQueryHookResult = ReturnType<typeof useSearchQuerySuspenseQuery>;
export type SearchQueryQueryResult = Apollo.QueryResult<SearchQueryQuery, SearchQueryQueryVariables>;