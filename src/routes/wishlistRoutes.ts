import { Router } from 'express';
import { getWishlist } from '../controllers/wishlistController';

const router = Router();

router.get('/', getWishlist);

export default router;
