import { Router } from 'express';
import { getWishlist, removeWishlist, updateWishlist } from '../controllers/wishlistController';

const router = Router();

router.get('/:userId', getWishlist);
router.post('/:userId', updateWishlist);
router.delete('/:userId', removeWishlist);

export default router;
