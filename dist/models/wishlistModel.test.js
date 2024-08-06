"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const wishlistModel_1 = require("./wishlistModel");
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
    let prisma;
    beforeAll(() => {
        prisma = new client_1.PrismaClient();
    });
    it('should return products with total count', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockProducts = [
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
        prisma.wishList.findUnique.mockResolvedValue(mockWishlist);
        prisma.product.findUnique.mockResolvedValue(mockProducts);
        const result = yield (0, wishlistModel_1.getAllProducts)('user1');
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
    }));
});
