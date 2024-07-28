"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const wishlistController_1 = require("../controllers/wishlistController");
const router = (0, express_1.Router)();
router.get('/:userId', wishlistController_1.getWishlist);
router.post('/:userId', wishlistController_1.updateWishlist);
router.delete('/:userId', wishlistController_1.removeWishlist);
exports.default = router;
