export type ddbQueryPostsParams = {
    TableName: string;
    IndexName?: string;
    KeyConditionExpression?: string;
    ExpressionAttributeNames?: { [key: string]: string };
    ExpressionAttributeValues?: { [key: string]: any };
    FilterExpression?: string;
    ReturnConsumedCapacity?: "INDEXES" | "TOTAL" | "NONE";
    ScanIndexForward?: boolean;
  };

export type Question = {
    quesId: string;
    author: string;
    title: string;
    body: string;
    points: number;
    views: number;
    tags: string[] | null;
    acceptedAnswer: string | null;
    upvotedBy: string[] | null;
    downvotedBy: string[] | null;
    createdAt: string;
    updatedAt: string;
}

export type QuestionResponse = {
  body: string;
  createdAt: string;
  points: string;
  tags: string[];
  quesId: string;
  title: string;
  views: number;
}

export type QuestionInput = {
    title: string;
    body: string;
    author: string;
    tags: string[];
}

export type AuthorInput = {
    id: string;
    author: string;
}

export type Author = {
  id: string;
  author: string;
  totalQuestions: number;
  totalAnswers: number;
  createdAt: string;
}

export type AuthorUpdateableFields = {
  author: string;
}

export type QuestionUpdateableFields = {
        title?: string;
        body?: string;
        tags?: string[];
        updatedAt?: string;
        views?: number;
};

export type QuestionAppSyncEvent = {
  info: {
    fieldName: string;
  };
  arguments: {
    author?: string;
    quesId?: string;
    question?: QuestionInput;
  };
};

export type TagAppSyncEvent = {
  info: {
    fieldName: string;
  };
  arguments: {
    tagName?: string;
    count?: number;
    tagId?: string;
  };
};

export type Answer = {
    ansId: string;
    quesId: string;
    quesAuthor: string;
    author: string;
    body: string;
    points: number;
    upvotedBy: string[] | null;
    downvotedBy: string[] | null;
    createdAt: string;
    updatedAt: string;
}

export type AnswerUpdateableFields = {
    body: string;
};

export type AnswerInput = {
    quesId?: string;
    quesAuthor?: string;
    body?: string;
    answerAuthor?: string;
}

export type AnswerAppSyncEvent = {
  info: {
    fieldName: string;
  };
  arguments: {
    ansId?: string;
    quesId?: string;
    answer?: AnswerInput;
  };
};

export type Comment = {
    commId: string;
    parentId: string;
    author: string;
    body: string;
    points: number;
    upvotedBy: string[] | null;
    downvotedBy: string[] | null;
    createdAt: string;
    updatedAt: string;
}

export type CommentUpdateableFields = {
    body?: string;
    updatedAt?: string;
    author?: string;
};

export type CommentInput = {
    parentId?: string;
    body: string;
    author: string;
    updated?: string;
}
  
export type CommentAppSyncEvent = {
  info: {
    fieldName: string;
  };
  arguments: {
    commId?: string;
    parentId?: string;
    author?: string;
    comment?: CommentInput;
  };
};

export type Tag = {
  tagName: string;
  count: number;
}