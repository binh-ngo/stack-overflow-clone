const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

const deleteQuestion = async (author: string, quesId: string) => {
  const params = {
    TableName: process.env.POSTS_TABLE,
    Key: {
      PK: `AUTHOR#${author}`,
      SK: `QUESTION#${quesId}`,
    },
    ReturnConsumedCapacity: "TOTAL",
  };

  try {
    await docClient.delete(params).promise();
    return quesId;
  } catch (err) {
    console.log(`DynamoDB Error: ${JSON.stringify(err, null, 2)}`);

    return null;
  }
};

export default deleteQuestion;