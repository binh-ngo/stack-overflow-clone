import { CfnOutput, Environment, Stack, StackProps } from "aws-cdk-lib";
import { Certificate, CertificateValidation } from "aws-cdk-lib/aws-certificatemanager";
import { SecurityPolicyProtocol, SSLMethod, ViewerCertificate } from "aws-cdk-lib/aws-cloudfront";
import { Metric } from "aws-cdk-lib/aws-cloudwatch";
import { HostedZone, IHostedZone } from "aws-cdk-lib/aws-route53";

interface CertificateStackProps extends StackProps {
  env: Environment;
  domainName: string;
  siteSubDomain: string;
}

export class CertificateStack extends Stack {
  readonly viewerCertificate: ViewerCertificate;
  readonly siteDomain: string;
  readonly zone: IHostedZone;

  constructor(parent: Stack, id: string, props: CertificateStackProps) {
    super(parent, id, props);

    this.zone = HostedZone.fromLookup(this, 'HostedZone', {
      domainName: props.domainName,
    });
    this.siteDomain = `${props.siteSubDomain}.${props.domainName}`
    new CfnOutput(this, 'Site', { value: `https://${this.siteDomain}` });

    const certificate = new Certificate(this, "WebsiteCertificate", {
      domainName: this.siteDomain,
      validation: CertificateValidation.fromDns(this.zone),
    });
    const certificateArn = certificate.certificateArn;
    new CfnOutput(this, 'Certificate', { value: certificateArn });

    this.viewerCertificate = ViewerCertificate.fromAcmCertificate({
      certificateArn: certificateArn,
      env: {
        region: props.env.region as string,
        account: props.env.account as string,
      },
      node: this.node,
      stack: parent,
      metricDaysToExpiry: () => new Metric({
        namespace: "TLS Viewer Certificate Validity",
        metricName: "TLS Viewer Certificate Expired",
      }),
      // https://github.com/aws-samples/aws-cdk-examples/issues/584
      // the type does not seem correct here, but this value will work for now
      applyRemovalPolicy: certificate.applyRemovalPolicy,
    }, {
      sslMethod: SSLMethod.SNI,
      securityPolicy: SecurityPolicyProtocol.TLS_V1_2016,
      aliases: [this.siteDomain]
    });

  }
}