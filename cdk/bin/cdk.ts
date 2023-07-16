#!/usr/bin/env node
import { App, Environment, Stack, StackProps } from 'aws-cdk-lib';
import { StackOverflowFrontendStack } from '../lib/stackoverflow-frontend-stack';
import { CertificateStack } from '../lib/certificate-stack';
require("dotenv").config({ path: '.env' });

const targetRegion = "us-east-1";

const app = new App();

class StackOverflowClone extends Stack {
  constructor(parent: App, name: string, props: StackProps) {
    super(parent, name, props);
    const certificate = new CertificateStack(this, 'CertificateStack', {
      env: props.env as Environment,
      domainName: '',
      siteSubDomain: '*',
    })

    new StackOverflowFrontendStack(this, 'StackOverflowFrontendStack', {
      env: props.env as Environment,
      siteDomain: certificate.siteDomain,
      viewerCertificate: certificate.viewerCertificate,
      zone: certificate.zone,
    });
  }
}

new StackOverflowClone(app, 'StackOverflowClone', {
  env: {
    region: targetRegion,
    account: process.env.AWS_ACCOUNT,
  },
});