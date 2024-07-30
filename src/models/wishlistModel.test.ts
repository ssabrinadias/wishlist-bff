import { PrismaClient, Product } from '@prisma/client';
import { getAllProducts } from './wishlistModel';

jest.mock('@prisma/client', () => {
  const mPrismaClient = {
    product: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
    },
    wishList: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
    },
  };
  return { PrismaClient: jest.fn(() => mPrismaClient) };
});

describe('getAllProducts', () => {
  let prisma: PrismaClient;

  beforeAll(() => {
    prisma = new PrismaClient() as unknown as jest.Mocked<PrismaClient>;
  });

  it('should return products with total count', async () => {
    const mockProducts: Product[] = [
      {
        id: 'product1',
        code: 'P1',
        name: 'Product 1',
        available: true,
        visible: true,
        fullPriceInCents: '1000',
        salePriceInCents: '800',
        rating: 4.5,
        image: 'image1.jpg',
        stockAvailable: true,
        details: { name: 'name', description: 'description' },
      },
      {
        id: 'product2',
        code: 'P2',
        name: 'Product 2',
        available: true,
        visible: true,
        fullPriceInCents: '2000',
        salePriceInCents: '1500',
        rating: 4.0,
        image: 'image2.jpg',
        stockAvailable: true,
        details: { name: 'name', description: 'description' },
      },
    ];
    const mockWishlist = { userId: 'user1', id: 'wishlist1', products: ['product1', 'product2'] };

    (prisma.wishList.findUnique as jest.Mock).mockResolvedValue(mockWishlist);
    (prisma.product.findUnique as jest.Mock).mockResolvedValue(mockProducts);

    const result = await getAllProducts('user1');

    expect(result).toEqual({
      products: [
        [
          {
            available: true,
            code: 'P1',
            details: { description: 'description', name: 'name' },
            fullPriceInCents: '1000',
            id: 'product1',
            image: 'image1.jpg',
            name: 'Product 1',
            rating: 4.5,
            salePriceInCents: '800',
            stockAvailable: true,
            visible: true,
          },
          {
            available: true,
            code: 'P2',
            details: { description: 'description', name: 'name' },
            fullPriceInCents: '2000',
            id: 'product2',
            image: 'image2.jpg',
            name: 'Product 2',
            rating: 4,
            salePriceInCents: '1500',
            stockAvailable: true,
            visible: true,
          },
        ],
        [
          {
            available: true,
            code: 'P1',
            details: { description: 'description', name: 'name' },
            fullPriceInCents: '1000',
            id: 'product1',
            image: 'image1.jpg',
            name: 'Product 1',
            rating: 4.5,
            salePriceInCents: '800',
            stockAvailable: true,
            visible: true,
          },
          {
            available: true,
            code: 'P2',
            details: { description: 'description', name: 'name' },
            fullPriceInCents: '2000',
            id: 'product2',
            image: 'image2.jpg',
            name: 'Product 2',
            rating: 4,
            salePriceInCents: '1500',
            stockAvailable: true,
            visible: true,
          },
        ],
      ],
      userId: 'user1',
    });
  });
});
