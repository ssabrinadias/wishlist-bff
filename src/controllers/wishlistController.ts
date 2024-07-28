import { Request, Response } from 'express';
import { getAllProducts } from '../models/wishlistModel';

export const getWishlist = async (req: Request, res: Response) => {
  try {
    const allProducts = await getAllProducts();
    res.status(200).send(allProducts);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch products' });
  }
};
