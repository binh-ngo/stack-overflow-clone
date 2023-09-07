// export {};
require("dotenv").config();
const AWS = require("aws-sdk");

const post_exists_in_ddb = async (author: string, postId: string) => {
  const docClient = new AWS.DynamoDB.DocumentClient();

  const postTableName = process.env.POSTS_TABLE;

  console.log(
    `looking for post [${author} + ${postId}] in table [${postTableName}]`
  );

  const params = {
    TableName: postTableName,
    Key: {
      PK: `POST#${author}`,
      SK: postId,
    },
  };

  const resp = await docClient.get(params).promise();

  console.log(`GET post resp: ${JSON.stringify(resp, null, 2)}`);

  expect(resp.Item).toBeTruthy();
  return resp.Item;
};

const author_exists_in_ddb = async (author: string) => {
  const docClient = new AWS.DynamoDB.DocumentClient();

  const postTableName = process.env.POSTS_TABLE;

  console.log(`looking for post [${author}] in table [${postTableName}]`);

  const params = {
    TableName: postTableName,
    KeyConditionExpression: "#PK = :post_partition",
    ExpressionAttributeNames: {
      "#PK": "PK",
    },
    ExpressionAttributeValues: {
      ":post_partition": `POST#${author}`,
    },
    ReturnConsumedCapacity: "TOTAL",
    ScanIndexForward: false,
  };

  const resp = await docClient.query(params).promise();

  console.log(`QUERY post resp: ${JSON.stringify(resp, null, 2)}`);

  expect(resp.Items).toBeTruthy();
  return resp.Items;
};

export { post_exists_in_ddb, author_exists_in_ddb };
// module.exports = { post_exists_in_ddb, author_exists_in_ddb };