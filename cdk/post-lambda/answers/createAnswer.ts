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
        ansId,
        quesId,
        quesAuthor,
        author: answerInput.author,
        body: answerInput.body,
        points: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        upvotedBy: null,
        downvotedBy: null
    };
    const formattedAuthor = answerInput.author ? answerInput.author.trim().replace(/\s+/g, "") : "";

    const params = {
        RequestItems: {
            "StackOverflowClonePostApiStack861B9897-StackOverflowPostsTable118A6065-1M2XMVIH3GMXR": [
                {
                    PutRequest: {
                        Item: {
                            PK: `QUESTION#${quesId}`,
                            SK: `ANSWER#${ansId}`,
                            type: 'question',
                            ...answer,
                        },
                    },
                },
                {
                    PutRequest: {
                        Item: {
                            PK: `AUTHOR#${formattedAuthor}`,
                            SK: `ANSWER#${ansId}`,
                            type: 'question',
                            ...answer,
                        },
                    },
                },
            ],
        },
        ReturnConsumedCapacity: "TOTAL",
    };

    try {
        const data = await docClient.batchWrite(params).promise();
        console.log(`Created answer: ${JSON.stringify(answer, null, 2)}`);
        return answer;
    } catch (err) {
        console.log(`DynamoDB Error: ${JSON.stringify(err, null, 2)}`);
        return null;
    }
};

export default createAnswer;
