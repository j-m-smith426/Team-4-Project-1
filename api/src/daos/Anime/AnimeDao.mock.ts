
import { getRandomInt } from '@shared/functions';
import { IAnimeDao } from './AnimeDao';
import { DeleteCommand, GetCommand, PutCommand, QueryCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { ddbDoc } from '@daos/DB/Dynamo';
import { IAnime } from '@entities/Anime';


const TABLE = "Scouter";
class AnimeDao implements IAnimeDao {
    public table = TABLE;

    public async getOne(name: string): Promise<IAnime| null> {

        const params = {
            TableName: TABLE,
            Key:{
                TYPEID:'A#'+name,
                REFERENCE:"0",
            },
        };
        try {
            const data = await ddbDoc.send(new GetCommand(params));
        
           
            return data.Item as IAnime;
          } catch (err) {
            console.log("Error", err);
          }

        return null;
    }

    public async getAll() {
        const params = {
            TableName: TABLE,
            FilterExpression: "begins_with(TYPEID, :atag)",
            ExpressionAttributeValues: {
                ":atag": "A#"
              }
        };
        try {
            const data = await ddbDoc.send(new ScanCommand(params));
            console.log("Success :", data.Items);
            return Promise.resolve(data.Items);
        } catch (err) {
            console.log("Error", err);
        }
    }


    public async add(anime: IAnime): Promise<void> {
        console.log(anime);
        const params = {
            TableName: this.table,
            Item: anime
        }
        await ddbDoc.send(new PutCommand(params));
    }


    /*public async update(anime: IAnime): Promise<void> {
        const db = await super.openDb();
        for (let i = 0; i < db.anime.length; i++) {
            if (db.anime[i].id === anime.id) {
                db.anime[i] = user;
                await super.saveDb(db);
                return;
            }
        }
        throw new Error('Anime not found');
    }


    public async delete(id: number): Promise<void> {
        const db = await super.openDb();
        for (let i = 0; i < db.anime.length; i++) {
            if (db.anime[i].id === id) {
                db.anime.splice(i, 1);
                await super.saveDb(db);
                return;
            }
        }
        throw new Error('Anime not found');
    }*/
}

export default AnimeDao;
