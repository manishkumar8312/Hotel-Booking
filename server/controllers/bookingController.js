import Booking from "../models/Booking.js";
import User from "../models/User.js";

// Create a new booking
export const createBooking = async (req, res) => {
    try {
        const userId = req.auth().userId; // Clerk sets this
        const {
            hotelId,
            roomId,
            checkInDate,
            checkOutDate,
            guests,
            totalPrice,
            hotelSnapshot,
            roomSnapshot
        } = req.body;

        // Validate dates
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);
        
        if (checkIn >= checkOut) {
            return res.status(400).json({
                success: false,
                message: 'Check-out date must be after check-in date'
            });
        }

        if (checkIn < new Date()) {
            return res.status(400).json({
                success: false,
                message: 'Check-in date cannot be in the past'
            });
        }

        // Create booking
        const newBooking = await Booking.create({
            userId,
            hotelId,
            roomId,
            checkInDate: checkIn,
            checkOutDate: checkOut,
            guests,
            totalPrice,
            hotelSnapshot,
            roomSnapshot,
            isPaid: false,
            status: 'pending'
        });

        res.status(201).json({
            success: true,
            message: 'Booking created successfully',
            booking: newBooking
        });

    } catch (error) {
        console.error('Create booking error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create booking',
            error: error.message
        });
    }
};

// Get all bookings for a user
export const getUserBookings = async (req, res) => {
    try {
        const { userId } = req.auth();

        // Only get non-cancelled bookings
        const bookings = await Booking.find({ 
            userId,
            status: { $ne: 'cancelled' } // $ne = not equal
        }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: bookings.length,
            bookings
        });

    } catch (error) {
        console.error('Get bookings error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch bookings',
            error: error.message
        });
    }
};

// Get single booking by ID
export const getBookingById = async (req, res) => {
    try {
        const userId = req.auth().userId;
        const { bookingId } = req.params;

        const booking = await Booking.findOne({ 
            _id: bookingId, 
            userId 
        });

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }

        res.status(200).json({
            success: true,
            booking
        });

    } catch (error) {
        console.error('Get booking error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch booking',
            error: error.message
        });
    }
};

// Update booking payment status
export const updatePaymentStatus = async (req, res) => {
    try {
        const userId = req.auth().userId;
        const { bookingId } = req.params;
        const { isPaid, paymentId } = req.body;

        const booking = await Booking.findOne({ 
            _id: bookingId, 
            userId 
        });

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }

        booking.isPaid = isPaid;
        booking.paymentId = paymentId;
        booking.status = isPaid ? 'confirmed' : 'pending';
        
        await booking.save();

        res.status(200).json({
            success: true,
            message: 'Payment status updated',
            booking
        });

    } catch (error) {
        console.error('Update payment error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update payment status',
            error: error.message
        });
    }
};

// Cancel booking
export const cancelBooking = async (req, res) => {
    try {
        const userId = req.auth().userId;
        const { bookingId } = req.params;

        const booking = await Booking.findOne({ 
            _id: bookingId, 
            userId 
        });

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }

        // Check if booking can be cancelled
        if (booking.checkInDate < new Date()) {
            return res.status(400).json({
                success: false,
                message: 'Cannot cancel past bookings'
            });
        }

        booking.status = 'cancelled';
        await booking.save();

        res.status(200).json({
            success: true,
            message: 'Booking cancelled successfully',
            booking
        });

    } catch (error) {
        console.error('Cancel booking error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to cancel booking',
            error: error.message
        });
    }
};