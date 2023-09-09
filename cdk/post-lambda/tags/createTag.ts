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

const promises = questionInput.tags.map(async (tag) => {

    const tagId = ulid();
    
    const putRequestParams = {
      TableName: process.env.POSTS_TABLE,
      Item: {
        PK: `TAG#${tag}`,
        SK: `TAG#${tagId}`,
        type: "tag",
        tagName: tag,
        count: 0,
      },
    };

    try {
      const tagExists = await docClient.query({
          TableName: process.env.POSTS_TABLE,
          KeyConditionExpression: "#PK = :post_partition AND begins_with(#SK, :sk_prefix)",
          ExpressionAttributeNames: {
            "#PK": "PK",
            "#SK": "SK",
          },
          ExpressionAttributeValues: {
            ":post_partition": `TAG#${tag}`,
            ":sk_prefix": "TAG#",
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
  
  const tagPutRequests = questionInput.tags.flatMap(tag => [
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