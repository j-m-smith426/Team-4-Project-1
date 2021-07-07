import { IUser } from "@entities/User";
import UserDao from "./UserDao.mock";

async function addGet() {
  test("Testing the adding and retreiving of One User", async () => {
    let id = "testId";
    let email = "testEmail@mail.com";
    let name = "test";
    let testUser: IUser = {
      TYPEID: "U#" + id,
      REFERENCE: "0",
      email
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
