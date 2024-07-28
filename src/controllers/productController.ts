import { Request, Response } from 'express';
import { getAllProducts } from '../models/productModel';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const allProducts = await getAllProducts();
    res.status(200).send(allProducts);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch products' });
  }
};
