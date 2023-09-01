const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();
import { Comment, CommentInput } from "../types";

const createComment = async (parentId: string, commentInput: CommentInput) => {
    console.log(
        `createComment invocation event: ${JSON.stringify(commentInput, null, 2)}`
    );

    const commId = new Date().toISOString();

    const comment: Comment = {
        commId,
        parentId,
        author: commentInput.author,
        body: commentInput.body,
        points: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        upvotedBy: null,
        downvotedBy: null
    };

    const params = {
        TableName: process.env.POSTS_TABLE,
        Item: {
            PK: `COMMENT#${commentInput.author}`,
            SK: commId,
            type: "comment",
            ...comment,
        },
        ReturnConsumedCapacity: "TOTAL",
    };

    try {
        await docClient.put(params).promise();
        return comment;

    } catch (err) {
        console.log(`DynamoDB Error: ${JSON.stringify(err, null, 2)}`);

        return null;
    }
};

export default createComment;