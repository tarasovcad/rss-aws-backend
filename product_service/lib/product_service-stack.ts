import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';

export class ProductServiceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // initiane lambda function to get all produts
    const getProductsList = new lambda.Function(this, 'GetProductsList', {
      runtime: lambda.Runtime.NODEJS_18_X, // execution environment
      handler: 'getProductsList.handler', // file that contains the handler code
      code: lambda.Code.fromAsset('lambda'), // path to Lambda function code
    });

    // API Gateway
    const api = new apigateway.RestApi(this, 'ProductServiceAPI');

    const products = api.root.addResource('products');
    products.addMethod('GET', new apigateway.LambdaIntegration(getProductsList));
  }
}
