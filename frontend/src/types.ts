import { SaveAnswerProps } from "./graphql/answers";
import { SaveQuestionProps } from "./graphql/questions";

type ddbGetAllQueryResponse = {
  author: string;
  title: string;
  body: string;
  points: number;
  quesId: string;
  views: number;
  createdAt: string;
  updatedAt: string;
  tags: [string];
  value: string | null;
}

type ddbGetAllAnswersResponse = {
  author: string;
  body: string;
  points: number;
  quesId: string;
  views: number;
  createdAt: string;
  value: string | null;
}

type ddbGetAllTagsResponse = {
  tagName: string;
  count: number;
  tagId: string;
}

type Answer = {
  author: string;
  body: string;
  comments: [Comment];
  points: number;
  upvotedBy: number;
  downvotedBy: number;
  createdAt: string;
  updatedAt: string;
}

type Comment = {
  author: string;
  body: string;
  createdAt: string;
  updatedAt: string;
};

type Question = {
  author: string;
  title: string;
  body: string;
  tags: string[];
  points: number;
  upvotedBy: number;
  downvotedBy: number;
  views: number;
  hotAlgo: number;
  acceptedAnswer: Boolean;
  createdAt: string;
  updatedAt: string;
}

export type QuestionResponse = {
  author: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  points: string;
  quesId: string;
  title: string;
  views: number;
}


type User = {
  username: string;
  role: string;
  questions:
  {
    quesId: string;
    rep: number;
  },
  answers:
  {
    ansId: string;
    rep: number;
  },
  createdAt: {
    type: string,
    default: string,
  },
};

type CreateQuestionProps = {
  onSave?: (question: SaveQuestionProps) => void;
  title?: string;
  children?: any;
  quesId?: string;
  tags?: string[];
};

type CreateAnswerProps = {
  onSave?: (answer: SaveAnswerProps) => void;
  answerAuthor?: string;
  children?: string;
  quesId?: string;
  quesAuthor?: string;
};

export type { Answer, Comment, Question, User, ddbGetAllQueryResponse, ddbGetAllTagsResponse, ddbGetAllAnswersResponse, CreateQuestionProps, CreateAnswerProps };