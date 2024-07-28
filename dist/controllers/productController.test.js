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
const request = require('supertest');
const express = require('express');
const { getProducts } = require('../controllers/productController');
const { getAllProducts } = require('../models/productModel');
jest.mock('../models/productModel');
const app = express();
app.get('/products', getProducts);
describe('getProducts', () => {
    it('should return products with pagination info', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockProducts = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];
        getAllProducts.mockResolvedValue({ products: mockProducts, total: 2 });
        const response = yield request(app).get('/products?page=1&pageSize=2');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            total: 2,
            pageSize: 2,
            totalPages: 1,
            products: mockProducts,
        });
    }));
    it('should return status 500 if there is an error', () => __awaiter(void 0, void 0, void 0, function* () {
        getAllProducts.mockRejectedValue(new Error('Database error'));
        const response = yield request(app).get('/products');
        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Failed to fetch products' });
    }));
});
