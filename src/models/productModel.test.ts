import { PrismaClient, Product } from '@prisma/client';
import { getAllProducts } from '../../src/models/productModel';

jest.mock('@prisma/client', () => {
  const mPrismaClient = {
    product: {
      findMany: jest.fn(),
      count: jest.fn(),
    },
  };
  return { PrismaClient: jest.fn(() => mPrismaClient) };
});

describe('getAllProducts', () => {
  let prisma: PrismaClient;

  beforeAll(() => {
    prisma = new PrismaClient();
  });

  it('should return products with total count', async () => {
    const mockProducts: Product[] = [
      {
        id: '1',
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
        id: '2',
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
    const mockTotal = 2;

    (prisma.product.findMany as jest.Mock).mockResolvedValue(mockProducts);
    (prisma.product.count as jest.Mock).mockResolvedValue(mockTotal);

    const page = 1;
    const pageSize = 2;
    const result = await getAllProducts(page, pageSize);

    expect(result).toEqual({ products: mockProducts, total: mockTotal });
    expect(prisma.product.findMany).toHaveBeenCalledWith({
      skip: 0,
      take: 2,
    });
    expect(prisma.product.count).toHaveBeenCalled();
  });

  it('should handle errors', async () => {
    (prisma.product.findMany as jest.Mock).mockRejectedValue(new Error('Database error'));
    (prisma.product.count as jest.Mock).mockResolvedValue(0);

    await expect(getAllProducts(1, 2)).rejects.toThrow('Database error');
  });
});
