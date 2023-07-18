import {
    CfnOutput,
    Duration,
    Expiration,
    Stack,
    StackProps,
  } from "aws-cdk-lib";
  import { IUserPool } from "aws-cdk-lib/aws-cognito";
  import { AttributeType, BillingMode, Table } from "aws-cdk-lib/aws-dynamodb";
  import {
    AuthorizationType,
    FieldLogLevel,
    GraphqlApi,
    Schema,
    UserPoolDefaultAction,
  } from "@aws-cdk/aws-appsync-alpha";
  import {
    Code,
    Function as LambdaFunction,
    Runtime,
  } from "aws-cdk-lib/aws-lambda";
import { Effect, PolicyStatement, Role, ServicePrincipal } from "aws-cdk-lib/aws-iam";
  
  interface PostApiStackProps extends StackProps {
    readonly userPool: IUserPool;
  }
  
  export class PostApiStack extends Stack {
    constructor(parent: Stack, id: string, props: PostApiStackProps) {
      super(parent, id, props);
  
      const postsTable = new Table(this, "StackOverflowPostsTable", {
        billingMode: BillingMode.PAY_PER_REQUEST,
        partitionKey: {
          name: "PK",
          type: AttributeType.STRING,
        },
        sortKey: {
          name: "SK",
          type: AttributeType.STRING,
        },
      });
      new CfnOutput(this, "StackOverflowPostsTableName", {
        value: postsTable.tableName,
      });
  
      const usersTable = new Table(this, "StackOverflowUsersTable", {
        billingMode: BillingMode.PAY_PER_REQUEST,
        partitionKey: {
          name: "PK",
          type: AttributeType.STRING,
        },
        sortKey: {
          name: "SK",
          type: AttributeType.STRING,
        },
      });
      new CfnOutput(this, "StackOverflowUsersTableName", {
        value: usersTable.tableName,
      });
  
      const postLambda = new LambdaFunction(this, "StackOverflowPostLambda", {
        runtime: Runtime.NODEJS_14_X,
        handler: "main.handler",
        code: Code.fromAsset("post-lambda"),
        memorySize: 512,
        environment: {
          POSTS_TABLE: postsTable.tableName,
        },
      });
      postsTable.grantFullAccess(postLambda);

      const usersLambda = new LambdaFunction(this, "StackOverflowUserLambda", {
        runtime: Runtime.NODEJS_14_X,
        handler: "main.handler",
        code: Code.fromAsset("user-lambda"),
        memorySize: 512,
        environment: {
          USER_TABLE: usersTable.tableName,
        },
      });
      postsTable.grantFullAccess(postLambda);
  
      const api = new GraphqlApi(this, "PostApi", {
        name: "post-appsync-api",
        schema: Schema.fromAsset("./graphql/schema.graphql"),
        authorizationConfig: {
          defaultAuthorization: {
            authorizationType: AuthorizationType.API_KEY,
            apiKeyConfig: {
              expires: Expiration.after(Duration.days(365)),
            },
          },
          additionalAuthorizationModes: [
            {
              authorizationType: AuthorizationType.USER_POOL,
              userPoolConfig: {
                userPool: props.userPool,
                appIdClientRegex: ".*",
                defaultAction: UserPoolDefaultAction.ALLOW,
              },
            },
          ],
        },
        logConfig: {
          fieldLogLevel: FieldLogLevel.ERROR,
        },
        xrayEnabled: false,
      });
  
      // Prints out the AppSync GraphQL endpoint to the terminal
      new CfnOutput(this, "PostsGraphQLAPIURL", {
        value: api.graphqlUrl,
      });
  
      // Prints out the AppSync GraphQL API key to the terminal
      new CfnOutput(this, "PostGraphQLAPIKey", {
        value: api.apiKey || "",
      });
  
      // Prints out the stack region to the terminal
      new CfnOutput(this, "Stack Region", {
        value: this.region,
      });

      // Define the IAM role for the AppSync DataSource
      const appSyncDataSourceRole = new Role(this, 'AppSyncDataSourceRole', {
        assumedBy: new ServicePrincipal('appsync.amazonaws.com'),
      });
  
      // Attach the necessary policy statement to the role
      const policyStatement = new PolicyStatement({
        effect: Effect.ALLOW,
        actions: ['lambda:InvokeFunction'], // Add other required actions as needed
        resources: [postLambda.functionArn],
      });
      appSyncDataSourceRole.addToPolicy(policyStatement);
      const postDataSource = api.addLambdaDataSource(
        "PostDataSource",
        postLambda
      );
      postDataSource.createResolver({
        typeName: "Query",
        fieldName: "getQuestions",
      });
      postDataSource.createResolver({
        typeName: "Query",
        fieldName: "viewQuestion",
      });
      postDataSource.createResolver({
        typeName: "Query",
        fieldName: "getUser",
      });
      postDataSource.createResolver({
        typeName: "Query",
        fieldName: "getAllUsers",
      });
      postDataSource.createResolver({
        typeName: "Query",
        fieldName: "getAllTags",
      });
      postDataSource.createResolver({
        typeName: "Mutation",
        fieldName: "register",
      });
      postDataSource.createResolver({
        typeName: "Mutation",
        fieldName: "login",
      });
      postDataSource.createResolver({
        typeName: "Mutation",
        fieldName: "postQuestion",
      });
      postDataSource.createResolver({
        typeName: "Mutation",
        fieldName: "deleteQuestion",
      });
      postDataSource.createResolver({
        typeName: "Mutation",
        fieldName: "editQuestion",
      });
      postDataSource.createResolver({
        typeName: "Mutation",
        fieldName: "voteQuestion",
      });
      postDataSource.createResolver({
        typeName: "Mutation",
        fieldName: "postAnswer",
      });
      postDataSource.createResolver({
        typeName: "Mutation",
        fieldName: "deleteAnswer",
      });
      postDataSource.createResolver({
        typeName: "Mutation",
        fieldName: "editAnswer",
      });
      postDataSource.createResolver({
        typeName: "Mutation",
        fieldName: "voteAnswer",
      });
      postDataSource.createResolver({
        typeName: "Mutation",
        fieldName: "acceptAnswer",
      });
      postDataSource.createResolver({
        typeName: "Mutation",
        fieldName: "addQuesComment",
      });
      postDataSource.createResolver({
        typeName: "Mutation",
        fieldName: "deleteQuesComment",
      });
      postDataSource.createResolver({
        typeName: "Mutation",
        fieldName: "editQuesComment",
      });
      postDataSource.createResolver({
        typeName: "Mutation",
        fieldName: "addAnsComment",
      });
      postDataSource.createResolver({
        typeName: "Mutation",
        fieldName: "deleteAnsComment",
      });
      postDataSource.createResolver({
        typeName: "Mutation",
        fieldName: "editAnsComment",
      });
    }
  }