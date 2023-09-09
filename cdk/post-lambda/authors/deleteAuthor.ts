const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

const deleteAuthor = async (author: string, id: string) => {
  const params = {
    TableName: process.env.POSTS_TABLE,
    Key: {
      PK: `AUTHOR#${author}`,
      SK: id,
    },
    ReturnConsumedCapacity: "TOTAL",
  };

  try {
    await docClient.delete(params).promise();
    return id;
  } catch (err) {
    console.log(`DynamoDB Error: ${JSON.stringify(err, null, 2)}`);

    return null;
  }
};

export default deleteAuthor;