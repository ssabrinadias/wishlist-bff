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
exports.removeFromWishlist = exports.addFavoritesProduct = exports.getAllProducts = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAllProducts = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const wishlist = yield prisma.wishList.findUnique({
        where: {
            userId: userId,
        },
    });
    if (!wishlist) {
        throw new Error('Wishlist not found');
    }
    const products = [];
    for (const productId of wishlist.products) {
        const product = yield prisma.product.findUnique({
            where: {
                id: productId,
            },
        });
        if (product) {
            products.push(product);
        }
    }
    return { userId, products };
    ;
});
exports.getAllProducts = getAllProducts;
const addFavoritesProduct = (userId, productId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma.user.findUnique({
            where: { id: userId },
            include: { wishList: true },
        });
        if (!(user === null || user === void 0 ? void 0 : user.wishList)) {
            yield prisma.wishList.create({
                data: {
                    userId: userId,
                    products: [productId],
                },
            });
        }
        else {
            yield prisma.wishList.update({
                where: { userId: userId },
                data: { products: { push: productId } },
            });
        }
    }
    catch (error) {
        console.error('Error adding product to WishList: ', error);
        throw error;
    }
    finally {
        yield prisma.$disconnect();
    }
});
exports.addFavoritesProduct = addFavoritesProduct;
const removeFromWishlist = (userId, productId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma.user.findUnique({
            where: { id: userId },
            include: { wishList: true },
        });
        if (!(user === null || user === void 0 ? void 0 : user.wishList)) {
            throw new Error('Wishlist not found');
        }
        else {
            yield prisma.wishList.update({
                where: { userId: userId },
                data: {
                    products: {
                        set: user.wishList.products.filter((id) => id !== productId),
                    },
                },
            });
            console.log('Product removed from existing WishList.');
        }
    }
    catch (error) {
        console.error('Error removing product from WishList: ', error);
        throw error;
    }
    finally {
        yield prisma.$disconnect();
    }
});
exports.removeFromWishlist = removeFromWishlist;
