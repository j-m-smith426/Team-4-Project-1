import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';

import UserDao from '@daos/User/UserDao.mock';
import { badIDError, paramMissingError } from '@shared/constants';
import User from '@entities/User';

const userDao = new UserDao();
const { BAD_REQUEST, CREATED, OK } = StatusCodes;


/**
 * Get all users.
 * 
 * @param req 
 * @param res 
 * @returns 
 */
 export async function getOneUser(req: Request, res: Response) {
    const user = req.params.user;
    if (!user) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    const users = await userDao.getOne(user);
    return res.status(OK).json({users});
}

/**
 * Get all users.
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export async function getAllUsers(req: Request, res: Response) {
    const users = await userDao.getAll();
    return res.status(OK).json({users});
}


/**
 * Add one user.
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export async function addOneUser(req: Request, res: Response) {
    console.log(req.body);
    let{ user } = req.body;
    console.log(user);
    user = User.normalize(user);
    if (!user || user.TYPEID === "#") {
        return res.status(BAD_REQUEST).json({
            error: badIDError,
        });
    }
    await userDao.add(user);
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
