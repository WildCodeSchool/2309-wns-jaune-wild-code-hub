import { UserRole } from "../entities/userProjectAccesses.entity";

const fakeUsersProjectsAccesses = [
  {
    user_id: 1,
    project_id: 1,
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
    role: "EDITOR" as UserRole,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    user_id: 1,
    project_id: 5,
    role: "EDITOR" as UserRole,
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
    role: "VIEWER" as UserRole,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    user_id: 2,
    project_id: 3,
    role: "EDITOR" as UserRole,
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
];

export default fakeUsersProjectsAccesses;