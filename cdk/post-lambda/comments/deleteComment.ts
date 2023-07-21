const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

const deleteComment = async (author: string, commId: string) => {
  const params = {
    TableName: process.env.POSTS_TABLE,
    Key: {
      PK: `COMMENT#${author}`,
      SK: commId,
    },
    ReturnConsumedCapacity: "TOTAL",
  };

  try {
    await docClient.delete(params).promise();
    return commId;
  } catch (err) {
    console.log(`DynamoDB Error: ${JSON.stringify(err, null, 2)}`);

    return null;
  }
};

export default deleteComment;