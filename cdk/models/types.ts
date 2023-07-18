type Answer = {
    author: String;
    body: String;
    comments: [Comment];
    points: Number;
    upvotedBy: Number;
    downvotedBy: Number;
    createdAt: Date;
    updatedAt: Date;
  }

type Comment = {
    author: String;
    body: String;
    createdAt: Date;
    updatedAt: Date;
  };

type Question = {
    author: String;
    title: String;
    body: String;
    tags: String;
    comments: [Comment],
    answers: [Answer],
    points: Number;
    upvotedBy: Number;
    downvotedBy: Number;
    views: Number;
    hotAlgo: Number;
    acceptedAnswer: Boolean;
    createdAt: Date;
    updatedAt: Date;
}

type User = {
  username: String;
  role: String;
  questions:
    {
      quesId: String;
      rep: Number;
    },
  answers: 
    {
      ansId: String;
      rep: Number;
    },
  createdAt: {
    type: Date,
    default: Date,
  },
};

export type { Answer, Comment, Question, User };