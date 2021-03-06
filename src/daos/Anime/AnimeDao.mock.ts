
import { getRandomInt } from '@shared/functions';
import { IAnimeDao } from './AnimeDao';
import { DeleteCommand, GetCommand, PutCommand, QueryCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { ddbDoc } from '../DB/Dynamo';
import { IAnime } from '@entities/Anime';


const TABLE = "Scouter";
class AnimeDao implements IAnimeDao {
    public table = TABLE;

    //retrieves one anime title name
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
        
           console.log(data.Item);
            return data.Item as IAnime;
          } catch (err) {
            console.log("Error", err);
          }

        return null;
    }

    //retrieves all anime titles in the db
    public async getAll() {
        const params = {
            TableName: TABLE,
            FilterExpression: "begins_with(TYPEID, :atag) and #r = :zero",
            ExpressionAttributeNames:{
                "#r": "REFERENCE"
            },
            ExpressionAttributeValues: {
                ":atag": "A#",
                ":zero": "0"
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
    // adds anime given correct parameters to db 
    public async add(anime: IAnime): Promise<void> {
        console.log(anime);
        const params = {
            TableName: this.table,
            Item: anime
        }
        await ddbDoc.send(new PutCommand(params));
    }

    public async getSome(name:string){
        const params = {
            TableName: TABLE,
            FilterExpression:
              "contains(TYPEID, :subject) AND #ref=:p AND begins_with(TYPEID, :atag)",
            ExpressionAttributeNames: {
              "#ref": "REFERENCE",
            },
            ExpressionAttributeValues: {
              ":subject": name,
              ":p":'0',
              ":atag": "A#"
            },
          };
          try {
            const data = await ddbDoc.send(new ScanCommand(params));
            console.log(data.Items);
            return Promise.resolve(data.Items);
          } catch (err) {
            console.log("Error", err);
          }
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
