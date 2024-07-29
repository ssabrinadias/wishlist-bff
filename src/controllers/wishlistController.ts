import { Request, Response } from 'express';
import { getAllProducts, removeFromWishlist, addFavoritesProduct } from '../models/wishlistModel';
import { PrismaClient, User as PrismaUser } from '@prisma/client'

type UserWithWishList = PrismaUser & { wishList: boolean | null };
const prisma = new PrismaClient();

export const getWishlist = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  // const token = req.headers.authorization;

  if (!userId) {
    return res.status(400).send({ error: 'User ID is required' });
  }

  try {
    const allProducts = await getAllProducts(userId);
    res.status(200).send(allProducts);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch products' });
  }
};

export const addWishlist = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const { productId } = req.body;

  if (!userId) {
    return res.status(400).send({ error: 'User ID is required' });
  }

  if (!productId) {
    return res.status(400).send({ error: 'Product ID is required' });
  }

  try {
    await addFavoritesProduct(userId, productId);
    res.status(200).send({ message: 'Wishlist updated successfully' });
  } catch (error) {
    res.status(500).send({ error: 'Failed to update wishlist' });
  }
};

export const removeWishlist = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const { productId } = req.body;

  if (!userId) {
    return res.status(400).send({ error: 'User ID is required' });
  }

  if (!productId) {
    return res.status(400).send({ error: 'Product ID is required' });
  }

  try {
    await removeFromWishlist(userId, productId);
    res.status(200).send({ message: 'Product removed from wishlist successfully' });
  } catch (error) {
    res.status(500).send({ error: 'Failed to remove product from wishlist' });
  }
};