import { stringify } from "querystring";
import User, { IUser } from "./User";

function createUser(){
    let id = 'testId';
    let email = 'testEmail@mail.com';
    let name = 'test';
    let followed: string[]
    let result:IUser = {
        TYPEID:'U#'+id,
        REFERENCE:"0",
        email,
        //username:name,
        followed:[]
    };

    test(`Make new user with typeid:U#${id}, email: ${email},Reference: 0, and username:${name}`,() => {
        let newUser:User = new User(id,email);
        
        expect(newUser).toEqual(result);
    })

}
createUser();

function checkUserId(){
    test(`Checks to make sure typeID is reformatted if it begins with U#`,() => {
        let id = 'U#blah';
        let email = 'testEmail@mail.com';
        let name = 'test';
        let followed: string[]
        let result:IUser = {
            TYPEID: id,
            REFERENCE:"0",
            email,
            followed: [],
        };
        let newUser:User = new User(id,email);
        expect(newUser.TYPEID).toEqual(result.TYPEID);
    })
    test(`Checks to make sure typeID is reformatted if it has a hash`,() => {
        let id = '#blah';
        let email = 'testEmail@mail.com';
        let name = 'test';
        let followed: string[]
        let result:IUser = {
            TYPEID: '#',
            REFERENCE:"0",
            email,
            followed: [],
        };
        let newUser:User = new User(id,email);
        expect(newUser.TYPEID).toEqual(result.TYPEID);
    })

}
checkUserId();

function normalizeId(){
    let id = 'U#stuff';
    let use: IUser = {
        TYPEID: 'U#stuff',
        REFERENCE:"0",
        email: "anything@rocketmail.com",
        followed: [],
    };
    test('Normalize typeid if it starts with U#', () => {
        let normal = User.normalize(use);
        expect(normal.TYPEID).toBe(id);
    });
    test('Normalize typeid to be #', () => {
        use.TYPEID = '#blah'; 
        let normal = User.normalize(use);
        expect(normal.TYPEID).toBe('#');
    });
    test('Normalize typeid to include U# if not already present', () => {
        use.TYPEID = 'tonkatsu';
        let uid = 'U#' + use.TYPEID;
        let normal = User.normalize(use);
        expect(normal.TYPEID).toBe(uid);
    })
}
normalizeId();