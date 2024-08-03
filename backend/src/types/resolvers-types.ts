import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CreateFileInput: CreateFileInput;
  CreateProjectInput: CreateProjectInput;
  CreateUserInput: CreateUserInput;
  CreateUserProjectAccessesInput: CreateUserProjectAccessesInput;
  DateTimeISO: ResolverTypeWrapper<Scalars['DateTimeISO']['output']>;
  DeleteUserInput: DeleteUserInput;
  DeleteUserProjectAccessesInput: DeleteUserProjectAccessesInput;
  File: ResolverTypeWrapper<File>;
  FindAllInfoUserAccessesProject: ResolverTypeWrapper<FindAllInfoUserAccessesProject>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  InputLogin: InputLogin;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Message: ResolverTypeWrapper<Message>;
  Mutation: ResolverTypeWrapper<{}>;
  PaginatedProjects: ResolverTypeWrapper<PaginatedProjects>;
  Project: ResolverTypeWrapper<Project>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  UpdateFileInput: UpdateFileInput;
  UpdateProjectInput: UpdateProjectInput;
  UpdateUserInput: UpdateUserInput;
  UpdateUserProjectAccessesInput: UpdateUserProjectAccessesInput;
  User: ResolverTypeWrapper<User>;
  UserAccessProjectOutput: ResolverTypeWrapper<UserAccessProjectOutput>;
  UserAccessProjectResponse: ResolverTypeWrapper<UserAccessProjectResponse>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean']['output'];
  CreateFileInput: CreateFileInput;
  CreateProjectInput: CreateProjectInput;
  CreateUserInput: CreateUserInput;
  CreateUserProjectAccessesInput: CreateUserProjectAccessesInput;
  DateTimeISO: Scalars['DateTimeISO']['output'];
  DeleteUserInput: DeleteUserInput;
  DeleteUserProjectAccessesInput: DeleteUserProjectAccessesInput;
  File: File;
  FindAllInfoUserAccessesProject: FindAllInfoUserAccessesProject;
  Float: Scalars['Float']['output'];
  ID: Scalars['ID']['output'];
  InputLogin: InputLogin;
  Int: Scalars['Int']['output'];
  Message: Message;
  Mutation: {};
  PaginatedProjects: PaginatedProjects;
  Project: Project;
  Query: {};
  String: Scalars['String']['output'];
  UpdateFileInput: UpdateFileInput;
  UpdateProjectInput: UpdateProjectInput;
  UpdateUserInput: UpdateUserInput;
  UpdateUserProjectAccessesInput: UpdateUserProjectAccessesInput;
  User: User;
  UserAccessProjectOutput: UserAccessProjectOutput;
  UserAccessProjectResponse: UserAccessProjectResponse;
}>;

export type OneOfDirectiveArgs = { };

export type OneOfDirectiveResolver<Result, Parent, ContextType = any, Args = OneOfDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export interface DateTimeIsoScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTimeISO'], any> {
  name: 'DateTimeISO';
}

