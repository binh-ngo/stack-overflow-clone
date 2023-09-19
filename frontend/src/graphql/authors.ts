import { GraphQLResult } from '@aws-amplify/api';
import { API } from "aws-amplify";

const getAllAuthorsQuery = `
query getAllAuthors {
  getAllAuthors {
    authId
    authName
    createdAt
  }
}
`;
const ddbGetAllAuthors = async () => {
  try {
    const resp = await API.graphql({ 
      query: getAllAuthorsQuery,
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
    if (typedResp.data && typedResp.data.getAllAuthors) {
      return typedResp.data.getAllAuthors;
    } else {
      return [];
    }
  } catch (error) {
    // Handle network or other errors
    console.error('Error:', error);
    return [];
  }
};

export {
    ddbGetAllAuthors
}