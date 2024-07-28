import request from 'supertest';
import express, { Application } from 'express';
import { getWishlist } from '../../src/controllers/wishlistController';
import { getAllProducts } from '../../src/models/wishlistModel';

jest.mock('../../src/models/wishlistModel');

const app: Application = express();
app.get('/wishlist', getWishlist);

describe('getWishlist', () => {
  it('should return all products', async () => {
    const mockProducts = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];
    (getAllProducts as jest.Mock).mockResolvedValue(mockProducts);

    const response = await request(app).get('/wishlist');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockProducts);
  });

  it('should return status 500 if there is an error', async () => {
    (getAllProducts as jest.Mock).mockRejectedValue(new Error('Database error'));

    const response = await request(app).get('/wishlist');

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Failed to fetch products' });
  });
});
