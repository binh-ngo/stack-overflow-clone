const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

const deleteAnswer = async (author: string, ansId: string) => {
  const params = {
    TableName: process.env.POSTS_TABLE,
    Key: {
      PK: `AUTHOR#${author}`,
      SK: `ANSWER#${ansId}`
    },
    ReturnConsumedCapacity: "TOTAL",
  };

  try {
    await docClient.delete(params).promise();
    return ansId;
  } catch (err) {
    console.log(`DynamoDB Error: ${JSON.stringify(err, null, 2)}`);

    return null;
  }
};

export default deleteAnswer;