import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { GoFunction } from '@aws-cdk/aws-lambda-go-alpha';
import {
  LambdaRestApi,
  JsonSchemaType,
  LambdaIntegration,
} from 'aws-cdk-lib/aws-apigateway';
import { join } from 'path';

export class InfraStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const lambdaFunction = new GoFunction(this, 'handler', {
      entry: join(__dirname, '..', '..', 'api'),
    });

    const api = new LambdaRestApi(this, 'apigateway-lambda', {
      handler: lambdaFunction,
      proxy: false,
      defaultCorsPreflightOptions: {
        allowOrigins: [
          'http://infrafrontstack-googleimageseacherfrontendbucket3-188c4n2h12l92.s3-website-us-east-1.amazonaws.com',
        ],
        allowHeaders: ['Content-Type'],
        allowMethods: ['POST', 'OPTIONS'],
      },
    });

    const requestModel = api.addModel('request-body', {
      schema: {
        type: JsonSchemaType.OBJECT,
        properties: {
          apiKey: {
            type: JsonSchemaType.STRING,
          },
          cx: {
            type: JsonSchemaType.STRING,
          },
          q: {
            type: JsonSchemaType.STRING,
          },
          fileType: {
            type: JsonSchemaType.STRING,
          },
          width: {
            type: JsonSchemaType.INTEGER,
          },
          height: {
            type: JsonSchemaType.INTEGER,
          },
          start: {
            type: JsonSchemaType.INTEGER,
          },
        },
        required: ['apiKey', 'cx', 'q'],
      },
    });

    api.root.addMethod('POST', new LambdaIntegration(lambdaFunction), {
      requestModels: {
        'application/json': requestModel,
      },
      requestValidatorOptions: {
        validateRequestBody: true,
      },
    });
  }
}
