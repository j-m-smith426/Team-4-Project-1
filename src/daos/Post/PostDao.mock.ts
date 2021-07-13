import Comment, { IComment } from "@entities/Post";
import { getRandomInt } from "@shared/functions";
import { IPostDao } from "./PostDao";
import MockDaoMock from "../MockDb/MockDao.mock";
import {
  DeleteCommand,
  PutCommand,
  QueryCommand,
  ScanCommand,
} from "@aws-sdk/lib-dynamodb";
import { ddbDoc } from "../DB/Dynamo";

const TABLE = "Scouter";
class PostDao implements IPostDao {
  public table = TABLE;
  //retrieves a post by id
  public async getOne(postID: string) {
    const params = {
      TableName: TABLE,
      //Comments have either #P# or #C#
      FilterExpression: "contains(#ref, :p) OR contains(#ref, :c)",
      ExpressionAttributeNames: {
        "#ref": "REFERENCE",
      },
      ExpressionAttributeValues: {
        ":p": "#P#" + postID,
        ":c": "#C#" + postID,
      },
    };
    try {
      const data = await ddbDoc.send(new ScanCommand(params));

      return data.Items && (data.Items[0] as IComment);
    } catch (err) {
      console.log("Error", err);
    }
  }
  //retrieves all posts 
  public async getAllPostComments(postID: string) {
    const params = {
      TableName: TABLE,
      //Post comments have ParentPostID but not #P#ParentPostID and are not comments with #C#ParentPostID
      FilterExpression:
        "contains(#ref, :i) AND NOT contains(#ref, :p) AND NOT contains(#ref, :c)",
      ExpressionAttributeNames: {
        "#ref": "REFERENCE",
      },
      ExpressionAttributeValues: {
        ":i": postID,
        ":p": "#P#" + postID,
        ":c": "#C#" + postID,
      },
    };
    try {
      const data = await ddbDoc.send(new ScanCommand(params));

      return data.Items && (data.Items?.sort((a,b) => a.timeStamp < b.timeStamp ? 1 : -1) as IComment[]);
    } catch (err) {
      console.log("Error", err);
    }
  }

  //retrieve all usernames
  public async getAllUserComments(subjectID: string) {
    const params = {
      TableName: TABLE,
      FilterExpression:
        "contains(#ref,:subject)",
      ExpressionAttributeNames: {
        "#ref": "REFERENCE",
      },
      ExpressionAttributeValues: {
        ":subject": subjectID + "#P#",
        
      },
    };
    try {
      const data = await ddbDoc.send(new ScanCommand(params));
      console.log(data.Items);
      return data.Items?.sort((a,b) => a.timeStamp < b.timeStamp ? 1 : -1) as IComment[];
    } catch (err) {
      console.log("Error", err);
    }
  }
  //retrieves page comments by the page specifically by anime or userpage
  public async getAllPageComments(subjectID: string) {
    const params = {
      TableName: TABLE,
      FilterExpression:
        "contains(TYPEID, :subject) AND contains(#ref,:p)",
      ExpressionAttributeNames: {
        "#ref": "REFERENCE",
      },
      ExpressionAttributeValues: {
        ":subject": subjectID,
        ":p": "#P#",
      },
    };
    try {
      const data = await ddbDoc.send(new ScanCommand(params));
      console.log(data.Items);
      return data.Items?.sort((a,b) => a.timeStamp < b.timeStamp ? 1 : -1) as IComment[];
    } catch (err) {
      console.log("Error", err);
    }
  }
  //post a comment on a page
  public async addComment(post: IComment): Promise<void> {
    const params = {
      TableName: this.table,
      Item: post,
    };
    console.log(params);
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
