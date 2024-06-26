import { ROLE } from "../entities/user.entity";

const fakeUsers = [
  {
    lastname: "Renard",
    firstname: "Alexandre",
    pseudo: "Alexandre78R",
    email: "alexandre.renard98@gmail.com",
    password: "toto",
    role: "ADMIN"as ROLE,
    ban: false,
    run_counter: 1,
    last_login: new Date(),
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    lastname: "Millet",
    firstname: "Jean-Marc",
    pseudo: "JM",
    email: "jean-marc@example.com",
    password: "toto",
    role: "ADMIN"as ROLE,
    ban: false,
    run_counter: 1,
    last_login: new Date(),
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    lastname: "Doe",
    firstname: "John",
    pseudo: "johndoe",
    email: "john.doe@example.com",
    password: "password123",
    role: "USER"as ROLE,
    ban: false,
    run_counter: 1,
    last_login: new Date(),
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    lastname: "d",
    firstname: "d",
    pseudo: "d",
    email: "john.dode@example.com",
    password: "password123",
    role: "USER"as ROLE,
    ban: false,
    run_counter: 1,
    last_login: new Date(),
    created_at: new Date(),
    updated_at: new Date(),
  },
];

export default fakeUsers;