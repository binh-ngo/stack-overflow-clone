// import { PostInput } from "../../post-lambda/Post";

import { QuestionInput } from "../../post-lambda/types";

const we_invoke_getPostById = async (author: string, postId: string) => {
  const handler = require("../../post-lambda/main").handler;

  const event = {
    info: {
      fieldName: "getPostById",
    },
    arguments: {
      author,
      postId,
    },
  };

  console.log(
    `getPostById invocation event: ${JSON.stringify(event, null, 2)}`
  );

  const post = await handler(event);

  console.log(`getPostById result: ${JSON.stringify(post, null, 2)}`);

  return post;
};

const we_invoke_getPosts = async (author: string) => {
  const handler = require("../../post-lambda/main").handler;

  const event = {
    info: {
      fieldName: "getPosts",
    },
    arguments: {
      author,
    },
  };

  console.log(`getPosts invocation event: ${JSON.stringify(event, null, 2)}`);

  const posts = await handler(event);

  console.log(`getPosts result: ${JSON.stringify(posts, null, 2)}`);

  return posts;
};

const we_invoke_getPublishedPosts = async (author: string) => {
  const handler = require("../../post-lambda/main").handler;

  const event = {
    info: {
      fieldName: "getPublishedPosts",
    },
    arguments: {
      author,
    },
  };

  console.log(
    `getPublishedPosts invocation event: ${JSON.stringify(event, null, 2)}`
  );

  const posts = await handler(event);

  console.log(`getPublishedPosts result: ${JSON.stringify(posts, null, 2)}`);

  return posts;
};

const we_invoke_createPost = async (postInput: QuestionInput) => {
  const handler = require("../../post-lambda/main").handler;

  const event = {
    info: {
      fieldName: "createPost",
    },
    arguments: {
      post: postInput,
    },
  };

  console.log(`createPost invocation event: ${JSON.stringify(event, null, 2)}`);

  const post = await handler(event);

  console.log(`createPost result: ${JSON.stringify(post, null, 2)}`);

  return post;
};

const we_invoke_deletePost = async (author: string, postId: string) => {
  const handler = require("../../post-lambda/main").handler;

  const event = {
    info: {
      fieldName: "deletePost",
    },
    arguments: {
      author,
      postId,
    },
  };

  console.log(`deletePost invocation event: ${JSON.stringify(event, null, 2)}`);

  await handler(event);

  return postId;
};

const we_invoke_updatePost = async (
  author: string,
  postId: string,
  postInput: QuestionInput
) => {
  const handler = require("../../post-lambda/main").handler;

  const event = {
    info: {
      fieldName: "updatePost",
    },
    arguments: {
      author,
      postId,
      post: postInput,
    },
  };

  console.log(`updatePost invocation event: ${JSON.stringify(event, null, 2)}`);

  const updatedPost = await handler(event);

  console.log(`updatePost result: ${JSON.stringify(updatedPost, null, 2)}`);

  return updatedPost;
};

const we_invoke_publishPost = async (author: string, postId: string) => {
  const handler = require("../../post-lambda/main").handler;

  const event = {
    info: {
      fieldName: "publishPost",
    },
    arguments: {
      author,
      postId,
    },
  };

  console.log(
    `publishPost invocation event: ${JSON.stringify(event, null, 2)}`
  );

  const resp = await handler(event);

  console.log(`publishPost result: ${JSON.stringify(resp, null, 2)}`);

  return resp;
};

const we_invoke_unpublishPost = async (author: string, postId: string) => {
  const handler = require("../../post-lambda/main").handler;

  const event = {
    info: {
      fieldName: "unpublishPost",
    },
    arguments: {
      author,
      postId,
    },
  };

  console.log(
    `unpublishPost invocation event: ${JSON.stringify(event, null, 2)}`
  );

  const resp = await handler(event);

  console.log(`unpublishPost result: ${JSON.stringify(resp, null, 2)}`);

  return resp;
};

export {
  we_invoke_createPost,
  we_invoke_getPostById,
  we_invoke_getPosts,
  we_invoke_getPublishedPosts,
  we_invoke_deletePost,
  we_invoke_updatePost,
  we_invoke_publishPost,
  we_invoke_unpublishPost,
};