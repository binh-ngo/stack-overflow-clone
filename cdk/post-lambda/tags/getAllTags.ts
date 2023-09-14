import { ddbQueryPostsParams } from "../types";
require('dotenv').config()

const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

const getAllTags = async () => {
  console.log(`getAllTags called`);

  const params: ddbQueryPostsParams = {
    TableName: process.env.POSTS_TABLE || "",
    KeyConditionExpression: "#PK = :post_partition AND begins_with(#SK, :sk_prefix)",
    ExpressionAttributeNames: {
      "#PK": "PK",
      "#SK": "SK"
    },
    ExpressionAttributeValues: {
      ":post_partition": "TAGS",
      ":sk_prefix": "TAG#",
    },
    ReturnConsumedCapacity: "TOTAL",
    ScanIndexForward: false, // Set this to true for ascending order
  };
console.log(`PARAMS ------ ${JSON.stringify(params)}`);
  try {
    const data = await docClient.query(params).promise();

    return data.Items;

  } catch (err) {
    console.log(`err: ${JSON.stringify(err, null, 2)}`);

    return null;
  }
};

export default getAllTags;
