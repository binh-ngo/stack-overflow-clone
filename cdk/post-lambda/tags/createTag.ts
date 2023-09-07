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
// Needed to separate this put request because in batchWrite operations,
// if one fails, all fail. We had to further separate each request for each
//  tag with individual put requests for the same reason
    const conditionalParams = questionInput.tags!.map(tag => ({
        RequestItems: {
            "StackOverflowClonePostApiStack861B9897-StackOverflowPostsTable118A6065-1M2XMVIH3GMXR": [
                {
                    PutRequest: {
                        Item: {
                            PK: `TAG#${tag}`,
                            SK: tagId,
                            type: 'tag',
                            tagName: tag,
                            count: 0
                        },
                        ConditionExpression: "attribute_not_exists(PK)"
                    },
                }
            ]
        }
}));

// Now, you can execute each put operation individually
const promises = conditionalParams.map(async params => {
    try {
      await docClient.put(params).promise();
      console.log(`Successfully added tag: ${params.RequestItems["StackOverflowClonePostApiStack861B9897-StackOverflowPostsTable118A6065-1M2XMVIH3GMXR"][0].PutRequest.Item.tagName}`);
    } catch (err) {
      console.error(`Failed to add tag: ${params.RequestItems["StackOverflowClonePostApiStack861B9897-StackOverflowPostsTable118A6065-1M2XMVIH3GMXR"][0].PutRequest.Item.tagName}`);
      console.error(err);
    }
  });
  
  // Wait for all promises to resolve
  await Promise.all(promises);

    const tagPutRequests = questionInput.tags!.flatMap(tag => [
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