const DynamoDB = require("aws-sdk/clients/dynamodb");
const docClient = new DynamoDB.DocumentClient();
import { Answer, AnswerInput } from "../types";

const createAnswer = async (quesId: String, answerInput: AnswerInput) => {
    console.log(
        `createAnswer invocation event: ${JSON.stringify(answerInput, null, 2)}`
    );

    const ansId = new Date().toISOString();

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
    const formattedAuthor = answerInput.author.trim().replace(/\s+/g, "");

    const params = {
        TableName: process.env.POSTS_TABLE,
        Item: {
          PK: `ANSWER#${formattedAuthor}`,
          SK: ansId,
          type: "question",
          ...answer,
        },
        ReturnConsumedCapacity: "TOTAL",
      };
        try {
            // await docClient.transactWrite({
            //     TransactItems: [{
            //         Put: {
            //             TableName: process.env.POSTS_TABLE,
            //             Item: {
            //                 PK: `QUESTION#${questionInput.author}`,
            //                 SK: quesId,
            //                 ...question,
            //             },
            //             ReturnConsumedCapacity: "TOTAL",
            //         }
            //     }, {
            //         Update: {
            //             TableName: process.env.USERS_TABLE,
            //             Key: {
            //                 author: questionInput.author
            //             },
            //             UpdateExpression: 'ADD totalQuestions :one',
            //             ExpressionAttributeValues: {
            //                 ':one': 1
            //             },
            //             ConditionExpression: 'attribute_exists(author)'
            //         }
            //     }
            //     ]
            // }).promise();     
            await docClient.put(params).promise();
        return answer;

    } catch (err) {
        console.log(`DynamoDB Error: ${JSON.stringify(err, null, 2)}`);

        return null;
    }
};

export default createAnswer;