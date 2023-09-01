import { ddbQueryPostsParams } from "../types";
require('dotenv').config()

const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();


const getQuestionWithAnswersAndComments = async (quesId: string) => {
  console.log(`getQuestionWithAnswersAndComments called with: ${quesId}`);

  const params: ddbQueryPostsParams = {
    TableName: process.env.POSTS_TABLE || "",
    IndexName: "GSI1PK",
    KeyConditionExpression: "#quesId = :quesId",
    ExpressionAttributeNames: {
      "#quesId": "quesId",
    },
    ExpressionAttributeValues: {
      ":quesId": quesId,
    },
    ReturnConsumedCapacity: "TOTAL",
    ScanIndexForward: false,
  };

  try {
    const data = await docClient.query(params).promise();

    console.log(`data: ${JSON.stringify(data, null, 2)}`);

    return data.Items;

  } catch (err) {
    console.log(`err: ${JSON.stringify(err, null, 2)}`);

    return null;
  }
};

export default getQuestionWithAnswersAndComments;
