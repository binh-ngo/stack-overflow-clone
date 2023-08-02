const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();
import { Question, QuestionInput } from "../types";
require("dotenv").config({ path: ".env" });

const createQuestion = async (questionInput: QuestionInput) => {
    console.log(
        `createQuestion invocation event: ${JSON.stringify(questionInput, null, 2)}`
    );

    const quesId = new Date().toISOString();
    // TODO: userAuth
    // const author = loggedinUser()

    const question: Question = {
        quesId: quesId,
        author: questionInput.author,
        title: questionInput.title,
        body: questionInput.body,
        tags: questionInput.tags,
        points: 0,
        views: 0,
        acceptedAnswer: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        comments: null,
        answers: null,
        upvotedBy: null,
        downvotedBy: null
    };

const formattedAuthor = questionInput.author.trim().replace(/\s+/g, "");
const params = {
    TableName: process.env.POSTS_TABLE,
    Item: {
      PK: `AUTHOR#${formattedAuthor}`,
      SK: `QUESTION#${quesId}`,
      type: "question",
      ...question,
    },
    ReturnConsumedCapacity: "TOTAL",
  };
    try {
        // await docClient.transactWrite({
        //     TransactItems: [{
        //         Put: {
        //             TableName: process.env.POSTS_TABLE,
        //             Item: {
        //                 PK: `QUESTION#${questionInput.author}`,
        //                 SK: quesId,
        //                 ...question,
        //             },
        //             ReturnConsumedCapacity: "TOTAL",
        //         }
        //     }, {
        //         Update: {
        //             TableName: process.env.USERS_TABLE,
        //             Key: {
        //                 author: questionInput.author
        //             },
        //             UpdateExpression: 'ADD totalQuestions :one',
        //             ExpressionAttributeValues: {
        //                 ':one': 1
        //             },
        //             ConditionExpression: 'attribute_exists(author)'
        //         }
        //     }
        //     ]
        // }).promise();     
        await docClient.put(params).promise();
        return question;

    } catch (err) {
        console.log(`DynamoDB Error: ${JSON.stringify(err, null, 2)}`);

        return null;
    }
};

export default createQuestion;