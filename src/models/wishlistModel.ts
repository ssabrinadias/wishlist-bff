import { PrismaClient, User as PrismaUser } from '@prisma/client';

const prisma = new PrismaClient();
type UserWithWishList = PrismaUser & { wishList: { products: string[] } | null };


export const getAllProducts = async (userId: string, token?: string) => {
  const productsList = await prisma.wishList.findMany({
    where: {
      userId: userId, 
    }
  });
  return { productsList };
};



export const updateFavoritesProduct = async (userId: string, productId: string): Promise<void> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { wishList: true },
    }) as UserWithWishList | null;

    if (!user?.wishList) {
      await prisma.wishList.create({
        data: {
          userId: userId,
          products: [productId],
        },
      });
      console.log('WishList created and product added.');
    } else {
      await prisma.wishList.update({
        where: { userId: userId },
        data: { products: { push: productId } },
      });
      console.log('Product added to existing WishList.');
    }
  } catch (error) {
    console.error('Error adding product to WishList: ', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

export const removeFromWishlist = async (userId: string, productId: string): Promise<void> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { wishList: true },
    }) as UserWithWishList | null;

    if (!user?.wishList) {
      throw new Error('Wishlist not found');
    } else {
      await prisma.wishList.update({
        where: { userId: userId },
        data: {
          products: {
            set: user.wishList.products.filter((id) => id !== productId),
          },
        },
      });
      console.log('Product removed from existing WishList.');
    }
  } catch (error) {
    console.error('Error removing product from WishList: ', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};