export type FileResolvers<ContextType = any, ParentType extends ResolversParentTypes['File'] = ResolversParentTypes['File']> = ResolversObject<{
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  created_at?: Resolver<ResolversTypes['DateTimeISO'], ParentType, ContextType>;
  extension?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  language?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  update_at?: Resolver<ResolversTypes['DateTimeISO'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FindAllInfoUserAccessesProjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['FindAllInfoUserAccessesProject'] = ResolversParentTypes['FindAllInfoUserAccessesProject']> = ResolversObject<{
  created_at?: Resolver<ResolversTypes['DateTimeISO'], ParentType, ContextType>;
  project?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType>;
  project_id?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updated_at?: Resolver<ResolversTypes['DateTimeISO'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  user_id?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MessageResolvers<ContextType = any, ParentType extends ResolversParentTypes['Message'] = ResolversParentTypes['Message']> = ResolversObject<{
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  addAccessProject?: Resolver<ResolversTypes['UserAccessProjectResponse'], ParentType, ContextType, RequireFields<MutationAddAccessProjectArgs, 'data'>>;
  addLikeProject?: Resolver<ResolversTypes['Message'], ParentType, ContextType, RequireFields<MutationAddLikeProjectArgs, 'projectId'>>;
  createFile?: Resolver<ResolversTypes['File'], ParentType, ContextType, RequireFields<MutationCreateFileArgs, 'data'>>;
  createProject?: Resolver<ResolversTypes['Project'], ParentType, ContextType, RequireFields<MutationCreateProjectArgs, 'data'>>;
  deleteAccessProject?: Resolver<ResolversTypes['Message'], ParentType, ContextType, RequireFields<MutationDeleteAccessProjectArgs, 'data'>>;
  deleteFile?: Resolver<ResolversTypes['Message'], ParentType, ContextType, RequireFields<MutationDeleteFileArgs, 'id'>>;
  deleteLikeProject?: Resolver<ResolversTypes['Message'], ParentType, ContextType, RequireFields<MutationDeleteLikeProjectArgs, 'projectId'>>;
  deleteProject?: Resolver<ResolversTypes['Message'], ParentType, ContextType, RequireFields<MutationDeleteProjectArgs, 'id'>>;
  deleteUser?: Resolver<ResolversTypes['Message'], ParentType, ContextType, RequireFields<MutationDeleteUserArgs, 'data'>>;
  login?: Resolver<ResolversTypes['Message'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'infos'>>;
  register?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationRegisterArgs, 'data'>>;
  updateAccessProject?: Resolver<ResolversTypes['Message'], ParentType, ContextType, RequireFields<MutationUpdateAccessProjectArgs, 'data'>>;
  updateFile?: Resolver<ResolversTypes['Message'], ParentType, ContextType, RequireFields<MutationUpdateFileArgs, 'data'>>;
  updateMultipleFiles?: Resolver<Array<ResolversTypes['Message']>, ParentType, ContextType, RequireFields<MutationUpdateMultipleFilesArgs, 'data'>>;
  updateProject?: Resolver<ResolversTypes['Message'], ParentType, ContextType, RequireFields<MutationUpdateProjectArgs, 'data'>>;
  updateUser?: Resolver<ResolversTypes['Message'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'data'>>;
}>;

export type PaginatedProjectsResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaginatedProjects'] = ResolversParentTypes['PaginatedProjects']> = ResolversObject<{
  limit?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  offset?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  projects?: Resolver<Array<ResolversTypes['Project']>, ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['Project'] = ResolversParentTypes['Project']> = ResolversObject<{
  category?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  created_at?: Resolver<ResolversTypes['DateTimeISO'], ParentType, ContextType>;
  files?: Resolver<Array<ResolversTypes['File']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  private?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  update_at?: Resolver<ResolversTypes['DateTimeISO'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  countLikesPerProject?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<QueryCountLikesPerProjectArgs, 'projectId'>>;
  findFileById?: Resolver<ResolversTypes['File'], ParentType, ContextType, RequireFields<QueryFindFileByIdArgs, 'id'>>;
  findProjectById?: Resolver<ResolversTypes['Project'], ParentType, ContextType, RequireFields<QueryFindProjectByIdArgs, 'id'>>;
  findProjectByName?: Resolver<ResolversTypes['Project'], ParentType, ContextType, RequireFields<QueryFindProjectByNameArgs, 'name'>>;
  findProjectOwner?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryFindProjectOwnerArgs, 'projectId'>>;
  findUserByEmail?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryFindUserByEmailArgs, 'email'>>;
  findUserById?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryFindUserByIdArgs, 'id'>>;
  findUserByPseudo?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryFindUserByPseudoArgs, 'pseudo'>>;
  listAccesProject?: Resolver<Array<ResolversTypes['Project']>, ParentType, ContextType, RequireFields<QueryListAccesProjectArgs, 'userId'>>;
  listFilesByProject?: Resolver<Array<ResolversTypes['File']>, ParentType, ContextType, RequireFields<QueryListFilesByProjectArgs, 'project_id'>>;
  listLikeProject?: Resolver<Array<ResolversTypes['Project']>, ParentType, ContextType, RequireFields<QueryListLikeProjectArgs, 'userId'>>;
  listProjects?: Resolver<Array<ResolversTypes['Project']>, ParentType, ContextType>;
  listProjectsAccessesUser?: Resolver<Array<ResolversTypes['FindAllInfoUserAccessesProject']>, ParentType, ContextType, RequireFields<QueryListProjectsAccessesUserArgs, 'user_id'>>;
  listProjectsByCategory?: Resolver<Array<ResolversTypes['Project']>, ParentType, ContextType, RequireFields<QueryListProjectsByCategoryArgs, 'category'>>;
  listProjectsByUser?: Resolver<Array<ResolversTypes['Project']>, ParentType, ContextType, RequireFields<QueryListProjectsByUserArgs, 'id'>>;
  listProjectsByUserWithRole?: Resolver<Array<ResolversTypes['UserAccessProjectOutput']>, ParentType, ContextType, RequireFields<QueryListProjectsByUserWithRoleArgs, 'id'>>;
  listProjectsPublicLikeByUser?: Resolver<Array<ResolversTypes['Project']>, ParentType, ContextType, RequireFields<QueryListProjectsPublicLikeByUserArgs, 'userID'>>;
  listPublicProjects?: Resolver<ResolversTypes['PaginatedProjects'], ParentType, ContextType, RequireFields<QueryListPublicProjectsArgs, 'limit' | 'offset'>>;
  listPublicProjectsByName?: Resolver<Array<ResolversTypes['Project']>, ParentType, ContextType, RequireFields<QueryListPublicProjectsByNameArgs, 'name'>>;
  listPublicProjectsOwnedByUser?: Resolver<Array<ResolversTypes['UserAccessProjectOutput']>, ParentType, ContextType, RequireFields<QueryListPublicProjectsOwnedByUserArgs, 'id'>>;
  listUsers?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  listUsersAccessesProject?: Resolver<Array<ResolversTypes['FindAllInfoUserAccessesProject']>, ParentType, ContextType, RequireFields<QueryListUsersAccessesProjectArgs, 'project_id'>>;
  listUsersByPseudo?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryListUsersByPseudoArgs, 'pseudo'>>;
  listUsersByRole?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryListUsersByRoleArgs, 'role'>>;
  listUsersLikesPerProject?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryListUsersLikesPerProjectArgs, 'projectId'>>;
  logout?: Resolver<ResolversTypes['Message'], ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  ban?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  created_at?: Resolver<ResolversTypes['DateTimeISO'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstname?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  last_login?: Resolver<ResolversTypes['DateTimeISO'], ParentType, ContextType>;
  lastname?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pseudo?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  run_counter?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  update_at?: Resolver<ResolversTypes['DateTimeISO'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserAccessProjectOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserAccessProjectOutput'] = ResolversParentTypes['UserAccessProjectOutput']> = ResolversObject<{
  project?: Resolver<ResolversTypes['Project'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserAccessProjectResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserAccessProjectResponse'] = ResolversParentTypes['UserAccessProjectResponse']> = ResolversObject<{
  listUsersAccessesProjectData?: Resolver<Array<ResolversTypes['FindAllInfoUserAccessesProject']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['Message']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  DateTimeISO?: GraphQLScalarType;
  File?: FileResolvers<ContextType>;
  FindAllInfoUserAccessesProject?: FindAllInfoUserAccessesProjectResolvers<ContextType>;
  Message?: MessageResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  PaginatedProjects?: PaginatedProjectsResolvers<ContextType>;
  Project?: ProjectResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserAccessProjectOutput?: UserAccessProjectOutputResolvers<ContextType>;
  UserAccessProjectResponse?: UserAccessProjectResponseResolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = any> = ResolversObject<{
  oneOf?: OneOfDirectiveResolver<any, any, ContextType>;
}>;
