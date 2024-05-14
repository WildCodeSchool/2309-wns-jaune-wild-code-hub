import { User } from "./entities/user.entity";
import fakeUsers from "./fakeData/user";
import { Project } from "./entities/project.entity";
import fakeProjects from "./fakeData/project";
import { File } from "./entities/file.entity";
import fakeFile from "./fakeData/file";
import * as argon2 from "argon2";
import db from "./lib/db";

async function migrate() {
  // Vérifie si la variable d'environnement est définie et égale à true
  if (process.env.RUN_MIGRATION === "true") {
    for (let i = 0; i < fakeUsers.length; i++) {
      const newPassword = await argon2.hash(fakeUsers[i].password);
      fakeUsers[i].password = newPassword;
    }

    await db.initialize();

    // Migrate User
    await db.getRepository(User).clear();
    await db.query("ALTER SEQUENCE user_id_seq RESTART WITH 1");
    const userRepository = db.getRepository(User);
    await userRepository.save(fakeUsers);

    // Migrate Project
    await db.getRepository(Project).clear();
    await db.query("ALTER SEQUENCE project_id_seq RESTART WITH 1");
    const projectRepository = db.getRepository(Project);
    await projectRepository.save(fakeProjects);

    // Migrate File
    // await db.getRepository(File).clear();
    // await db.query("ALTER SEQUENCE file_id_seq RESTART WITH 1");
    // const fileRepository = db.getRepository(File);
    // await fileRepository.save(fakeFile);

    console.log("Succes migrate database !");
  } else {
    console.log("Migration skipped.");
  }
}

migrate().catch(console.error);
