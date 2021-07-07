import { IAnime } from "@entities/Anime";
import { IComment } from "@entities/Post";
import { IUser } from "@entities/User";

declare module 'express' {
    export interface Request  {
        body: {
            user: IUser,
            Page:string,
            anime: IAnime,
            comment: IComment,
        };
    }
}
