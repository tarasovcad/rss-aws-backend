const { products } = require('./products/products')

exports.handler = async (event) => {
    const productId = event.pathParameters.productId;
    const product = products.find((product) => product.id === productId);
  
    if (!product) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Product not found' }),
      };
    }
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify(product),
    };
  };
