import { ddbQueryPostsParams } from "../types";

const AWS = require("aws-sdk");
require('dotenv').config()
const docClient = new AWS.DynamoDB.DocumentClient();

const getTagById = async (tagName: string) => {
  console.log(`getTagById called with: (${tagName}`);

  const params = {
    TableName: process.env.POSTS_TABLE,
    KeyConditionExpression: "#PK = :PK and #SK = :SK",
    ExpressionAttributeNames: {
      "#PK": "PK",
      "#SK": "SK",    
    },
    ExpressionAttributeValues: {
      ":PK": `TAGS`,
      ":SK": `TAGS#${tagName}`
    },
    ReturnConsumedCapacity: "TOTAL",
  };
  
  try {
    const data = await docClient.query(params).promise();

    console.log(`data: ${JSON.stringify(data, null, 2)}`);
    return data.Item;

    } catch (err) {
    console.log(`err: ${JSON.stringify(err, null, 2)}`);

    return null;
  }
};


export default getTagById;