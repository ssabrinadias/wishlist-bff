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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const wishlistController_1 = require("../../src/controllers/wishlistController");
const wishlistModel_1 = require("../../src/models/wishlistModel");
jest.mock('../../src/models/wishlistModel');
const app = (0, express_1.default)();
app.get('/wishlist', wishlistController_1.getWishlist);
describe('getWishlist', () => {
    it('should return all products', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockProducts = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];
        wishlistModel_1.getAllProducts.mockResolvedValue(mockProducts);
        const response = yield (0, supertest_1.default)(app).get('/wishlist');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockProducts);
    }));
    it('should return status 500 if there is an error', () => __awaiter(void 0, void 0, void 0, function* () {
        wishlistModel_1.getAllProducts.mockRejectedValue(new Error('Database error'));
        const response = yield (0, supertest_1.default)(app).get('/wishlist');
        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Failed to fetch products' });
    }));
});
