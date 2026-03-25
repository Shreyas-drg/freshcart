import express from 'express';
import {
  createOrder, getMyOrders, getAllOrders, updateOrderStatus
} from '../controllers/ordercontroller.js';
import { protect, adminOnly } from '../middleware/authmiddleware.js';

const router = express.Router();

router.post('/', protect, createOrder);
router.get('/my', protect, getMyOrders);
router.get('/', protect, adminOnly, getAllOrders);
router.put('/:id/status', protect, adminOnly, updateOrderStatus);

export default router;