const AWS = require("aws-sdk");
require('dotenv').config()
const docClient = new AWS.DynamoDB.DocumentClient();

const getTagById = async (tagName: string, tagId: string) => {
  console.log(`getTagById called with: (${tagName}, ${tagId})`);

  if (!tagId) {
    return { statusCode: 400, body: `Error: You are missing the question ID` };
  }

  const params = {
    TableName: process.env.POSTS_TABLE,
    Key: {
      PK: tagName,
      SK: tagId,
    },
    ReturnConsumedCapacity: "TOTAL",
  };
  
  try {
    const data = await docClient.get(params).promise();

    console.log(`data: ${JSON.stringify(data, null, 2)}`);
    return data.Item;

    } catch (err) {
    console.log(`err: ${JSON.stringify(err, null, 2)}`);

    return null;
  }
};


export default getTagById;