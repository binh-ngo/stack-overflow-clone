const AWS = require("aws-sdk");
require('dotenv').config()
const docClient = new AWS.DynamoDB.DocumentClient();

const incrementViews = async (author:string, quesId:string) => {
console.log(`invoking incrementViews on question (${author}, ${quesId})`)
  const updateViewsParams = {
    TableName: process.env.POSTS_TABLE,
    Key: {
      PK: author,
      SK: quesId    
    },
    UpdateExpression: "SET #views = #views + :i",
    ExpressionAttributeNames: {
      "#views": "views",
      ":i": 1
    },
    ReturnValues: "UPDATED_NEW"
  }
  
  try {
    const updatedQuestion = await docClient.update(updateViewsParams).promise();

    console.log(`updatedQuestion: ${JSON.stringify(updatedQuestion, null, 2)}`);

    return updatedQuestion.Attributes;
} catch (err) {
    console.log(`DynamoDB Error: ${JSON.stringify(err, null, 2)}`);

    return null;
}
}

const getQuestionById = async (author: string, quesId: string) => {
  console.log(`getQuestionsById called with: (${author}, ${quesId})`);

  if (!quesId) {
    return { statusCode: 400, body: `Error: You are missing the question ID` };
  }

  const params = {
    TableName: process.env.POSTS_TABLE,
    Key: {
      PK: author,
      SK: quesId,
    },
    ReturnConsumedCapacity: "TOTAL",
  };
  
  try {
    const data = await docClient.get(params).promise();

    console.log(`data: ${JSON.stringify(data, null, 2)}`);
    incrementViews(author, quesId);
    return data.Item;

    } catch (err) {
    console.log(`err: ${JSON.stringify(err, null, 2)}`);

    return null;
  }
};


export default getQuestionById;