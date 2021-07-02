import { IComment } from "@entities/Post";
import PostDao from "./PostDao.mock";

async function addGetAll(){
    let id = 'testId';
    let ref = 'test#P#001';
    let user1:IComment = {
        TYPEID:'U#'+id,
        content:'This is a post',
        REFERENCE: ref

    };
    test('add Comment and Retrieve it', async() =>{
        const post = new PostDao();
        await post.addComment(user1);

        expect(await post.getAllComments('U#'+id)).toStrictEqual([user1]);
    })
    

}
addGetAll();