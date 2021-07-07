import { IAnime } from '@entities/Anime';




export interface IAnimeDao {
    //getOne: (email: string) => Promise<IAnime | null>;
    getAll: () => Promise<any>;
    add: (anime: IAnime) => Promise<void>;
    //update: (user: IAnime) => Promise<void>;
    //delete: (id: string) => Promise<void>;
}

class UserDao implements IAnimeDao {


    /**
     * @param id
     */
    public getOne(id: string): Promise<IAnime | null> {
        // TODO
        return Promise.resolve(null);
    }


    /**
     *
     */
    public getAll(): Promise<IAnime[]> {
         // TODO
        return Promise.resolve([]);
    }


    /**
     *
     * @param user
     */
    public async add(user: IAnime): Promise<void> {
         // TODO
        return Promise.resolve(undefined);
    }


    /**
     *
     * @param user
     */
    public async update(user: IAnime): Promise<void> {
         // TODO
        return Promise.resolve(undefined);
    }


    /**
     *
     * @param id
     */
    public async delete(id: string): Promise<void> {
         // TODO
        return Promise.resolve(undefined);
    }
}

export default UserDao;
