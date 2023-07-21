const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

const getCommentById = async (author: string, commId: string) => {
  console.log(`getCommentById called with: (${author}, ${commId})`);

  if (!commId) {
    return { statusCode: 400, body: `Error: You are missing the comment ID` };
  }

  const params = {
    TableName: process.env.POSTS_TABLE,
    Key: {
      PK: `COMMENT#${author}`,
      SK: commId,
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

export default getCommentById;