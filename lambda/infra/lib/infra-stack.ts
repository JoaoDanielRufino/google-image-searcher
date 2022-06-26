import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { GoFunction } from '@aws-cdk/aws-lambda-go-alpha';
import { LambdaRestApi } from 'aws-cdk-lib/aws-apigateway';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
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
    });

    const requestModel = api.addModel('request-body', {
      schema: {
        type: apigateway.JsonSchemaType.OBJECT,
        properties: {
          apiKey: {
            type: apigateway.JsonSchemaType.STRING,
          },
          cx: {
            type: apigateway.JsonSchemaType.STRING,
          },
          q: {
            type: apigateway.JsonSchemaType.STRING,
          },
          fileType: {
            type: apigateway.JsonSchemaType.STRING,
          },
          width: {
            type: apigateway.JsonSchemaType.INTEGER,
          },
          height: {
            type: apigateway.JsonSchemaType.INTEGER,
          },
          start: {
            type: apigateway.JsonSchemaType.INTEGER,
          },
        },
        required: ['apiKey', 'cx', 'q'],
      },
    });

    api.root.addMethod(
      'POST',
      new apigateway.LambdaIntegration(lambdaFunction),
      {
        requestModels: {
          'application/json': requestModel,
        },
        requestValidatorOptions: {
          validateRequestBody: true,
        },
      }
    );
  }
}
