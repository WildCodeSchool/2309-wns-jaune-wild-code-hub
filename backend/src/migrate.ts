import { User } from "./entities/user.entity";
import fakeUsers from "./fakeData/user";
import { Project } from "./entities/project.entity";
import fakeProjects from "./fakeData/project";

export default async function migrate (db : any) {

    //Migrate User
    await db.getRepository(User).clear();
    await db.query('ALTER SEQUENCE user_id_seq RESTART WITH 1');
    const userRepository = db.getRepository(User);
    await userRepository.save(fakeUsers);

    //Migrate Project
    await db.getRepository(Project).clear();
    await db.query('ALTER SEQUENCE project_id_seq RESTART WITH 1');
    const projectRepository = db.getRepository(Project);
    await projectRepository.save(fakeProjects);


    console.log("Succes migrate database !")
}  