const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();
import { Answer } from "../types";

const appendAnswer = async (
    quesAuthor: string,
    quesId: string,
    answerInput: Answer
) => {

    if (!answerInput) {
        return { statusCode: 400, body: 'invalid request, you are missing the parameter body' };
    };

    if (!quesAuthor || !quesId) {
        return { statusCode: 400, body: 'invalid request, you are missing the pk or sk.' };
    }

    console.log(`UPDATE question called with:` + JSON.stringify(` UserPK: ${quesAuthor} and UserSk: ${quesId}`));
    // const eventBody = JSON.parse(event.body);
    // console.log(`EVENT BODY ${eventBody}`);
    console.log(`TYPEOF answerInput --------- ${typeof (answerInput)}`);

    
    // const params = {
    //     TableName: process.env.POSTS_TABLE,
    //     Key: {
    //         PK: `AUTHOR#${quesAuthor}`,
    //         SK: `QUESTION#${quesId}`,
    //     },
    //     UpdateExpression: 'SET answers = :answer',
    //     ExpressionAttributeValues: {
    //             ':answer': [answerInput],
    //         },
    //         ConditionExpression: 'attribute_exists(PK)',
    //     }

        // TODO: WORK ON BEING ABLE TO APPEND NEW ANSWERS TO THE ANSWER ARRAY

        const params = {
            TableName: process.env.POSTS_TABLE,
            Key: {
                PK: `AUTHOR#${quesAuthor}`,
                SK: `QUESTION#${quesId}`,
            },
            UpdateExpression: 'SET #answers = list_append(if_not_exists(#answers, :empty_list), :answer)',
            ExpressionAttributeNames: {
                '#answers': 'answers',
            },
            ExpressionAttributeValues: {
                ':answer': answerInput,
                ':empty_list': [],
            },
            ConditionExpression: 'attribute_exists(PK)',
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

export default appendAnswer;