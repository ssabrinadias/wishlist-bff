import { Request, Response } from 'express';
import { getAllProducts } from '../models/productModel';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const pageSize = parseInt(req.query.pageSize as string, 10) || 10;
    const userId = req.get('userId');
    
    const { products, total } = await getAllProducts(page, pageSize, userId);
    const totalPages = Math.ceil(total / pageSize);

    res.status(200).json({
      total,
      pageSize,
      totalPages,
      products,
    });
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch products' });
  }
};
