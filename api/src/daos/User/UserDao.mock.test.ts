import { IUser } from "@entities/User";
import UserDao from "./UserDao.mock";

async function addGet() {
  test("Testing the adding and retreiving of One User", async () => {
    let id = "testId";
    let email = "testEmail@mail.com";
    let name = "test";
    let followed: string[];
    let testUser: IUser = {
      TYPEID: "U#" + id,
      REFERENCE: "0",
      email,
<<<<<<< HEAD
=======
      followed: [],
>>>>>>> f6ddbd926e6b17a256a585ed4dffe47b699c72be
    };
    const user = new UserDao();
    await user.add(testUser);
    expect(await user.getOne(id)).toStrictEqual(testUser);
  });
}
addGet();

async function getAllUsers(){
  test('Testing to retrieve all users', async () => {
    const user = new UserDao();
    expect(user.getAll()).toBeDefined();
  })
}
getAllUsers();
