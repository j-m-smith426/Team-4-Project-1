import User, { IUser } from "./User";

function createUser(){
    let id = 'testId';
    let email = 'testEmail@mail.com';
    let name = 'test';
    let result:IUser = {
        TYPEID:'U#'+id,
        REFERENCE:"0",
        email,
        username:name,
        followed:[]
    };

    test(`Make new user with typeid:U#${id}, email: ${email},Reference: 0, and username:${name}`,() => {
        let newUser:User = new User(id,email,name);
        
        expect(newUser).toEqual(result);
    })

}
createUser();