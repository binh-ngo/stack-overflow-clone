import deleteQuestion from "../../../post-lambda/questions/deleteQuestion";
import { QuestionInput } from "../../../post-lambda/types";
const given = require("../../steps/given");
const when = require("../../steps/when");
const then = require("../../steps/then");

describe("When createQuestion is invoked", () => {
  let idsToDelete: string[] = [];

  afterAll(async () => {
    console.log("Deleting test posts in DDB");

    while (idsToDelete.length > 0) {
      const id = idsToDelete.pop();
      if (id) {
        await deleteQuestion("IntegrationTest", id);
      }
    }
  });

  it("should create a question in DDB", async () => {
    const questionInput: QuestionInput = given.a_random_post_input();
    const question = await when.we_invoke_createPost(questionInput);

    console.log(`question: ${JSON.stringify(question, null, 2)}`);

    const ddbPost = await then.post_exists_in_ddb(
      questionInput.author,
      question.questId
    );

    console.log(`ddbQuestion: ${JSON.stringify(ddbPost, null, 2)}`);

    expect(ddbPost).toMatchObject({
      PK: `QUESTION#${questionInput.author}`,
      SK: question.quesId,
      title: questionInput.title,
      content: questionInput.body,
      author: questionInput.author,
      created: expect.stringMatching(
        /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/
      ),
      updated: expect.stringMatching(
        /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/
      ),
      type: "question",
      viewCount: 0,
      published: false,
      publishDate: null,
    });

    idsToDelete.push(question.quesId);
  });
});