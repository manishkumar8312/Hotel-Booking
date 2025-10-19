import express from 'express';
import { requireAuth } from '@clerk/express';
import { createOrder, verifyPayment } from '../controllers/paymentController.js';

const router = express.Router();

router.post('/create-order', requireAuth(), createOrder);
router.post('/verify', requireAuth(), verifyPayment);

export default router;