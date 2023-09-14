const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();
import { ulid } from "ulid";
import { Question } from "../types";
require("dotenv").config({ path: ".env" });

const createTag = async (questionInput: Question) => {
    console.log(
        `createTag invocation event: ${JSON.stringify(questionInput, null, 2)}`
    );
    
    // Needed to separate this put request because in batchWrite operations,
    // if one fails, all fail. We had to further separate each request for each
//  tag with individual put requests for the same reason

const promises = questionInput.tags!.map(async (tag) => {

    const tagId = ulid();
    
    const putRequestParams = {
      TableName: process.env.POSTS_TABLE,
      Item: {
        PK: `TAGS`,
        SK: `TAG#${tag}`,
        tagId: tagId,
        type: "tag",
        tagName: tag,
        count: 0,
      },
    };

    try {
      const tagExists = await docClient.query({
          TableName: process.env.POSTS_TABLE,
          KeyConditionExpression: "#PK = :PK AND begins_with(#SK, :sk_prefix)",
          ExpressionAttributeNames: {
            "#PK": "PK",
            "#SK": "SK",
          },
          ExpressionAttributeValues: {
            ":PK": `TAGS`,
            ":sk_prefix": `TAG#${tag}`,
          },
        })
        .promise();

      if (tagExists.Count > 0) {
        console.log(`Tag already exists: ${putRequestParams.Item.tagName}`);
      } else {
        const response = await docClient.put(putRequestParams).promise();
        console.log(`Successfully added tag: ${putRequestParams.Item.tagName}`);
        console.log(response);
      }
    } catch (err) {
      console.error(`Error processing tag: ${tag}`);
      console.error(err);
    }
  });
  
  const tagPutRequests = questionInput.tags!.flatMap(tag => [
        // {
        //     PutRequest: {
        //         Item: {
        //             PK: questionInput.quesId,
        //             SK: `TAG#${tag}`,
        //             type: 'tag',
        //             tagName: tag,
        //             count: 0
        //         },
        //     },
        // },
        {
            PutRequest: {
                Item: {
                    PK: `TAG#${tag}`,
                    SK: `QUESTION#${questionInput.quesId}`,
                    type: 'question',
                    quesId: questionInput.quesId,
                    author: questionInput.author,
                    title: questionInput.title,
                    body: questionInput.body,
                    tags: questionInput.tags,
                    points: questionInput.points,
                    views: questionInput.views,
                    acceptedAnswer: questionInput.acceptedAnswer,
                    createdAt: questionInput.createdAt,
                    updatedAt: questionInput.updatedAt,
                    upvotedBy: questionInput.upvotedBy,
                    downvotedBy: questionInput.downvotedBy,
                },
            },
        },
    ]);
    
    const batchWriteParams = {
        RequestItems: {
            "StackOverflowClonePostApiStack861B9897-StackOverflowPostsTable118A6065-1M2XMVIH3GMXR": tagPutRequests,
        },
        ReturnConsumedCapacity: "TOTAL",
    };
    
    console.log("tagPutRequests:", JSON.stringify(tagPutRequests, null, 2));
    console.log("params:", JSON.stringify(batchWriteParams, null, 2));
    
    try {
        const data = await docClient.batchWrite(batchWriteParams).promise();
        console.log("Success", data);
    } catch (err) {
        console.log("Error", err);
    }
    
  // Wait for all promises to resolve
  await Promise.all(promises);
};

export default createTag;