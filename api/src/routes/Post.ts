import StatusCodes from "http-status-codes";
import { Request, Response } from "express";

import PostDao from "../daos/Post/PostDao.mock";
import { badIDError, paramMissingError } from "../shared/constants";
import Comment from "../entities/Post";

const postDao = new PostDao();
const { BAD_REQUEST, CREATED, OK } = StatusCodes;

/**
 * Get all users.
 *
 * @param req
 * @param res
 * @returns
 */
export async function getAllPageComments(req: Request, res: Response) {
  const { subject } = req.params;

  if (!subject) {
    return res.status(BAD_REQUEST).json({
      error: paramMissingError,
    });
  }
  const users = await postDao.getAllPageComments(subject);
  return res.status(OK).json({ users });
}
/**
 *
 * @param req
 * @param res
 * @returns
 */
export async function getAllPostComments(req: Request, res: Response) {
  const { subject } = req.params;

  if (!subject) {
    return res.status(BAD_REQUEST).json({
      error: paramMissingError,
    });
  }
  const users = await postDao.getAllPostComments(subject);
  return res.status(OK).json({ users });
}

/**
 * Add one user.
 *
 * @param req
 * @param res
 * @returns
 */
export async function addOneComment(req: Request, res: Response) {
  let { comment } = req.body;

  comment = Comment.normalize(comment);
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
