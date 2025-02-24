
import { products } from './products/products';
export const handler = async (event: any) => {
  try {
    return {
      statusCode: 200,
      body: JSON.stringify(products),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  } catch (error: any) {
    return {
      statusCode: 500,
    //   headers,
      body: JSON.stringify(error.message),
    };
  }
};
