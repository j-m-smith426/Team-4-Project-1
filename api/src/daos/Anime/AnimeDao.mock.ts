
import { getRandomInt } from '@shared/functions';
import { IAnimeDao } from './AnimeDao';
import { DeleteCommand, PutCommand, QueryCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { ddbDoc } from '@daos/DB/Dynamo';
import { IAnime } from '@entities/Anime';


const TABLE = "Scouter";
class AnimeDao implements IAnimeDao {
    public table = TABLE;

    /*public async getOne(email: string): Promise<IUser | null> {
        return null;
    }*/


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

    public async add(anime: IAnime): Promise<void> {
        console.log(anime);
        const params = {
            TableName: this.table,
            Item: anime
        }
        await ddbDoc.send(new PutCommand(params));
    }


    /*public async update(user: IUser): Promise<void> {
        const db = await super.openDb();
        for (let i = 0; i < db.users.length; i++) {
            if (db.users[i].id === user.id) {
                db.users[i] = user;
                await super.saveDb(db);
                return;
            }
        }
        throw new Error('User not found');
    }


    public async delete(id: number): Promise<void> {
        const db = await super.openDb();
        for (let i = 0; i < db.users.length; i++) {
            if (db.users[i].id === id) {
                db.users.splice(i, 1);
                await super.saveDb(db);
                return;
            }
        }
        throw new Error('User not found');
    }*/
}

export default AnimeDao;
