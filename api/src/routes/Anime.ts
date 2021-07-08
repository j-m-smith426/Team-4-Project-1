import StatusCodes from "http-status-codes";
import { Request, Response } from "express";
import { badIDError } from "@shared/constants";
import Anime from "@entities/Anime";
import AnimeDao from "@daos/Anime/AnimeDao.mock";

const animeDao = new AnimeDao();
const { BAD_REQUEST, CREATED, OK } = StatusCodes;

/**
 * Get all users.
 *
 * @param req
 * @param res
 * @returns
 */
export async function getAllAnime(req: Request, res: Response) {
  const anime = await animeDao.getAll();
  return res.status(OK).json({ anime });
}

/**
 * Add one user.
 *
 * @param req
 * @param res
 * @returns
 */
export async function addOneAnime(req: Request, res: Response) {
  console.log(req.body);
  let { anime } = req.body;
  console.log(anime);
  anime = Anime.normalize(anime);
  if (!anime || anime.TYPEID === "#") {
    return res.status(BAD_REQUEST).json({
      error: badIDError,
    });
  }
  await animeDao.add(anime);
  return res.status(CREATED).end();
}



export async function getOneAnime(req: Request, res: Response) {
  
  let { subject } = req.params;
  if (!subject ) {
    return res.status(BAD_REQUEST).json({
      error: badIDError,
    });
  }
  let anime = await animeDao.getOne(subject)
  console.log(anime);
  return res.status(OK).json(anime);
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
