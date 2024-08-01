export type GenerateLanguageProps =  {
    name : string,
    extension : string,
    language : string,
  }
  
  export type GetContributorsProps = {
    __typename?: "FindAllInfoUserAccessesProject";
    role: string;
    user?: {
      __typename?: "User";
      pseudo: string;
      id: string;
    } | null;
    created_at?: string;
    project_id?: string;
    updated_at?: string;
    user_id?: string;
  }
  
  export type GetOwnerUserProps = {
    __typename?: "User";
    pseudo: string;
    id: string;
  }