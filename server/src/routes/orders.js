import express from 'express';
import { createOrder, getOrders, getOrder, getAllOrders, updateOrderStatus } from '../controllers/orderController.js';
import { authenticate, isAdmin } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authenticate, createOrder);
router.get('/', authenticate, getOrders);
router.get('/all', authenticate, isAdmin, getAllOrders);
router.get('/:id', authenticate, getOrder);
router.put('/:id/status', authenticate, isAdmin, updateOrderStatus);

export default router;
