const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();
import { ulid } from "ulid";
import { Author, AuthorInput } from "../types";
require("dotenv").config({ path: ".env" });

const createAuthor = async (authorInput: AuthorInput) => {
    console.log(
        `createAuthor invocation event: ${JSON.stringify(authorInput, null, 2)}`
    );

    const id = ulid();
     const formattedAuthor = authorInput.author ? authorInput.author.trim().replace(/\s+/g, "") : "";

    const author: Author = {
        author: `AUTHOR#${formattedAuthor}`,
        id: `AUTHOR#${id}`,
        createdAt: new Date().toISOString(),
        totalAnswers: 0,
        totalQuestions: 0
    };

    const params = {
        TableName: process.env.POSTS_TABLE,
        Item: {
            PK: `AUTHOR#${authorInput.author}`,
            SK: id,
            type: "author",
            ...author,
        },
        ReturnConsumedCapacity: "TOTAL",
    };

    try {
        await docClient.put(params).promise();
        return author;

    } catch (err) {
        console.log(`DynamoDB Error: ${JSON.stringify(err, null, 2)}`);

        return null;
    }
}
export default createAuthor;