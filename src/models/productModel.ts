import { PrismaClient, Product } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllProducts = async (page: number, pageSize: number): Promise<{ products: Product[], total: number }> => {
  const skip = (page - 1) * pageSize;
  const take = pageSize;

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      skip,
      take,
    }),
    prisma.product.count(),
  ]);

  return { products, total };
};
