#!/usr/bin/env node
import { App, Environment, Stack, StackProps } from 'aws-cdk-lib';
import { StackOverflowFrontendStack } from '../lib/stackoverflow-frontend-stack';
import { CognitoStack } from "../lib/cognito-stack";
import { PostApiStack } from "../lib/post-api-stack";
require("dotenv").config({ path: '.env' });

const targetRegion = "us-east-1";

const app = new App();

class StackOverflowClone extends Stack {
  constructor(parent: App, name: string, props: StackProps) {
    super(parent, name, props);

    new StackOverflowFrontendStack(this, 'StackOverflowFrontendStack', {
      env: props.env as Environment,
    });

    const cognito = new CognitoStack(this, "CognitoStack", {
      env: props.env as Environment,
    });
    
    new PostApiStack(this, "PostApiStack", {
      env: props.env as Environment,
      userPool: cognito.userPool,
    });
  }
}

new StackOverflowClone(app, 'StackOverflowClone', {
  env: {
    region: targetRegion,
    account: process.env.AWS_ACCOUNT,
  },
});