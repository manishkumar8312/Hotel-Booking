import express from 'express';
import { clerkMiddleware, requireAuth } from '@clerk/express';
import {
  createBooking,
  getUserBookings,
  getBookingById,
  updatePaymentStatus,
  cancelBooking
} from '../controllers/bookingController.js';

const router = express.Router();

// Test route (no auth needed)
router.get('/test', (req, res) => {
    res.json({ message: 'Booking routes are working!' });
});

// Protected routes - requireAuth() checks if user is authenticated
router.post('/create', requireAuth(), createBooking);
router.get('/user', requireAuth(), getUserBookings);
router.get('/:bookingId', requireAuth(), getBookingById);
router.put('/:bookingId/payment', requireAuth(), updatePaymentStatus);
router.put('/:bookingId/cancel', requireAuth(), cancelBooking);

export default router;