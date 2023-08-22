import { ddbQueryPostsParams } from "../types";
require('dotenv').config()

const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

const getAllQuestionsFromAllUsers = async () => {
  console.log(`getAllQuestionsFromAllUsers called`);

  const params: ddbQueryPostsParams = {
    TableName: process.env.POSTS_TABLE || "",
    ExpressionAttributeNames: {
      "#PK": "PK",
      "#SK": "SK",
    },
    ExpressionAttributeValues: {
      ":pk_prefix": "AUTHOR#",
      ":sk_prefix": "QUESTION#",
    },
    FilterExpression: "begins_with(#PK, :pk_prefix) AND begins_with(#SK, :sk_prefix)",
    ReturnConsumedCapacity: "TOTAL",
    ScanIndexForward: false, // Set this to true for ascending order
  };

  try {
    const data = await docClient.scan(params).promise();

    console.log(`data: ${JSON.stringify(data, null, 2)}`);

    return data.Items;

  } catch (err) {
    console.log(`err: ${JSON.stringify(err, null, 2)}`);

    return null;
  }
};

export default getAllQuestionsFromAllUsers;
