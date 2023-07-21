const DynamoDB = require("aws-sdk/clients/dynamodb");
const docClient = new DynamoDB.DocumentClient();
import { Answer, AnswerInput } from "../types";
import { ulid } from 'ulid'

const createAnswer = async (quesId: String, answerInput: AnswerInput) => {
    console.log(
        `createAnswer invocation event: ${JSON.stringify(answerInput, null, 2)}`
    );

    const ansId = ulid();

    const answer: Answer = {
        ansId,
        quesId,
        author: answerInput.author,
        body: answerInput.body,
        points: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        comments: null,
        upvotedBy: null,
        downvotedBy: null
    };

    try {
        // allows you to make up to 100 action requests to multiple tables in 
        // the same account and region 
        await docClient.transactWrite({
            TransactItems: [{
                Put: {
                    TableName: process.env.POSTS_TABLE,
                    Item: {
                        PK: `ANSWER#${answerInput.author}`,
                        SK: ansId,
                        ...answer,
                    },
                    ReturnConsumedCapacity: "TOTAL",
                }
            }, {
                Update: {
                    TableName: process.env.USERS_TABLE,
                    Key: {
                        author: answerInput.author
                    },
                    UpdateExpression: 'ADD totalAnswers :one',
                    ExpressionAttributeValues: {
                        ':one': 1
                    },
                    ConditionExpression: 'attribute_exists(author)'
                }
            }
            ]
        }).promise();
        return answer;

    } catch (err) {
        console.log(`DynamoDB Error: ${JSON.stringify(err, null, 2)}`);

        return null;
    }
};

export default createAnswer;