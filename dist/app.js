"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const wishlistRoutes_1 = __importDefault(require("./routes/wishlistRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/products', productRoutes_1.default);
app.use('/wishlist', wishlistRoutes_1.default);
exports.default = app;
