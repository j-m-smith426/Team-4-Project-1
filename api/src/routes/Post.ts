import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';

import PostDao from '../daos/Post/PostDao.mock';
import { badIDError, paramMissingError } from '../shared/constants';
import Comment from '../entities/Post'

const postDao = new PostDao();
const { BAD_REQUEST, CREATED, OK } = StatusCodes;



/**
 * Get all users.
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export async function getAllComments(req: Request, res: Response) {
    const { subject } = req.params;
    const users = await postDao.getAllComments(subject);
    return res.status(OK).json({users});
}


/**
 * Add one user.
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export async function addOneComment(req: Request, res: Response) {
    console.log(req.body);
    let{ comment } = req.body;
    console.log(comment);
    comment = Comment.prototype.normalize(comment);
    if (!comment || comment.TYPEID === "#") {
        return res.status(BAD_REQUEST).json({
            error: badIDError,
        });
    }
    await postDao.addComment(comment);
    return res.status(CREATED).end();
}


/**
 * Update one user.
 * 
 * @param req 
 * @param res 
 * @returns 
 */
/*export async function updateOneUser(req: Request, res: Response) {
    const { user } = req.body;
    if (!user) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    user.TYPEID = Number(user.TYPEID);
    await userDao.update(user);
    return res.status(OK).end();
}*/


/**
 * Delete one user.
 * 
 * @param req 
 * @param res 
 * @returns 
 */
/*export async function deleteOneUser(req: Request, res: Response) {
    const { id } = req.params;
    await userDao.delete(Number(id));
    return res.status(OK).end();
}*/
