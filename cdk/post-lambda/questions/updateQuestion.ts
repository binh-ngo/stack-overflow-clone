const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();
import { QuestionInput, QuestionUpdateableFields } from "../types";

const updateQuestion = async (
    author: string,
    quesId: string,
    questionInput: QuestionInput
) => {

    if (!questionInput) {
        return { statusCode: 400, body: 'invalid request, you are missing the parameter body' };
    };
    
    if (!author || !quesId) {
        return { statusCode: 400, body: 'invalid request, you are missing the pk or sk.' };
    }
    
        const question: QuestionUpdateableFields = {
            title: questionInput.title,
            body: questionInput.body,
            updatedAt: new Date().toISOString(),
            tags: questionInput.tags,
        };

        console.log(`UPDATE question called with:` + JSON.stringify(` UserPK: ${author} and UserSk: ${quesId}`));
        // const eventBody = JSON.parse(event.body);
        // console.log(`EVENT BODY ${eventBody}`);
        console.log(`TYPEOF QUESTIONINPUT --------- ${typeof (questionInput)}`);
    const params = {
        TableName: process.env.POSTS_TABLE,
        Key: {
            PK: `AUTHOR#${author}`,
            SK: `QUESTION#${quesId}`,
        },
        UpdateExpression:
            "set #title = :title, #body = :body, #updatedAt = :updatedAt, #tags = :tags",
        ExpressionAttributeNames: {
            "#title": "title",
            "#body": "body",
            "#updatedAt": "updatedAt",
            "#tags": "tags",
        },
        ExpressionAttributeValues: {
            ":title": question.title,
            ":body": question.body,
            ":updatedAt": question.updatedAt,
            ":tags": question.tags,
        },
        ReturnValues: "ALL_NEW",
        ReturnConsumedCapacity: "TOTAL",
    };

    console.log(`params: ${JSON.stringify(params, null, 2)}`);

    try {
        const updatedQuestion = await docClient.update(params).promise();

        console.log(`updatedQuestion: ${JSON.stringify(updatedQuestion, null, 2)}`);

        return updatedQuestion.Attributes;
    } catch (err) {
        console.log(`DynamoDB Error: ${JSON.stringify(err, null, 2)}`);

        return null;
    }
};

export default updateQuestion;