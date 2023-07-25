const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();
import { AnswerInput, QuestionUpdateableFields } from "../types";

const updateAnswer = async (
    author: string,
    ansId: string,
    answerInput: AnswerInput
) => {

    if (!answerInput) {
        return { statusCode: 400, body: 'invalid request, you are missing the parameter body' };
    };

    if (!author || !ansId) {
        return { statusCode: 400, body: 'invalid request, you are missing the pk or sk.' };
    }

    const answer: QuestionUpdateableFields = {
        body: answerInput.body,
        updatedAt: new Date().toISOString(),
    };

    console.log(`UPDATE answer called with:` + JSON.stringify(` UserPK: ${author} and UserSk: ${ansId}`));
    // const eventBody = JSON.parse(event.body);
    // console.log(`EVENT BODY ${eventBody}`);
    console.log(`TYPEOF ANSWER-INPUT --------- ${typeof (answerInput)}`);
    const params = {
        TableName: process.env.POSTS_TABLE,
        Key: {
            PK: `ANSWER#${author}`,
            SK: ansId,
        },
        UpdateExpression:
            "set  #body = :body, #updatedAt = :updatedAt",
        ExpressionAttributeNames: {
            "#body": "body",
            "#updatedAt": "updatedAt",
        },
        ExpressionAttributeValues: {
            ":body": answer.body,
            ":updatedAt": answer.updatedAt,
        },
        ReturnValues: "ALL_NEW",
        ReturnConsumedCapacity: "TOTAL",
    };

    console.log(`params: ${JSON.stringify(params, null, 2)}`);

    try {
        const updatedAnswer = await docClient.update(params).promise();

        console.log(`updatedAnswer: ${JSON.stringify(updatedAnswer, null, 2)}`);

        return updatedAnswer.Attributes;
    } catch (err) {
        console.log(`DynamoDB Error: ${JSON.stringify(err, null, 2)}`);

        return null;
    }
};

export default updateAnswer;