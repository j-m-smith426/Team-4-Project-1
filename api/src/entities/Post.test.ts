import Comment, {IComment} from "./Post";

function createPost(){
    let id = 'testId';
    let ref = 'test#P#001';
    let user1:IComment = {
        TYPEID:'U#'+id,
        content:'This is a post',
        REFERENCE: ref

    };
    test('Create Post with TYPEID:U#testID, content: This is a post, and REFERENCE: test#P#001', () => {
        let newPost:Comment = new Comment('U#'+id,'This is a post', ref);
        expect(newPost).toEqual(user1);
    })
}

function badPost(){
    let id = 'testId';
    let ref = 'test#P#001';
    let bad:IComment = {
        TYPEID:'#',
        content:'This is a post',
        REFERENCE: ref

    };
    test('Create Bad Post with TYPEID:testID', () => {
        let newPost:Comment = new Comment(id,'This is a post', ref);
        expect(Comment.prototype.normalize(newPost)).toEqual(bad);
    });
}
createPost();
badPost();