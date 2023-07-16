import { CfnOutput, Environment, RemovalPolicy, Stack, StackProps } from "aws-cdk-lib";
import { CloudFrontAllowedMethods, CloudFrontWebDistribution, OriginAccessIdentity, ViewerCertificate } from "aws-cdk-lib/aws-cloudfront";
import { CanonicalUserPrincipal, PolicyStatement } from "aws-cdk-lib/aws-iam";
import { ARecord, IHostedZone, RecordTarget } from "aws-cdk-lib/aws-route53";
import { CloudFrontTarget } from "aws-cdk-lib/aws-route53-targets";
import { BlockPublicAccess, Bucket } from "aws-cdk-lib/aws-s3";
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";

interface StackOverflowFrontendStackProps extends StackProps {
  env: Environment;
  siteDomain: string;
  viewerCertificate: ViewerCertificate;
  zone: IHostedZone;
}

export class StackOverflowFrontendStack extends Stack {
  constructor(parent: Stack, id: string, props: StackOverflowFrontendStackProps) {
    super(parent, id, props);

    const cloudfrontOAI = new OriginAccessIdentity(this, 'CloudFrontOAI', {
      comment: `OAI for ${id}`,
    });

    const bucket = new Bucket(this, 'StackOverflowFrontendBucket', {
      bucketName: '',
      publicReadAccess: false,
      removalPolicy: RemovalPolicy.DESTROY,
      websiteIndexDocument: 'index.html',
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
    });

    bucket.addToResourcePolicy(new PolicyStatement({
      actions: ["s3:GetObject"],
      resources: [bucket.arnForObjects("*")],
      principals: [new CanonicalUserPrincipal(cloudfrontOAI.cloudFrontOriginAccessIdentityS3CanonicalUserId)],
    }));
    new CfnOutput(this, 'Bucket', { value: bucket.bucketName });

    const distribution = new CloudFrontWebDistribution(this, 'StackOverflowFrontendCFDistribution', {
      viewerCertificate: props.viewerCertificate,
      originConfigs: [
        {
          s3OriginSource: {
            s3BucketSource: bucket,
            originAccessIdentity: cloudfrontOAI,
          },
          behaviors: [{
            isDefaultBehavior: true,
            compress: true,
            allowedMethods: CloudFrontAllowedMethods.GET_HEAD_OPTIONS,
          }],
        },
      ],
      errorConfigurations: [
        {
          errorCode: 403,
          errorCachingMinTtl: 10,
          responseCode: 200,
          responsePagePath: '/index.html'
        }
      ],
    });

    new ARecord(this, 'AliasRecord', {
      recordName: props.siteDomain,
      target: RecordTarget.fromAlias(new CloudFrontTarget(distribution)),
      zone: props.zone,
    });

    new BucketDeployment(this, 'DeployStackOverflowFrontend', {
      sources: [Source.asset('../frontend/build')],
      destinationBucket: bucket,
      distribution: distribution,
      distributionPaths: ["/*"],
    });

  }
}