import Comment, { IComment} from '@entities/Post';
import { getRandomInt } from '@shared/functions';
import { IPostDao } from './PostDao';
import MockDaoMock from '../MockDb/MockDao.mock';
import { DeleteCommand, PutCommand, QueryCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { ddbDoc } from '../DB/Dynamo';


const TABLE = "Scouter";
class PostDao implements IPostDao {
    public table = TABLE;

    public async getOne(postID:string) {
        const params = {
            TableName: TABLE,
            //Comments have either #P# or #C#
            FilterExpression: "contains(#ref, :p) OR contains(#ref, :c)",
            ExpressionAttributeNames: {
                "#ref": "REFERENCE",
            },
            ExpressionAttributeValues: {
                ":p":'#P#' + postID,
                ":c":"#C#" + postID
              }              
    }
    try {
        const data = await ddbDoc.send(new ScanCommand(params));
       
        return data.Items && data.Items[0] as IComment;
        
    } catch (err) {
        console.log("Error", err);
    }
}

    public async getAllPostComments(postID:string){
        const params = {
            TableName: TABLE,
            //Post comments have ParentPostID but not #P#ParentPostID and are not comments with #C#ParentPostID
            FilterExpression: "contains(#ref, :i) AND NOT contains(#ref, :p) AND NOT contains(#ref, :c)",
            ExpressionAttributeNames: {
                "#ref": "REFERENCE",
            },
            ExpressionAttributeValues: {
                ":i": postID,
                ":p":"#P#" + postID,
                ":c":"#C#" + postID
              }              
    }
    try {
        const data = await ddbDoc.send(new ScanCommand(params));
        
        return data.Items && data.Items as IComment[];
        
    } catch (err) {
        console.log("Error", err);
    }
}

    public async getAllPageComments(subjectID:string) {
        const params = {
            TableName: TABLE,
            FilterExpression: "TYPEID = :subject AND (contains(#ref,:p) OR contains(#ref, :c))",
            ExpressionAttributeNames: {
                "#ref": "REFERENCE",
            },
            ExpressionAttributeValues: {
                ":subject": subjectID,
                ":p":'#P#',
                ":c":"#C#"
              }
        };
        try {
            const data = await ddbDoc.send(new ScanCommand(params));
            return data.Items as IComment[];
            
        } catch (err) {
            console.log("Error", err);
        }
    }


    public async addComment(post: IComment): Promise<void> {
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
