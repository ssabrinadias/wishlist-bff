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
exports.getProducts = void 0;
const productModel_1 = require("../models/productModel");
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const pageSize = parseInt(req.query.pageSize, 10) || 10;
        const userId = req.get('userId');
        const { products, total } = yield (0, productModel_1.getAllProducts)(page, pageSize, userId);
        const totalPages = Math.ceil(total / pageSize);
        res.status(200).json({
            total,
            pageSize,
            totalPages,
            products,
        });
    }
    catch (error) {
        res.status(500).send({ error: 'Failed to fetch products' });
    }
});
exports.getProducts = getProducts;
