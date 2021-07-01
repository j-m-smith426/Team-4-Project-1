import Comment, { IComment} from '@entities/Post';
import { getRandomInt } from '@shared/functions';
import { IPostDao } from './PostDao';
import MockDaoMock from '../MockDb/MockDao.mock';
import { DeleteCommand, PutCommand, QueryCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { ddbDoc } from '@daos/DB/Dynamo';


const TABLE = "Scouter";
class PostDao implements IPostDao {
    public table = TABLE;

    public async getAllComments(subjectID:string) {
        const params = {
            TableName: TABLE,
            KeyConditionExpression: "TYPEID = :subject",
            ExpressionAttributeValues: {
                ":subject": subjectID
              }
        };
        try {
            const data = await ddbDoc.send(new ScanCommand(params));
            console.log("Success :", data.Items);
            const regex = /#C#/g;
            const items = data.Items?.filter(i => i.REFERENCE.match(regex))
            return Promise.resolve(items);
        } catch (err) {
            console.log("Error", err);
        }
    }


    public async addComment(post: IComment): Promise<void> {
        console.log(post);
        const params = {
            TableName: this.table,
            Item: post
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

export default PostDao;