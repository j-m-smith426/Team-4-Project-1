import User, { IUser } from "./User";

function createUser(){
    let id = 'testId';
    let email = 'testEmail@mail.com';
    let name = 'test';
    let result:IUser = {
        TYPEID:'U#'+id,
        REFERENCE:"0",
        email,
        username:name

    };

    test(`Make new user with typeid:U#${id}, email: ${email},Reference: 0, and username:${name}`,() => {
        let newUser:User = new User(id,email,name);
        
        expect(newUser).toEqual(result);
    })

}
createUser();

function checkUserId(){
    test(`Checks to make sure typeID is reformatted if it begins with U#`,() => {
        let id = 'U#blah';
        let email = 'testEmail@mail.com';
        let name = 'test';
        let result:IUser = {
            TYPEID: id,
            REFERENCE:"0",
            email,
            username:name
        };
        let newUser:User = new User(id,email,name);
        expect(newUser.TYPEID).toEqual(result.TYPEID);
    })
    test(`Checks to make sure typeID is reformatted if it has a hash`,() => {
        let id = '#blah';
        let email = 'testEmail@mail.com';
        let name = 'test';
        let result:IUser = {
            TYPEID: '#',
            REFERENCE:"0",
            email,
            username:name
        };
        let newUser:User = new User(id,email,name);
        expect(newUser.TYPEID).toEqual(result.TYPEID);
    })

}
checkUserId();
