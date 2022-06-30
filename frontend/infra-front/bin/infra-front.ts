#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { InfraFrontStack } from '../lib/infra-front-stack';

const app = new cdk.App();
new InfraFrontStack(app, 'InfraFrontStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});
