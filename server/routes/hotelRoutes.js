import express from 'express';
import { registerHotel } from '../controller/HotelController.js';
import { requireAuth } from '@clerk/express'; // Auth middleware from Clerk
import hotelOwner from '../middleware/hotelOwnerMiddleware.js'; // Custom role check middleware

const router = express.Router();

// POST /api/hotels/register
router.post('/register', requireAuth(), hotelOwner, registerHotel);

export default router;
