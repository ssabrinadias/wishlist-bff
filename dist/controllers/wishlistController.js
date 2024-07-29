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
exports.removeWishlist = exports.addWishlist = exports.getWishlist = void 0;
const wishlistModel_1 = require("../models/wishlistModel");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getWishlist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    // const token = req.headers.authorization;
    if (!userId) {
        return res.status(400).send({ error: 'User ID is required' });
    }
    try {
        const allProducts = yield (0, wishlistModel_1.getAllProducts)(userId);
        res.status(200).send(allProducts);
    }
    catch (error) {
        res.status(500).send({ error: 'Failed to fetch products' });
    }
});
exports.getWishlist = getWishlist;
const addWishlist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const { productId } = req.body;
    if (!userId) {
        return res.status(400).send({ error: 'User ID is required' });
    }
    if (!productId) {
        return res.status(400).send({ error: 'Product ID is required' });
    }
    try {
        yield (0, wishlistModel_1.addFavoritesProduct)(userId, productId);
        res.status(200).send({ message: 'Wishlist updated successfully' });
    }
    catch (error) {
        res.status(500).send({ error: 'Failed to update wishlist' });
    }
});
exports.addWishlist = addWishlist;
const removeWishlist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const { productId } = req.body;
    if (!userId) {
        return res.status(400).send({ error: 'User ID is required' });
    }
    if (!productId) {
        return res.status(400).send({ error: 'Product ID is required' });
    }
    try {
        yield (0, wishlistModel_1.removeFromWishlist)(userId, productId);
        res.status(200).send({ message: 'Product removed from wishlist successfully' });
    }
    catch (error) {
        res.status(500).send({ error: 'Failed to remove product from wishlist' });
    }
});
exports.removeWishlist = removeWishlist;
