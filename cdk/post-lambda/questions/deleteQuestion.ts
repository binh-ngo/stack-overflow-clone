const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

const deleteQuestion = async (author: string, quesId: string) => {
  console.log(
    `deleteQuestion invocation event: ${JSON.stringify(`Author: ${author}, QuesId: ${quesId}`, null, 2)}`
  );

  try {
    // First, retrieve the question to get its tags
    const getItemParams = {
      TableName: process.env.POSTS_TABLE, 
      Key: {
        PK: quesId,
        SK: quesId,
      },
    };

    const { Item } = await docClient.get(getItemParams).promise();

    if (!Item) {
      console.log(`Question with QuesId ${quesId} not found.`);
      return null;
    }

    const tagDeleteRequests = Item.tags.flatMap((tag: string) => [
      {
        DeleteRequest: {
          Key: {
            PK: quesId,
            SK: `TAG#${tag}`,
          },
        },
      },
      {
        DeleteRequest: {
          Key: {
            PK: `TAG#${tag}`,
            SK: quesId,
          },
        },
      },
    ])
    // Delete the question and associated tags in a batch write operation

    const batchWriteParams = {
      RequestItems: {
        "StackOverflowClonePostApiStack861B9897-StackOverflowPostsTable118A6065-1M2XMVIH3GMXR": [
          {
            DeleteRequest: {
              Key: {
                PK: author,
                SK: quesId,
              },
            },
          },
          {
            DeleteRequest: {
              Key: {
                PK: quesId,
                SK: quesId,
              },
            },
          },
          ...tagDeleteRequests
        ],
      },
    };
    console.log(`DELETE PARAMS ----- ${JSON.stringify(batchWriteParams)}`)
    // Perform the batch write operation
    await docClient.batchWrite(batchWriteParams).promise();

    return `Deleted QuesId: ${quesId}`;
  } catch (err) {
    console.log(`DynamoDB Error: ${JSON.stringify(err, null, 2)}`);
    return null;
  }  
  // const params = {
  //   // TableName: process.env.POSTS_TABLE,
  //   // Key: {
  //   //   PK: author,
  //   //   SK: quesId,
  //   // },
  //   // ReturnConsumedCapacity: "TOTAL",
  //   RequestItems: {
  //     "StackOverflowClonePostApiStack861B9897-StackOverflowPostsTable118A6065-1M2XMVIH3GMXR": [
  //       {
  //         DeleteRequest: {
  //           Key: {
  //               PK: author,
  //               SK: quesId,
  //           }
  //         }
  //       },
  //       {
  //         DeleteRequest: {
  //           Key: {
  //               PK: quesId,
  //               SK: quesId,
  //           }
  //         }
  //       },
  //       {
  //         DeleteRequest: {
  //           Key: {
  //               PK: quesId,
  //               SK: quesId,
  //           }
  //         }
  //       },
  //     ]
  //   }
  // };

  // try {
  //   await docClient.delete(params).promise();
  //   return quesId;
  // } catch (err) {
  //   console.log(`DynamoDB Error: ${JSON.stringify(err, null, 2)}`);

  //   return null;
  // }
};

export default deleteQuestion;