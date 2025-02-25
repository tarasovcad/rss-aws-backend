const { handler } = require('../lambda/getProductsById');
 
jest.mock('../lambda/products/products', () => ({
  products: [
    { id: "1", name: "Product One", price: 100 },
    { id: "2", name: "Product Two", price: 200 },
  ],
}));

test("returns product when found", async () => {
  const event = { pathParameters: { productId: "1" } };
  const response = await handler(event);

  expect(response.statusCode).toBe(200);
  expect(JSON.parse(response.body)).toEqual({ id: "1", name: "Product One", price: 100 });
});

test("returns 404 when product is not found", async () => {
  const event = { pathParameters: { productId: "999" } };
  const response = await handler(event);

  expect(response.statusCode).toBe(404);
  expect(JSON.parse(response.body)).toEqual({ error: "Product not found" });
});
