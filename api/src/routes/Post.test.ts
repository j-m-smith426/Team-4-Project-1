import { addOneComment } from "./Post";
import {getMockReq, getMockRes} from '@jest-mock/express'




describe('addOneComment', () => {
    test('should return 400 if id is invlid', async() =>{
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
        await addOneComment(req,res);
        expect(res.status).toHaveBeenCalledWith(400)
        

    });

    test('should return 201 and json comment', async() => {
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
        await addOneComment(req,res);
        expect(res.status).toHaveBeenCalledWith(201);
    })
})