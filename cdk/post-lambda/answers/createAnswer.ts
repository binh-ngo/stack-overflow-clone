const DynamoDB = require("aws-sdk/clients/dynamodb");
const docClient = new DynamoDB.DocumentClient();
import { ulid } from "ulid";
import { Answer, AnswerInput } from "../types";

const createAnswer = async ( quesAuthor: string, quesId: string, answerInput: AnswerInput) => {
    console.log(
        `createAnswer invocation event: ${JSON.stringify(answerInput, null, 2)}`
    );

    const ansId = ulid();

    const answer: Answer = {
        ansId: `ANSWER#${ansId}`,
        quesId: quesId,
        quesAuthor: quesAuthor,
        author: `AUTHOR#${answerInput.author}`,
        body: answerInput.body,
        points: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        upvotedBy: null,
        downvotedBy: null
    };
    const formattedAuthor = answerInput.author ? answerInput.author.trim().replace(/\s+/g, "") : "";

    const params = {
        TableName: process.env.POSTS_TABLE,
        Item: {
            PK: `AUTHOR#${formattedAuthor}`,
            SK: `ANSWER#${ansId}`,
            type: "answer",
            ...answer,
        },
        ReturnConsumedCapacity: "TOTAL",
    };

    try {
        await docClient.put(params).promise();
        console.log(`Created answer: ${JSON.stringify(answer, null, 2)}`);
        return answer;
    } catch (err) {
        console.log(`DynamoDB Error: ${JSON.stringify(err, null, 2)}`);
        return null;
    }
};

export default createAnswer;

        //     await docClient.transactWrite({
        //         TransactItems: [{
        //             Put: {
        //                 TableName: process.env.POSTS_TABLE,
        //                 Item: {
        //                     PK: `AUTHOR#${answerInput.author}`,
        //                     SK: `ANSWER#${ansId}`,
        //                     ...answer,
        //                 },
        //                 ReturnConsumedCapacity: "TOTAL",
        //             }
        //         }, {
        //             Update: {
        //                 TableName: process.env.POSTS_TABLE,
        //                 Key: {
        //                     PK: `AUTHOR#${quesAuthor}`,
        //                     SK: `QUESTION#${quesId}`,
        //                 },
        //                 UpdateExpression: 'SET answers = list_append(if_not_exists(answers, :empty_list), :answer)',
        //                 ExpressionAttributeValues: {
        //                     ':empty_list': [],
        //                     ':answer': [answer],
        //                 },
        //                 ConditionExpression: 'attribute_exists(PK)',
        //             }
        //         }
        //         ]
        //     }).promise(); 