import { Stack, StackProps, RemovalPolicy } from 'aws-cdk-lib';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment';
import { Construct } from 'constructs';
import { join } from 'path';

export class InfraFrontStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const bucket = new Bucket(this, 'GoogleImageSeacherFrontendBucket', {
      websiteIndexDocument: 'index.html',
      publicReadAccess: true,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    new BucketDeployment(this, 'DeployFrontend', {
      sources: [Source.asset(join(__dirname, '..', '..', 'app', 'build'))],
      destinationBucket: bucket,
    });
  }
}
