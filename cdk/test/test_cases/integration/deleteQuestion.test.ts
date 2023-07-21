const given = require("../../steps/given");
const when = require("../../steps/when");

describe("When deleteQuestion is invoked", () => {
  let ddbPost: any;

  beforeAll(async () => {
    ddbPost = await given.a_random_ddb_post();
  });

  it("should delete a question in DDB", async () => {
    await when.we_invoke_deletePost("IntegrationTest", ddbPost.postId);

    const posts = await when.we_invoke_getPosts("IntegrationTest");

    expect(posts).toMatchObject([]);
  });
});