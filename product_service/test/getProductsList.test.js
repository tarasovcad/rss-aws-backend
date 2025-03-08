const { handler } = require('../lambda/getProductsList');
 
jest.mock('../lambda/products/products', () => ({
  products: [
    { id: "1", name: "Product One", price: 100 },
    { id: "2", name: "Product Two", price: 200 },
  ],
}));

test("returns product list with status code 200", async () => {
  const response = await handler();

  expect(response.statusCode).toBe(200);
  expect(JSON.parse(response.body)).toEqual([
    { id: "1", name: "Product One", price: 100 },
    { id: "2", name: "Product Two", price: 200 },
  ]);
});

