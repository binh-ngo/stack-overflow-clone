const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

const getAnswerById = async (author: string, ansId: string) => {
  console.log(`getAnswerById called with: (${author}, ${ansId})`);

  if (!ansId) {
    return { statusCode: 400, body: `Error: You are missing the Answer ID` };
  }

  const params = {
    TableName: process.env.POSTS_TABLE,
    Key: {
      PK: `ANSWER#${author}`,
      SK: ansId,
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

export default getAnswerById;