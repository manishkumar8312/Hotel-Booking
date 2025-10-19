import Razorpay from 'razorpay';
import crypto from 'crypto';
import Booking from '../models/Booking.js';

// Ensure env is present and create client only when needed
const getRazorpay = () => {
  const key_id = process.env.RAZORPAY_KEY_ID;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;
  if (!key_id || !key_secret) {
    throw new Error('Missing Razorpay credentials. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in server/.env');
  }
  return new Razorpay({ key_id, key_secret });
};

export const createOrder = async (req, res) => {
  try {
    const userId = req.auth().userId;
    const { bookingId } = req.body;

    if (!bookingId) return res.status(400).json({ success: false, message: 'bookingId is required' });

    const booking = await Booking.findOne({ _id: bookingId, userId });
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
    if (booking.isPaid) return res.status(400).json({ success: false, message: 'Booking already paid' });

    const razorpay = getRazorpay();

    const amountInPaise = Math.round(Number(booking.totalPrice) * 100);
    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: 'INR',
      receipt: `rcpt_${bookingId}`,
      notes: { bookingId, userId },
    });

    booking.paymentOrderId = order.id;
    await booking.save();

    res.json({ success: true, order });
  } catch (error) {
    console.error('Razorpay createOrder error:', error);
    res.status(500).json({ success: false, message: 'Failed to create order', error: error.message });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const userId = req.auth().userId;
    const { bookingId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!bookingId || !razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ success: false, message: 'Missing payment verification fields' });
    }

    const booking = await Booking.findOne({ _id: bookingId, userId });
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });

    // No need to construct client here; we only verify signature locally
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '')
      .update(body)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: 'Invalid signature' });
    }

    booking.isPaid = true;
    booking.paymentId = razorpay_payment_id;
    booking.status = 'confirmed';
    booking.paymentOrderId = razorpay_order_id;
    booking.paymentSignature = razorpay_signature;
    await booking.save();

    res.json({ success: true, message: 'Payment verified', booking });
  } catch (error) {
    console.error('Razorpay verifyPayment error:', error);
    res.status(500).json({ success: false, message: 'Failed to verify payment', error: error.message });
  }
};