import { Router } from 'express';
import { getWishlist, addWishlist, removeWishlist } from '../controllers/wishlistController';

const router = Router();

router.get('/:userId', getWishlist);
router.post('/:userId/add', addWishlist);
router.post('/:userId/remove', removeWishlist);

export default router;
