const { Stack } = require('aws-cdk-lib');
const { Function, Runtime, Code } = require('aws-cdk-lib/aws-lambda');
const { RestApi, LambdaIntegration, Cors } = require('aws-cdk-lib/aws-apigateway');


class ProductServiceStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const getProductsList = new Function(this, "GetProductsList", {
      runtime: Runtime.NODEJS_20_X,
      code: Code.fromAsset('./lambda'),
      handler: 'getProductsList.handler',
    });

    const getProductsById = new Function(this, 'GetProductsById', {
      runtime: Runtime.NODEJS_20_X,
      code: Code.fromAsset('./lambda'),
      handler: 'getProductsById.handler',
    });

    const api = new RestApi(this, "ProductServiceAPI", {
      defaultCorsPreflightOptions: {
        allowOrigins: Cors.ALL_ORIGINS,
        allowMethods: Cors.ALL_METHODS,
      },
    });

    const products = api.root.addResource("products");
    products.addMethod("GET", new LambdaIntegration(getProductsList));

    const productResource = products.addResource('{productId}');
    productResource.addMethod('GET', new LambdaIntegration(getProductsById));

  }
}
module.exports = { ProductServiceStack }
