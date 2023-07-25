const AWS = require("aws-sdk");
require('dotenv').config()
const docClient = new AWS.DynamoDB.DocumentClient();

const getQuestionsById = async (author: string, quesId: string) => {
  console.log(`getQuestionsById called with: (${author}, ${quesId})`);

  if (!quesId) {
    return { statusCode: 400, body: `Error: You are missing the question ID` };
  }

  const params = {
    TableName: process.env.POSTS_TABLE,
    Key: {
      PK: `QUESTION#${author}`,
      SK: quesId,
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

export default getQuestionsById;