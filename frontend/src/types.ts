type ddbGetAllQueryResponse = {
  author: string;
  title: string;
  body: string;
  points: number;
  quesId: string;
  views: number;
  createdAt: string;
  updatedAt: string;
  answers: [Answer];
  comments: [Comment];
  tags: [string];
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
  tags: string;
  comments: [Comment],
  answers: [Answer],
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

export type { Answer, Comment, Question, User, ddbGetAllQueryResponse };