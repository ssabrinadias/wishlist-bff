import { PrismaClient, Product } from '@prisma/client';

const prisma = new PrismaClient();

interface ProductWithWishlistStatus extends Product {
  isInWishlist?: boolean;
}

export const getAllProducts = async (page: number, pageSize: number,  userId?: string): Promise<{ products: ProductWithWishlistStatus[], total: number }> => {
  const skip = (page - 1) * pageSize;
  const take = pageSize;

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      skip,
      take,
    }),
    prisma.product.count(),
  ]);

  let wishlist: string[] = [];

  if (userId) {
    try {
      const userWishlist = await prisma.wishList.findUnique({
        where: { userId },
      });
    wishlist = userWishlist ? userWishlist.products : [];
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
  }

  const productsWithWishlistStatus = products.map(product => ({
    ...product,
    isInWishlist: wishlist.includes(product.id),
  }));

  return { products:productsWithWishlistStatus, total };
};
