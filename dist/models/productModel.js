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
exports.getAllProducts = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAllProducts = (page, pageSize, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const skip = (page - 1) * pageSize;
    const take = pageSize;
    const [products, total] = yield Promise.all([
        prisma.product.findMany({
            skip,
            take,
        }),
        prisma.product.count(),
    ]);
    let wishlist = [];
    if (userId) {
        try {
            const userWishlist = yield prisma.wishList.findUnique({
                where: { userId },
            });
            wishlist = userWishlist ? userWishlist.products : [];
        }
        catch (error) {
            console.error('Error fetching wishlist:', error);
        }
    }
    const productsWithWishlistStatus = products.map(product => (Object.assign(Object.assign({}, product), { isInWishlist: wishlist.includes(product.id) })));
    return { products: productsWithWishlistStatus, total };
});
exports.getAllProducts = getAllProducts;
