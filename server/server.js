import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { clerkMiddleware } from '@clerk/express';
import connectDB from './configs/db.js';
import bookingRoutes from './routes/bookingRoutes.js';
import clerkWebhooks from './controllers/clerkWebhooks.js';

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

// Clerk webhook needs raw body (BEFORE express.json())
app.post('/api/webhooks/clerk', express.raw({type: 'application/json'}), clerkWebhooks);

// Regular JSON parsing
app.use(express.json());

// Attach Clerk middleware (parses auth tokens)
app.use(clerkMiddleware());

// Health check route
app.get('/health', (_req, res) => {
  console.log('✅ Health check called');
  res.json({ ok: true, message: 'Server is running' });
});

// Booking routes
app.use('/api/bookings', bookingRoutes);

// 404 handler (keep last)
app.use((req, res) => {
  console.log('❌ 404:', req.method, req.url);
  res.status(404).json({ message: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});

app.listen(PORT, () => {
  console.log(`\n✅ Server is running on http://localhost:${PORT}`);
  console.log(`✅ Health check: http://localhost:${PORT}/health\n`);
});