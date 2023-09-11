import createQuestion from "./questions/createQuestion";
import deleteQuestion from "./questions/deleteQuestion";
import getQuestionById from "./questions/getQuestionById";
import getAllQuestions from "./questions/getAllQuestions";
import updateQuestion from "./questions/updateQuestion";
import getAllQuestionsFromAllUsers from "./questions/getAllQuestionsFromAllUsers";

import createAnswer from "./answers/createAnswer";
import deleteAnswer from "./answers/deleteAnswer";
import getAnswerById from "./answers/getAnswerById";
import getAllAnswers from "./answers/getAllAnswers";
import updateAnswer from "./answers/updateAnswer";

import createComment from "./comments/createComment";
import deleteComment from "./comments/deleteComment";
import getCommentById from "./comments/getCommentById";
import getAllComments from "./comments/getAllComment";
import updateComment from "./comments/updateComment";

import { QuestionAppSyncEvent, AnswerAppSyncEvent, CommentAppSyncEvent, QuestionInput, TagAppSyncEvent } from "./types";
// import appendAnswer from "./answers/appendAnswer";
import getQuestionWithAnswersAndComments from "./questions/getQuestionWithAnswersAndComments";
import getTagById from "./tags/getTagById";
import getAllTags from "./tags/getAllTags";
import getAllQuestionsByTag from "./tags/getAllQuestionsByTag";

export async function handler(event: any): Promise<any> {
  console.log(`EVENT --- ${JSON.stringify(event)}`);
  const eventType = getEventType(event);

  if (eventType === "Question") {
    return handleQuestionEvent(event);
  } else if (eventType === "Answer") {
    return handleAnswerEvent(event);
  } else if (eventType === "Comment") {
    return handleCommentEvent(event);
  } else if(eventType === "Tag") {
    return handleTagEvent(event);
  } else {
    throw new Error(`Unknown event type.`);
  }
}
// Function to determine the event type based on the field name
function getEventType(event: any): "Question" | "Answer" | "Comment" | "Tag" {
  switch (event.info.fieldName) {
    case "getQuestionById":
    case "getAllQuestions":
    case "getAllQuestionsFromAllUsers":
    case "getQuestionWithAnswersAndComments":
    case "createQuestion":
    case "updateQuestion":
    case "deleteQuestion":
      return "Question";
    case "getAnswerById":
    case "getAllAnswers":
    case "createAnswer":
    case "updateAnswer":
    case "deleteAnswer":
      return "Answer";
    case "getCommentById":
    case "getAllComments":
    case "createComment":
    case "updateComment":
    case "deleteComment":
      return "Comment";
    case "getAllTags":
    case "getTagById":
    case "getAllQuestionsByTag":
      return "Tag";
    default:
      throw new Error(`Unknown field name: ${event.info.fieldName}`);
  }
}

// Handler function for question events
function handleQuestionEvent(event: QuestionAppSyncEvent) {
  switch (event.info.fieldName) {
    case "getQuestionById":
      // console.log(`QUESTION ---${JSON.stringify(event)}`);
      return getQuestionById(event.arguments.author!, event.arguments.quesId!);
    case "getAllQuestions":
      // console.log(`QUESTION ---${JSON.stringify(event)}`);
      return getAllQuestions(event.arguments.author!);
    case "getAllQuestionsFromAllUsers":
      return getAllQuestionsFromAllUsers();
    case "getQuestionWithAnswersAndComments":
      return getQuestionWithAnswersAndComments(event.arguments.quesId!);
    case "createQuestion":
      const questionInput: QuestionInput = {
        title: event.arguments.question!.title,
        body: event.arguments.question!.body,
        author: event.arguments.question!.author,
        tags: event.arguments.question!.tags
      };
      return createQuestion(questionInput);
    case "updateQuestion":
      return updateQuestion(
        event.arguments.author!,
        event.arguments.quesId!,
        event.arguments.question!
      );
    case "deleteQuestion":
      return deleteQuestion(event.arguments.author!, event.arguments.quesId!);
    default:
      throw new Error(`Unknown field name: ${event.info.fieldName}`);
  }
}

// Handler function for answer events
async function handleAnswerEvent(event: AnswerAppSyncEvent) {
  switch (event.info.fieldName) {
    case "getAnswerById":
      return getAnswerById(event.arguments.author!, event.arguments.ansId!);
    case "getAllAnswers":
      return getAllAnswers(event.arguments.author!);
    case "createAnswer":
      // const createdAnswer = await createAnswer(event.arguments.quesAuthor!, event.arguments.quesId!, event.arguments.answer!);
      // if (createdAnswer) {
      //   await appendAnswer(createdAnswer.quesAuthor!, createdAnswer.quesId!, createdAnswer);
      // }
      return createAnswer(event.arguments.quesAuthor!, event.arguments.quesId!, event.arguments.answer!);
    case "updateAnswer":
      return updateAnswer(
        event.arguments.author!,
        event.arguments.ansId!,
        event.arguments.answer!
      );
    case "deleteAnswer":
      return deleteAnswer(event.arguments.author!, event.arguments.ansId!);
    default:
      throw new Error(`Unknown field name: ${event.info.fieldName}`);
  }
}

// Handler function for comment events
function handleCommentEvent(event: CommentAppSyncEvent) {
  switch (event.info.fieldName) {
    case "getCommentById":
      return getCommentById(event.arguments.author!, event.arguments.commId!);
    case "getAllComments":
      return getAllComments(event.arguments.author!);
    case "createComment":
      return createComment(event.arguments.parentId!, event.arguments.comment!);
    case "updateComment":
      return updateComment(
        event.arguments.author!,
        event.arguments.commId!,
        event.arguments.comment!
      );
    case "deleteComment":
      return deleteComment(event.arguments.author!, event.arguments.commId!);
    default:
      throw new Error(`Unknown field name: ${event.info.fieldName}`);
  }
}

// Handler function for tag events
function handleTagEvent(event: TagAppSyncEvent) {
  switch (event.info.fieldName) {
    case "getTagById":
      return getTagById(event.arguments.tagName!);
    case "getAllTags":
      return getAllTags();
    case "getAllQuestionsByTag":
      return getAllQuestionsByTag(event.arguments.tagName!);
    default:
      throw new Error(`Unknown field name: ${event.info.fieldName}`);
  }
}

