const AWS = require("aws-sdk");
require('dotenv').config()
const docClient = new AWS.DynamoDB.DocumentClient();

const getAuthorById = async (author: string, authId: string) => {
  console.log(`getAuthorsById called with: (${author}, ${authId})`);

  if (!authId) {
    return { statusCode: 400, body: `Error: You are missing the Author ID` };
  }

  const params = {
    TableName: process.env.POSTS_TABLE,
    Key: {
      PK: author,
      SK: authId,
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


export default getAuthorById;