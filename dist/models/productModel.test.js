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
const productModel_1 = require("./productModel");
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
    let prisma;
    beforeAll(() => {
        prisma = new client_1.PrismaClient();
    });
    it('should return products with total count', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockProducts = [
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
        prisma.product.findMany.mockResolvedValue(mockProducts);
        prisma.product.count.mockResolvedValue(mockTotal);
        const page = 1;
        const pageSize = 2;
        const result = yield (0, productModel_1.getAllProducts)(page, pageSize);
        expect(result).toEqual({ products: mockProducts, total: mockTotal });
        expect(prisma.product.findMany).toHaveBeenCalledWith({
            skip: 0,
            take: 2,
        });
        expect(prisma.product.count).toHaveBeenCalled();
    }));
    it('should handle errors', () => __awaiter(void 0, void 0, void 0, function* () {
        prisma.product.findMany.mockRejectedValue(new Error('Database error'));
        prisma.product.count.mockResolvedValue(0);
        yield expect((0, productModel_1.getAllProducts)(1, 2)).rejects.toThrow('Database error');
    }));
});
