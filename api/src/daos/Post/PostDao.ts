import { IComment } from '@entities/Post';



export interface IPostDao {
    //getOne: (email: string) => Promise<IUser | null>;
    getAllComments: (subjectID:string) => Promise<any>;
    addComment: (comment: IComment) => Promise<void>;
    //update: (user: IUser) => Promise<void>;
    //delete: (id: number) => Promise<void>;
}

class PostDao implements IPostDao {
       /**
     *
     * @param comment
     */
    public async addComment(comment: IComment): Promise<void> {
        // TODO
       return Promise.resolve(undefined);
   }


    /**
     *
     */
    public getAllComments(): Promise<any> {
         // TODO
        return Promise.resolve([]);
    }
}

export default PostDao;
