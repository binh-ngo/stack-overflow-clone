import deleteQuestion from "../../../post-lambda/questions/deleteQuestion";
const given = require("../../steps/given");
const when = require("../../steps/when");

describe("When updateQuestion is invoked", () => {
  let ddbQuestion: any;

  beforeAll(async () => {
    ddbQuestion = await given.a_random_ddb_post();
  });

  afterAll(async () => {
    console.log("Deleting test questions in DDB");
    await deleteQuestion("IntegrationTest", ddbQuestion.quesId);
  });

  it("should change the question in DDB", async () => {
    const updatedQuestion = await given.a_random_post_input();

    const updatedDdbQuestion = await when.we_invoke_updateQuestion(
      ddbQuestion.author,
      ddbQuestion.quesId,
      updatedQuestion
    );

    expect(updatedDdbQuestion).toMatchObject({
      PK: `POST#${ddbQuestion.author}`,
      SK: ddbQuestion.postId,
      title: updatedQuestion.title, // we expect this to match the updated title
      content: updatedQuestion.content, // we expect this to match the updated content
      author: ddbQuestion.author,
      created: ddbQuestion.created,
      updated: expect.stringMatching(
        /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/
      ),
      type: "question",
      viewCount: 0,
      published: false,
      publishDate: null,
    });
  });
});