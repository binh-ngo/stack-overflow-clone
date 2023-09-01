const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();
import { ulid } from "ulid";
import { Question, QuestionInput } from "../types";
require("dotenv").config({ path: ".env" });

const createTag = async (questionInput: QuestionInput) => {
    console.log(
        `createTag invocation event: ${JSON.stringify(questionInput, null, 2)}`
    );

    const quesId = ulid();
    const tagId = ulid();

    const formattedAuthor = questionInput.author ? questionInput.author.trim().replace(/\s+/g, "") : "";

    const question: Question = {
        quesId: `QUESTION#${quesId}`,
        author: `AUTHOR#${formattedAuthor}`,
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
    const tagPutRequests = questionInput.tags.flatMap(tag => [
        {
            PutRequest: {
                Item: {
                    PK: `TAG#${tag}`,
                    SK: tagId,
                    type: 'tag',
                    tagName: tag,
                    count: 0
                },
                ConditionExpression: "attribute_not_exists("
            },
        },
        {
            PutRequest: {
                Item: {
                    PK: `QUESTION#${quesId}`,
                    SK: `TAG#${tag}`,
                    type: 'tag',
                    tagName: tag,
                    count: 0
                },
            },
        },
        {
            PutRequest: {
                Item: {
                    PK: `TAG#${tag}`,
                    SK: `QUESTION#${quesId}`,
                    type: 'question',
                    ...question
                },
            },
        },
    ]);

    const params = {
        RequestItems: {
            "StackOverflowClonePostApiStack861B9897-StackOverflowPostsTable118A6065-1M2XMVIH3GMXR": tagPutRequests,
        },
        ReturnConsumedCapacity: "TOTAL",
    };

    console.log("tagPutRequests:", JSON.stringify(tagPutRequests, null, 2));
    console.log("params:", JSON.stringify(params, null, 2));

    try {
        const data = await docClient.batchWrite(params).promise();
        console.log("Success", data);
    } catch (err) {
        console.log("Error", err);
    }

};

export default createTag;