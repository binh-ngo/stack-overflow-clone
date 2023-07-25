const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();
import { CommentInput, CommentUpdateableFields } from "../types";

const updateComment = async (
    author: string,
    commId: string,
    commentInput: CommentInput
) => {

    if (!commentInput) {
        return { statusCode: 400, body: 'invalid request, you are missing the parameter body' };
    };

    if (!author || !commId) {
        return { statusCode: 400, body: 'invalid request, you are missing the pk or sk.' };
    }

    const comment: CommentUpdateableFields = {
        body: commentInput.body,
        updatedAt: new Date().toISOString(),
    };

    console.log(`UPDATE comment called with:` + JSON.stringify(` UserPK: ${author} and UserSk: ${commId}`));
    // const eventBody = JSON.parse(event.body);
    // console.log(`EVENT BODY ${eventBody}`);
    console.log(`TYPEOF COMMENT-INPUT --------- ${typeof (commentInput)}`);
    const params = {
        TableName: process.env.POSTS_TABLE,
        Key: {
            PK: `COMMENT#${author}`,
            SK: commId,
        },
        UpdateExpression:
            "set #body = :body, #updatedAt = :updatedAt",
        ExpressionAttributeNames: {
            "#body": "body",
            "#updatedAt": "updatedAt",
        },
        ExpressionAttributeValues: {
            ":body": comment.body,
            ":updatedAt": comment.updatedAt,
        },
        ReturnValues: "ALL_NEW",
        ReturnConsumedCapacity: "TOTAL",
    };

    console.log(`params: ${JSON.stringify(params, null, 2)}`);

    try {
        const updatedComment = await docClient.update(params).promise();

        console.log(`updatedComment: ${JSON.stringify(updatedComment, null, 2)}`);

        return updatedComment.Attributes;
    } catch (err) {
        console.log(`DynamoDB Error: ${JSON.stringify(err, null, 2)}`);

        return null;
    }
};

export default updateComment;