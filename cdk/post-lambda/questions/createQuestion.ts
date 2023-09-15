const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();
import { ulid } from "ulid";
import createTag from "../tags/createTag";
import { Question, QuestionInput } from "../types";
require("dotenv").config({ path: ".env" });

const createQuestion = async (questionInput: QuestionInput) => {
    console.log(
        `createQuestion invocation event: ${JSON.stringify(questionInput, null, 2)}`
    );

    const quesId = ulid();
     const formattedAuthor = questionInput.author ? questionInput.author.trim().replace(/\s+/g, "") : "";

    const question: Question = {
        quesId,
        author: formattedAuthor,
        title: questionInput.title,
        body: questionInput.body,
        tags: questionInput.tags,
        points: 0,
        views: 0,
        acceptedAnswer: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        upvotedBy: null,
        downvotedBy: null
    };

    const params = {
        RequestItems: {
            "StackOverflowClonePostApiStack861B9897-StackOverflowPostsTable118A6065-1M2XMVIH3GMXR": [
                {
                    PutRequest: {
                        Item: {
                            PK: `QUESTIONS`,
                            SK: `QUESTION#${quesId}`,
                            type: 'question',
                            ...question,
                        },
                    },
                },
                {
                    PutRequest: {
                        Item: {
                            PK: `AUTHOR#${formattedAuthor}`,
                            SK: `QUESTION#${quesId}`,
                            type: 'question',
                            ...question,
                        },
                    },
                },
            ],
        },
        ReturnConsumedCapacity: "TOTAL",
    };

    try {
        const data = await docClient.batchWrite(params).promise();
        console.log(`Created question: ${JSON.stringify(question, null, 2)}`);
        if(data) {
            createTag(question);
        }
        return question;
    } catch (err) {
        console.log(`DynamoDB Error: ${JSON.stringify(err, null, 2)}`);
        throw err;
    }
};

export default createQuestion;