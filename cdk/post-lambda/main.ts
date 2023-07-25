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

export async function handler(event: any): Promise<any> {
  console.log(`EVENT --- ${JSON.stringify(event)}`);
  const eventType = getEventType(event);

  if (eventType === "Question") {
    // Handle QuestionAppSyncEvent
    return handleQuestionEvent(event);
  } else if (eventType === "Answer") {
    // Handle AnswerAppSyncEvent
    return handleAnswerEvent(event);
  } else if (eventType === "Comment") {
    // Handle CommentAppSyncEvent
    return handleCommentEvent(event);
  } else {
    throw new Error(`Unknown event type.`);
  }
}
// Function to determine the event type based on the field name
function getEventType(event: any): "Question" | "Answer" | "Comment" {
  switch (event.info.fieldName) {
    case "getQuestionById":
    case "getAllQuestions":
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
    default:
      throw new Error(`Unknown field name: ${event.info.fieldName}`);
  }
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
      return getAnswerById(event.arguments.author!, event.arguments.ansId!);
    case "getAllAnswers":
      return getAllAnswers(event.arguments.author!);
    case "createAnswer":
      return createAnswer(event.arguments.quesId!, event.arguments.answer!);
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
        event.arguments.parentId!,
        event.arguments.comment!
      );
    case "deleteComment":
      return deleteComment(event.arguments.author!, event.arguments.commId!);
    default:
      throw new Error(`Unknown field name: ${event.info.fieldName}`);
  }
}

