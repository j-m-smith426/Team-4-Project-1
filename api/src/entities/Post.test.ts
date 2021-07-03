import Comment, {IComment} from "./Post";

describe("The post entity should do the following", () =>{
    let id = 'testId';
    let ref = 'test#P#001';
    let user1:IComment = {
        TYPEID:'U#'+id,
        content:'This is a post',
        REFERENCE: ref

    };
    it('should create a Post with TYPEID:U#testID, content: This is a post, and REFERENCE: test#P#001', () => {
        let newPost:Comment = new Comment('U#'+id,'This is a post', ref);
        expect(newPost).toEqual(user1);
    })


    id = 'testId';
    ref = 'test#P#001';
    let bad:IComment = {
        TYPEID:'#',
        content:'This is a post',
        REFERENCE: ref

    };
    it('should recognize a bad post formatted incorrectly', () => {
        let newPost:Comment = new Comment(id,'This is a post', ref);
        expect(Comment.normalize(newPost)).toEqual(bad);
    });
});
