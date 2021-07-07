import { IComment } from "@entities/Post";

export interface IPostDao {
  getOne: (postID: string) => Promise<IComment | undefined>;
  getAllPageComments: (subjectID: string) => Promise<any>;
  getAllPostComments: (postID: string) => Promise<IComment[] | undefined>;
  addComment: (comment: IComment) => Promise<void>;
  //update: (user: IUser) => Promise<void>;
  //delete: (id: number) => Promise<void>;
}

class PostDao implements IPostDao {
  /**
   *
   * @param postID
   * @returns
   */

  public async getOne(postID: string): Promise<IComment | undefined> {
    //TODO
    return Promise.resolve(undefined);
  }

  public async getAllPostComments(
    postID: string
  ): Promise<IComment[] | undefined> {
    //TODO
    return Promise.resolve(undefined);
  }

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
  public getAllPageComments(): Promise<any> {
    // TODO
    return Promise.resolve([]);
  }
}

export default PostDao;
