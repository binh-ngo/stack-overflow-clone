import { API } from "aws-amplify";

export type SaveAnswerProps = {
    answerAuthor: string;
    body: string;
    quesId: string;
    quesAuthor: string;
  }


const createAnswerQuery = `
mutation createAnswer($answer: AnswerInput!) {
  createAnswer(answer: $answer) {
    author
    ansId
    quesId
    quesAuthor
    body
    points
    upvotedBy
    downvotedBy
    createdAt
    updatedAt
  }
}
`;

const ddbCreateAnswer = async (answer: SaveAnswerProps) => {
  // const contentString = JSON.stringify(value).replace(/"/g, '\\"');
  const bodyString = JSON.stringify(answer.body);
  // console.log(`contentString: ${contentString}`);
  const resp = await API.graphql({
    query: createAnswerQuery,
    variables: {
      answer: {
        answerAuthor: answer.answerAuthor,
        body: bodyString,
        quesId: answer.quesId,
        quesAuthor: answer.quesAuthor
      },
    },
    authMode: "AMAZON_COGNITO_USER_POOLS",
  });
  console.log(`data from GraphQL: ${JSON.stringify(resp, null, 2)}`);
  return resp;
};

const getAllAnswersQuery = `
query getAllAnswers($quesId: String!) {
  getAllAnswers(quesId: $quesId) {
    author
    body
    points
    createdAt
  }
}
`

const ddbGetAllAnswers = async (quesId: string) => {
  const resp = await API.graphql({
    query: getAllAnswersQuery,
    variables: {
      quesId,
    },
    authMode: "API_KEY",
  });
  console.log(`data from GraphQL: ${JSON.stringify(resp, null, 2)}`);
    // @ts-ignore
  return resp.data.getAllAnswers;
};

export {
    ddbCreateAnswer,
    ddbGetAllAnswers
}