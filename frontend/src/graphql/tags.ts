import { API } from "aws-amplify";
import { GraphQLResult } from '@aws-amplify/api';

const getAllTagsQuery = `
query getAllTags {
  getAllTags {
    tagName
    tagId
    count
  }
}
`;
const ddbGetAllTags = async () => {
  try {
    const resp = await API.graphql({ 
      query: getAllTagsQuery,
      authMode: "API_KEY"
    });

    // Use a type assertion to specify the expected type
    const typedResp = resp as GraphQLResult<any>;

    if (typedResp.errors) {
      // Handle GraphQL errors
      console.error('GraphQL errors:', typedResp.errors);
      return [];
    }

    console.log(`data from GraphQL: ${JSON.stringify(typedResp.data, null, 2)}`);
    
    // Make sure the response structure matches your expectations
    if (typedResp.data && typedResp.data.getAllTags) {
      return typedResp.data.getAllTags;
    } else {
      return [];
    }
  } catch (error) {
    // Handle network or other errors
    console.error('Error:', error);
    return [];
  }
};

const getAllQuestionsByTagQuery = `
query getAllQuestionsByTag($tagName: String!) {
  getAllQuestionsByTag(tagName: $tagName) {
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

const ddbGetAllQuestionsByTag = async (tagName: string) => {
  const resp = await API.graphql({ 
    query: getAllQuestionsByTagQuery,
    variables: {
      tagName
    },
    authMode: "API_KEY"
  });
  console.log(`data from GraphQL: ${JSON.stringify(resp, null, 2)}`);
  // @ts-ignore
  return resp.data.getAllQuestionsByTag;
};

export {
    ddbGetAllTags,
    ddbGetAllQuestionsByTag
}