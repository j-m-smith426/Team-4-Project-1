import { IComment } from "@entities/Post";
import PostDao from "./PostDao.mock";

describe("Get All Page comments", () => {
  let id = "testId";
  let ref = "test#P#001";
  let user1: IComment = {
    TYPEID: "U#" + id,
    content: "This is a post",
    image:'',
    REFERENCE: ref,
  };
  let user2: IComment = {
    TYPEID: "U#" + id + "2",
    content: "This is a post",
    image:'',
    REFERENCE: ref,
  };
  it("should add a comment and retrieve it", async () => {
    const post = new PostDao();
    await post.addComment(user1);
    await post.addComment(user2);

    expect(await post.getAllPageComments("U#" + id)).toStrictEqual([user1]);
  });
});

describe("get all post comments", () => {
  it("should get the comment with comment reference", async () => {
    let id = "testId";
    let ref = "002";
    let user1: IComment = {
      TYPEID: "U#" + id,
      content: "This is a post",
      image:'',
      REFERENCE: "test#C#001#" + ref,
    };
    let user2: IComment = {
      TYPEID: "U#" + id,
      content: "This is a post",
      image:'',
      REFERENCE: "test#P#" + ref + "#0",
    };
    let user3: IComment = {
      TYPEID: "U#" + id,
      content: "This is a post",
      image:'',
      REFERENCE: "test#C#" + ref + "#123",
    };
    const post = new PostDao();
    await post.addComment(user1);
    await post.addComment(user2);
    await post.addComment(user3);
    expect(await post.getAllPostComments(ref)).toStrictEqual([user1]);
  });
});

describe("getOneComment", () => {
  let id = "testId";
  let ref = "001";
  let user1: IComment = {
    TYPEID: "U#" + id,
    content: "This is a post",
    image:'',
    REFERENCE: "test#P#" + ref,
  };
  it("should retrieve the comment based on id", async () => {
    const post = new PostDao();
    await post.addComment(user1);

    let returned: IComment | undefined = await post.getOne(ref);
    expect(returned).toStrictEqual(user1);
  });
});

describe("getAllComments", () => {
  let id: any = jest.fn().mockName('something');
  it("should retrieve all comments", () => {
    const post = new PostDao();
    const func = post.getAllUserComments(id);
    expect(func).toBeDefined();
  })
})
