import { addOneComment, getAllPageComments, getAllPostComments } from "./Post";
import Comment from "../entities/Post";
import {getMockReq, getMockRes} from '@jest-mock/express'
import PostDao from '../daos/Post/PostDao.mock';

jest.mock('../entities/Post');
jest.mock('../daos/Post/PostDao.mock')
const CommentMocked = Comment as jest.MockedClass<typeof Comment>
const PostDaoMocked = PostDao as jest.MockedClass<typeof PostDao>;
describe("Get all Comments", () =>{
    it('should get all comments with valid params',async() => {
        const req = getMockReq({
            params:{
                subject:'User1'
                
            }
        });
        const {res, next, mockClear} = getMockRes();
        mockClear();
        await getAllPageComments(req,res);
        expect(res.status).toHaveBeenCalledWith(200);
    });

    it('should return as an error if there are no params', async() => {
        const req = getMockReq();
        const {res, next, mockClear} = getMockRes();
        mockClear();
        await getAllPageComments(req,res);
        expect(res.status).toHaveBeenCalledWith(400);
    })

})

describe("Get all Post Comments", () =>{
    it('should get all comments with valid params',async() => {
        const req = getMockReq({
            params:{
                subject:'User1'
                
            }
        });
        const {res, next, mockClear} = getMockRes();
        mockClear();
        await getAllPostComments(req,res);
        expect(res.status).toHaveBeenCalledWith(200);
    });

    it('should return as an error if there are no params', async() => {
        const req = getMockReq();
        const {res, next, mockClear} = getMockRes();
        mockClear();
        await getAllPostComments(req,res);
        expect(res.status).toHaveBeenCalledWith(400);
    })

})


describe('addOneComment', () => {
    it('should return 400 if id is invlid', async() =>{
        const req = getMockReq({
            body:{
                comment:{
                    TYPEID:'test',
                    content:'This is a post',
                    REFERENCE: 'test#P#001'   
                }
            }
        });
        
        const {res, next, mockClear} = getMockRes();
        mockClear();
        CommentMocked.mockClear();
        CommentMocked.normalize.mockReturnValue({TYPEID:'#'});
        await addOneComment(req,res);
        expect(res.status).toHaveBeenCalledWith(400)
        

    });

    it('should return 201', async() => {
        const req = getMockReq({
            body:{
                comment:{
                    TYPEID:'U#test',
                    content:'This is a post',
                    REFERENCE: 'test#P#001'   
                }
            }
        });
        const {res, next, mockClear} = getMockRes();
        mockClear();
        CommentMocked.mockClear();
        CommentMocked.normalize.mockReturnValue({TYPEID:'U#'});
        await addOneComment(req,res);
        expect(res.status).toHaveBeenCalledWith(201);
    })
})