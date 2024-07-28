const request = require('supertest');
const express = require('express');
const { getProducts } = require('../controllers/productController');
const { getAllProducts } = require('../models/productModel');

jest.mock('../models/productModel');

const app = express();
app.get('/products', getProducts);

describe('getProducts', () => {
  it('should return products with pagination info', async () => {
    const mockProducts = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];
    getAllProducts.mockResolvedValue({ products: mockProducts, total: 2 });

    const response = await request(app).get('/products?page=1&pageSize=2');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      total: 2,
      pageSize: 2,
      totalPages: 1,
      products: mockProducts,
    });
  });

  it('should return status 500 if there is an error', async () => {
    getAllProducts.mockRejectedValue(new Error('Database error'));

    const response = await request(app).get('/products');

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Failed to fetch products' });
  });
});
