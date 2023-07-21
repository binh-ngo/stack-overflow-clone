// export {};
const chance = require("chance").Chance();
import createAnswer from "../../post-lambda/answers/createAnswer";
import createComment from "../../post-lambda/comments/createComment";
import createQuestion from "../../post-lambda/questions/createQuestion";
import { Answer, AnswerInput, CommentInput, QuestionInput } from "../../post-lambda/types";

const TEST_AUTHOR = "IntegrationTest";

// QUESTION 
const a_random_question_input = () => {
  const title = chance.sentence({ words: 4 });
  const body = chance.paragraph({ sentences: 3 });
  const author = TEST_AUTHOR;
  const tags = chance.sentence({ words: 4}).split(" ");

  const questionInput: QuestionInput = {
    title,
    body,
    author,
    tags,
  };

  return questionInput;
};

const a_random_ddb_question = async () => {
    const questionInput: QuestionInput = a_random_question_input();
    const question = await createQuestion(questionInput);
    return question;
  };

//  ANSWER
const a_random_answer_input = async () => {
  // generates a random question and posts it to the db
  const questionInput: QuestionInput = a_random_question_input();
  const testQuestion = await createQuestion(questionInput);
// generates a random answer that extracts the quesId from above
  const body = chance.paragraph({ sentences: 3 });
  const author = TEST_AUTHOR;
  const quesId = testQuestion!.quesId

  const answerInput: AnswerInput = {
    quesId: quesId,
    body,
    author,
  };

  return answerInput;
};

const a_random_ddb_answer = async () => {
    const answerInput: AnswerInput = await a_random_answer_input();
    const answer = await createAnswer(answerInput.quesId, answerInput);
    return answer;
  };

// ANS COMMENT 
const a_random_answer_comment_input = async () => {
// generates a random answer and posts it to the db
    const answerInput: AnswerInput = await a_random_answer_input();
    const testAnswer = await createAnswer(answerInput.quesId, answerInput);
// generats a random comment that extracts the ansId from above and uses it as its own parentId
    const body = chance.paragraph({ sentences: 3 });
    const author = TEST_AUTHOR;
    const ansId = testAnswer!.ansId
    
    const commentInput: CommentInput = {
        parentId: ansId,
        body,
        author,
    };
    
  return commentInput;
};
// takes the commentInput above and posts it to the db
const a_random_ddb_ans_comment = async () => {
    const commentInput: CommentInput = await a_random_answer_comment_input();
    const comment = await createComment(commentInput.parentId!, commentInput);
    return comment;
  };

// QUES COMMENT 
const a_random_question_comment_input = async () => {
  // generates a random question and posts it to the db
  const questionInput: QuestionInput = a_random_question_input();
  const testQuestion = await createQuestion(questionInput);
// generats a random comment that extracts the ansId from above and uses it as its own parentId
    const body = chance.paragraph({ sentences: 3 });
    const author = TEST_AUTHOR;
    const quesId = testQuestion!.quesId
    
    const commentInput: CommentInput = {
        parentId: quesId,
        body,
        author,
    };
    
  return commentInput;
};
// takes the commentInput above and posts it to the db
const a_random_ddb_ques_comment = async () => {
    const commentInput: CommentInput = await a_random_question_comment_input();
    const comment = await createComment(commentInput.parentId!, commentInput);
    return comment;
  };

export { a_random_question_input, a_random_answer_input, a_random_answer_comment_input, a_random_ddb_question, a_random_ddb_answer, a_random_ddb_ans_comment, a_random_ddb_ques_comment, TEST_AUTHOR };
