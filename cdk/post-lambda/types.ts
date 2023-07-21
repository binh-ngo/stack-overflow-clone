export type ddbQueryPostsParams = {
    TableName: string;
    KeyConditionExpression: string;
    ExpressionAttributeNames: { [key: string]: string };
    ExpressionAttributeValues: { [key: string]: any };
    FilterExpression?: string;
    ReturnConsumedCapacity?: "INDEXES" | "TOTAL" | "NONE";
    ScanIndexForward?: boolean;
  };

export type Question = {
    quesId: String;
    author: String;
    title: String;
    body: String;
    tags: [String];
    points: Number;
    views: Number;
    acceptedAnswer: String | null;
    comments: [String] | null;
    answers: [String] | null;
    upvotedBy: [String] | null;
    downvotedBy: [String] | null;
    createdAt: String;
    updatedAt: String;
}

export type QuestionInput = {
    title: String;
    body: String;
    author: String;
    tags: [String];
}

export type QuestionUpdateableFields = {
        title?: String;
        body?: String;
        tags?: [String];
        updatedAt?: String;
        views?: Number;
};

export type Answer = {
    ansId: String;
    quesId: String;
    author: String;
    body: String;
    comments: [String] | null;
    points: Number;
    upvotedBy: [String] | null;
    downvotedBy: [String] | null;
    createdAt: String;
    updatedAt: String;
}

export type AnswerUpdateableFields = {
    body?: String;
    updatedAt?: String;
};

export type AnswerInput = {
    quesId: String;
    body: String;
    author: String;
    updated?: String;
}

export type Comment = {
    commId: String;
    parentId: String;
    author: String;
    body: String;
    points: Number;
    upvotedBy: [String] | null;
    downvotedBy: [String] | null;
    createdAt: String;
    updatedAt: String;
}

export type CommentUpdateableFields = {
    body?: String;
    updatedAt?: String;
    author?: String;
};

export type CommentInput = {
    parentId?: String;
    body: String;
    author: String;
}