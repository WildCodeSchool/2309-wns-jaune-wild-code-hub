import { gql } from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTimeISO: { input: any; output: any; }
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
  deleteUser: Message;
  register: User;
  updateUser: Message;
};


export type MutationDeleteUserArgs = {
  id: Scalars['Float']['input'];
};


export type MutationRegisterArgs = {
  data: CreateUserInput;
};


export type MutationUpdateUserArgs = {
  data: UpdateUserInput;
};

export type Query = {
  __typename?: 'Query';
  findUserByEmail: User;
  findUserById: User;
  findUserByPseudo: User;
  listUsers: Array<User>;
  listUsersByRole: Array<User>;
  login: Message;
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


export type QueryListUsersByRoleArgs = {
  role: Scalars['String']['input'];
};


export type QueryLoginArgs = {
  infos: InputLogin;
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
