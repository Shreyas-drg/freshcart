import express from 'express';
import { addReview, getReviews, deleteReview } from '../controllers/reviewController.js';
import { protect } from '../middleware/authmiddleware.js';

const router = express.Router();

router.get('/:productId', getReviews);
router.post('/:productId', protect, addReview);
router.delete('/:reviewId', protect, deleteReview);

export default router;