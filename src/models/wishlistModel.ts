import { PrismaClient, Product } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllProducts = async (): Promise<Product[]> => {
  return prisma.product.findMany();
};
