import createQuestion from "./questions/createQuestion";
import deleteQuestion from "./questions/deleteQuestion";
import getQuestionById from "./questions/getQuestionById";
import getAllQuestions from "./questions/getAllQuestions";
import updateQuestion from "./questions/updateQuestion";

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

import { QuestionAppSyncEvent, AnswerAppSyncEvent, CommentAppSyncEvent } from "./types";

// Main handler function using function overloading
// export async function handler(event: GetAllQuestionsAppSyncEvent): Promise<any>;
export async function handler(event: QuestionAppSyncEvent): Promise<any>;
export async function handler(event: AnswerAppSyncEvent): Promise<any>;
export async function handler(event: CommentAppSyncEvent): Promise<any>;

export async function handler(event: any): Promise<any> {
  console.log(`EVENT --- ${JSON.stringify(event)}`)
  if (isQuestionEvent(event)) {
    return handleQuestionEvent(event);
  } else if (isAnswerEvent(event)) {
    console.log(`ANSWER ---${JSON.stringify(event)}`);
    return handleAnswerEvent(event);
  } else if (isCommentEvent(event)) {
    console.log(`COMMENT ---${JSON.stringify(event)}`);
    return handleCommentEvent(event);
  } else {
    throw new Error(`Unknown event type.`);
  }
}

// Helper functions to determine the type of event
function isQuestionEvent(event: any): event is QuestionAppSyncEvent {
  return "arguments" in event && "quesId" in event.arguments || "author" in event.arguments || "question" in event.arguments;
}

function isAnswerEvent(event: any): event is AnswerAppSyncEvent {
  return "arguments" in event && "ansId" in event.arguments;
}

function isCommentEvent(event: any): event is CommentAppSyncEvent {
  return "arguments" in event && "parentId" in event.arguments;
}

// Handler function for question events
function handleQuestionEvent(event: QuestionAppSyncEvent) {
  switch (event.info.fieldName) {
    case "getQuestionById":
      console.log(`QUESTION ---${JSON.stringify(event)}`);
      return getQuestionById(event.arguments.author!, event.arguments.quesId!);
    case "getAllQuestions":
      console.log(`QUESTION ---${JSON.stringify(event)}`);
      return getAllQuestions(event.arguments.author!);
    case "createQuestion":
      return createQuestion(event.arguments.question!);
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
function handleAnswerEvent(event: AnswerAppSyncEvent) {
  switch (event.info.fieldName) {
    case "getAnswerById":
      return getAnswerById(event.arguments.author, event.arguments.ansId);
    case "getAllAnswers":
      return getAllAnswers(event.arguments.author);
    case "createAnswer":
      return createAnswer(event.arguments.quesId, event.arguments.answer);
    case "updateAnswer":
      return updateAnswer(
        event.arguments.author,
        event.arguments.ansId,
        event.arguments.answer
      );
    case "deleteAnswer":
      return deleteAnswer(event.arguments.author, event.arguments.ansId);
    default:
      throw new Error(`Unknown field name: ${event.info.fieldName}`);
  }
}

// Handler function for comment events
function handleCommentEvent(event: CommentAppSyncEvent) {
  switch (event.info.fieldName) {
    case "getCommentById":
      return getCommentById(event.arguments.author, event.arguments.commId);
    case "getAllComments":
      return getAllComments(event.arguments.author);
    case "createComment":
      return createComment(event.arguments.parentId, event.arguments.comment);
    case "updateComment":
      return updateComment(
        event.arguments.author,
        event.arguments.parentId,
        event.arguments.comment
      );
    case "deleteComment":
      return deleteComment(event.arguments.author, event.arguments.commId);    
    default:
      throw new Error(`Unknown field name: ${event.info.fieldName}`);
  }
}

