import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { SPADeploy } from 'cdk-spa-deploy';

export class StackOverflowFrontendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new SPADeploy(this, 'cfDeploy')
      .createSiteWithCloudfront({
        indexDoc: 'index.html',
        websiteFolder: '../frontend/build',
        certificateARN: "arn:aws:cloudfront::539460444185:distribution/E34IPBOSR0N4SC"
      });
  }
}
