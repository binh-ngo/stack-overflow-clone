// export {}; // https://bobbyhadz.com/blog/typescript-cannot-redeclare-block-scoped-variable
import deleteQuestion from "../../../post-lambda/questions/deleteQuestion";
const given = require("../../steps/given");
const when = require("../../steps/when");

/**
 * This test was failing because posts from the createPost test was being returned
 * I updated the integration-test command to --runInBand to run the tests in series
 */

describe("When getA is invoked", () => {
  let firstPost: any;
  let secondPost: any;

  beforeAll(async () => {
    firstPost = await given.a_random_ddb_post();
    secondPost = await given.a_random_ddb_post();
  });

  afterAll(async () => {
    console.log("Deleting test posts in DDB");

    for (const post of [firstPost, secondPost]) {
      await deleteQuestion("IntegrationTest", post.postId);
    }
  });

  it("should return posts from the author", async () => {
    const posts = await when.we_invoke_getPosts("IntegrationTest");

    // NOTE: the result from invoking getPosts includes DDB fields such as PK and SK
    // This test still passes
    expect(posts).toMatchObject([secondPost, firstPost]);
    // expect(posts[0]).toMatchObject(secondPost);
  });
});