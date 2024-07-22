import { UserRole } from "../entities/userProjectAccesses.entity";

const fakeUsersProjectsAccesses = [
  {
    user_id: 1,
    project_id: 1,
    role: "OWNER" as UserRole,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    user_id: 2,
    project_id: 2,
    role: "OWNER" as UserRole,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    user_id: 1,
    project_id: 2,
    role: "EDITOR" as UserRole,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    user_id: 2,
    project_id: 1,
    role: "EDITOR" as UserRole,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    user_id: 3,
    project_id: 1,
    role: "VIEWER" as UserRole,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    user_id: 2,
    project_id: 4,
    role: "OWNER" as UserRole,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    user_id: 1,
    project_id: 5,
    role: "OWNER" as UserRole,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    user_id: 1,
    project_id: 6,
    role: "EDITOR" as UserRole,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    user_id: 3,
    project_id: 6,
    role: "OWNER" as UserRole,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    user_id: 2,
    project_id: 3,
    role: "OWNER" as UserRole,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    user_id: 1,
    project_id: 3,
    role: "VIEWER" as UserRole,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    user_id: 3,
    project_id: 3,
    role: "VIEWER" as UserRole,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    user_id: 1,
    project_id: 7,
    role: "OWNER" as UserRole,
    created_at: new Date(),
    updated_at: new Date(),
  },
];

export default fakeUsersProjectsAccesses;