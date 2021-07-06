import User, { IUser } from '@entities/User';
import { getRandomInt } from '@shared/functions';
import { IUserDao } from './UserDao';
import MockDaoMock from '../MockDb/MockDao.mock';
import { DeleteCommand, PutCommand, QueryCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { ddbDoc } from '@daos/DB/Dynamo';


const TABLE = "Scouter";
class UserDao implements IUserDao {
    public table = TABLE;

    /*public async getOne(email: string): Promise<IUser | null> {
        return null;
    }*/


    public async getAll() {
        const params = {
            TableName: TABLE,
            FilterExpression: "begins_with(TYPEID, :utag)",
            ExpressionAttributeValues: {
                ":utag": "U#"
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


    public async add(user: IUser): Promise<void> {
        console.log(user);
        const params = {
            TableName: this.table,
            Item: user
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

export default UserDao;
