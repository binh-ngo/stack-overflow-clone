import { API } from "aws-amplify";

// ===========
// CREATE QUESTION
// ===========

export type SaveQuestionProps = {
    author?:string;
    title: string;
    body: string;
    quesId?: string;
    tags?: string[];
  };

const createQuestionQuery = `
  mutation createQuestion($question: QuestionInput!) {
    createQuestion(question: $question) {
      author
      title
      body
      quesId
      createdAt
      updatedAt
      tags
      views
    }
  }
`;

const ddbCreateQuestion = async (question: SaveQuestionProps) => {
    // const contentString = JSON.stringify(value).replace(/"/g, '\\"');
    const bodyString = JSON.stringify(question.body);
    // console.log(`contentString: ${contentString}`);
    const resp = await API.graphql({
      query: createQuestionQuery,
      variables: {
        question: {
          title: question.title,
          body: bodyString,
          author: question.author,
          // tags: question.tags
        },
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
    console.log(`data from GraphQL: ${JSON.stringify(resp, null, 2)}`);
    return resp;
  };
  

// ==============
// GET Question with Answers and Comments
// ==============

const getQuestionWithAnswersAndCommentsQuery = `
    query getQuestionWithAnswersAndComments($quesId: String!) {
      getQuestionWithAnswersAndComments(quesId: $quesId) {
        author
        body
        quesId
        createdAt
      }
    }
  `;

const ddbGetQuestionWithAnswersAndComments = async (quesId: string) => {
  const resp = await API.graphql({
    query: getQuestionWithAnswersAndCommentsQuery,
    variables: {
      quesId,
    },
    authMode: "API_KEY"
  });
  // console.log(`data from GraphQL: ${JSON.stringify(resp, null, 2)}`);
  // @ts-ignore
  const data = resp.data.getQuestionWithAnswersAndComments;
  // console.log(`post.content: ${post.content}`);
  return data;
};


const getQuestionByIdQuery = `
    query getQuestionById($author: String!, $quesId: String!) {
      getQuestionById(author: $author, quesId: $quesId) {
        author
        title
        body
        quesId
        views
        points
        tags
        createdAt
        updatedAt
      }
    }
  `;

  // ==============
// GET Question By ID
// ==============

const ddbGetQuestionById = async (author: string, quesId: string) => {
  const resp = await API.graphql({
    query: getQuestionByIdQuery,
    variables: {
      author,
      quesId,
    },
    authMode: "API_KEY"
  });
  console.log(`data from GraphQL: ${JSON.stringify(resp, null, 2)}`);
  // @ts-ignore
  const question = resp.data.getQuestionById;
  // console.log(`post.content: ${post.content}`);
  return question;
};

// =========
// GET QUESTIONS
// =========

const getAllQuestionsQuery = `
query getAllQuestions($author: String!) {
  getAllQuestions(author: $author) {
    author
    title
    body
    quesId
    points
    views
    createdAt
    updatedAt
    tags
  }
}
`;

const ddbGetAllQuestions = async (author: string) => {
  const resp = await API.graphql({ 
    query: getAllQuestionsQuery,
    variables: {
      author: author
    },
    authMode: "API_KEY"
  });
  console.log(`data from GraphQL: ${JSON.stringify(resp, null, 2)}`);
  // @ts-ignore
  return resp.data.getAllQuestions;
};

const getAllQuestionsFromAllUsersQuery = `
query getAllQuestionsFromAllUsers {
  getAllQuestionsFromAllUsers {
    author
    title
    body
    quesId
    points
    views
    createdAt
    updatedAt
    tags
  }
}
`;
const ddbGetAllQuestionsFromAllUsers = async () => {
  const resp = await API.graphql({ 
    query: getAllQuestionsFromAllUsersQuery,
    authMode: "API_KEY"
  });
  console.log(`data from GraphQL: ${JSON.stringify(resp, null, 2)}`);
  // @ts-ignore
  return resp.data.getAllQuestionsFromAllUsers;
};


// ===========
// UPDATE POST
// ===========

const updateQuestionQuery = `
    mutation updateQuestion($author: String!, $quesId: String!, $question: QuestionInput!) {
      updateQuestion(author: $author, quesId: $quesId, question: $question) {
        author
        body
        createdAt
        quesId
        title
        updatedAt
        views
        tags
      }
    }
  `;

const ddbUpdateQuestion = async (question: SaveQuestionProps) => {
  const contentString = JSON.stringify(question.body);
  // console.log(`contentString: ${contentString}`);
  const resp = await API.graphql({
    query: updateQuestionQuery,
    variables: {
      author: question.author,
      postId: question.quesId,
      post: {
        author: question.author,
        title: question.title,
        body: contentString,
      },
    },
    authMode: "AMAZON_COGNITO_USER_POOLS",
  });
  console.log(`data from GraphQL: ${JSON.stringify(resp, null, 2)}`);
};

const createAnswerQuery = `
    mutation updateQuestion($author: String!, $quesId: String!, $question: QuestionInput!) {
      updateQuestion(author: $author, quesId: $quesId, question: $question) {
        author
        body
        createdAt
        quesId
        title
        updatedAt
        views
        tags
      }
    }
  `;

const ddbCreateAnswer = async (question: SaveQuestionProps) => {
  const contentString = JSON.stringify(question.body);
  // console.log(`contentString: ${contentString}`);
  const resp = await API.graphql({
    query: createAnswerQuery,
    variables: {
      author: question.author,
      postId: question.quesId,
      post: {
        author: question.author,
        title: question.title,
        body: contentString,
      },
    },
    authMode: "AMAZON_COGNITO_USER_POOLS",
  });
  console.log(`data from GraphQL: ${JSON.stringify(resp, null, 2)}`);
};

// ===========
// DELETE POST
// ===========

const deleteQuery = `
  mutation deleteQuestion($author: String!, $quesId: String!) {
    deleteQuestion(author: $author, quesId: $quesId)
  }
`;

const ddbDeleteQuestion = async (quesId: string, author: string) => {
  console.log(`delete called for question ${quesId}`);
  const resp = await API.graphql({
    query: deleteQuery,
    variables: {
      author,
      quesId,
    },
    authMode: "AMAZON_COGNITO_USER_POOLS",
  });
  // console.log(`data from GraphQL: ${JSON.stringify(resp, null, 2)}`);
  // @ts-ignore
  console.log(`successfully deleted: ${resp.data.deletePost}`);
};

export {
  ddbCreateQuestion,
  ddbGetAllQuestions,
  ddbGetQuestionById,
  ddbUpdateQuestion,
  ddbDeleteQuestion,
  ddbGetAllQuestionsFromAllUsers,
  ddbCreateAnswer,
  ddbGetQuestionWithAnswersAndComments
};
