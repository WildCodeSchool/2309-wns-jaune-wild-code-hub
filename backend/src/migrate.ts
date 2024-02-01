import { User } from "./entities/user.entity";
import fakeUsers from "./fakeData/user";

export default async function migrate (db : any) {

    //Migrate User
    await db.getRepository(User).clear();
    await db.query('ALTER SEQUENCE user_id_seq RESTART WITH 1');
    const userRepository = db.getRepository(User);
    await userRepository.save(fakeUsers);

    console.log("Succes migrate database !")
}  