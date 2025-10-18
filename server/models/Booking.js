import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
    userId: {
        type: String, // Clerk User ID
        required: true,
        ref: 'User'
    },
    hotelId: {
        type: String,
        required: true
    },
    roomId: {
        type: String,
        required: true
    },
    checkInDate: {
        type: Date,
        required: true
    },
    checkOutDate: {
        type: Date,
        required: true
    },
    guests: {
        type: Number,
        required: true,
        min: 1
    },
    totalPrice: {
        type: Number,
        required: true
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    paymentId: {
        type: String,
        default: null
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled', 'completed'],
        default: 'pending'
    },
    // Store essential hotel/room data for historical reference
    hotelSnapshot: {
        name: String,
        address: String,
        city: String
    },
    roomSnapshot: {
        roomType: String,
        images: [String],
        amenities: [String]
    }
}, {timestamps: true});

// Index for faster queries
BookingSchema.index({ userId: 1, createdAt: -1 });

export default mongoose.model("Booking", BookingSchema);