import React, { useState, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import { bookingService } from '../services/bookingService';

const MyBookings = () => {
    const { isSignedIn, getToken } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (isSignedIn) {
            fetchBookings();
        }
    }, [isSignedIn]);

    const fetchBookings = async () => {
        try {
            setLoading(true);
            const data = await bookingService.getUserBookings(getToken);
            setBookings(data.bookings || []);
        } catch (error) {
            setError(error.message);
            console.error('Fetch bookings error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePayNow = async (bookingId) => {
        try {
            // TODO: Integrate with your payment gateway
            // For now, just update the payment status
            const paymentData = {
                isPaid: true,
                paymentId: `PAY_${Date.now()}` // Replace with actual payment ID
            };
            
            await bookingService.updatePaymentStatus(bookingId, paymentData, getToken);
            
            // Refresh bookings
            fetchBookings();
            alert('Payment successful!');
            
        } catch (error) {
            alert('Payment failed: ' + error.message);
        }
    };

    const handleCancelBooking = async (bookingId) => {
        if (!window.confirm('Are you sure you want to cancel this booking?')) {
            return;
        }

        try {
            await bookingService.cancelBooking(bookingId, getToken);
            fetchBookings();
            alert('Booking cancelled successfully');
        } catch (error) {
            alert('Failed to cancel booking: ' + error.message);
        }
    };

    if (!isSignedIn) {
        return (
            <div className="pt-20 text-center py-20">
                <p className="text-xl">Please sign in to view your bookings</p>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="pt-20 text-center py-20">
                <p className="text-xl">Loading bookings...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="pt-20 text-center py-20">
                <p className="text-xl text-red-500">Error: {error}</p>
                <button 
                    onClick={fetchBookings}
                    className="mt-4 px-6 py-2 bg-primary text-white rounded"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="pt-20">
            <div className='max-w-6xl mx-auto w-full text-gray-800 px-4'>
                <Title 
                    title="My Bookings" 
                    subTitle="Easily manage your past, current, and upcoming hotel reservations in one place. Plan your trips seamlessly with just a few clicks." 
                    align="left"
                />
                
                {bookings.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-xl text-gray-500">No bookings yet</p>
                        <p className="mt-2 text-gray-400">Start exploring our hotels and make your first booking!</p>
                    </div>
                ) : (
                    <>
                        <div className='hidden md:grid md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 font-medium text-base py-3 mt-6'>
                            <div className='w-1/3'>Hotels</div>
                            <div className='w-1/3'>Date & Timings</div>
                            <div className='w-1/3'>Payment</div>
                        </div>
                        
                        {bookings.map((booking) => (
                            <div key={booking._id} className='grid grid-cols-1 md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 py-6 first:border-t'>
                                {/* Hotel Details */}
                                <div className='flex flex-col md:flex-row'>
                                    <img 
                                        src={booking.roomSnapshot.images[0]} 
                                        alt="hotel-img" 
                                        className='md:w-44 rounded shadow object-cover'
                                    />
                                    <div className='flex flex-col gap-1.5 max-md:mt-3 md:ml-4'>
                                        <p className='font-playfair text-2xl'>
                                            {booking.hotelSnapshot.name}
                                            <span className='font-inter text-sm'> ({booking.roomSnapshot.roomType})</span>
                                        </p>
                                        <div className='flex items-center gap-1 text-gray-500 text-sm'>
                                            <img src={assets.locationIcon} alt="location-icon"/>
                                            <span>{booking.hotelSnapshot.address}</span>
                                        </div>
                                        <div className='flex items-center gap-1 text-gray-500 text-sm'>
                                            <img src={assets.guestsIcon} alt="guest-icon"/>
                                            <span>Guests: {booking.guests}</span>
                                        </div>
                                        <p className='text-base'>Total: ${booking.totalPrice}</p>
                                        <p className='text-sm text-gray-500'>
                                            Status: <span className='capitalize font-medium'>{booking.status}</span>
                                        </p>
                                    </div>
                                </div>
                                
                                {/* Date & Timings */}
                                <div className='flex flex-row md:items-center md:gap-12 mt-3 gap-8'>
                                    <div>
                                        <p>Check-In:</p>
                                        <p className='text-gray-500 text-sm'>
                                            {new Date(booking.checkInDate).toDateString()}
                                        </p>
                                    </div>
                                    <div>
                                        <p>Check-Out:</p>
                                        <p className='text-gray-500 text-sm'>
                                            {new Date(booking.checkOutDate).toDateString()}
                                        </p>
                                    </div>
                                </div>
                                
                                {/* Payment Status */}
                                <div className='flex flex-col items-start justify-center pt-3'>
                                    <div className='flex items-center gap-2'>
                                        <div className={`h-3 w-3 rounded-full ${booking.isPaid ? "bg-green-500" : "bg-red-500"}`}></div>
                                        <p className={`text-sm ${booking.isPaid ? "text-green-500" : "text-red-500"}`}>
                                            {booking.isPaid ? "Paid" : "Unpaid"}
                                        </p>
                                    </div>
                                    
                                    {!booking.isPaid && booking.status !== 'cancelled' && (
                                        <button 
                                            onClick={() => handlePayNow(booking._id)}
                                            className='px-4 py-1.5 mt-4 text-xs border border-gray-400 rounded-full hover:bg-gray-50 transition-all cursor-pointer'
                                        >
                                            Pay Now
                                        </button>
                                    )}
                                    
                                    {booking.status !== 'cancelled' && booking.status !== 'completed' && (
                                        <button 
                                            onClick={() => handleCancelBooking(booking._id)}
                                            className='px-4 py-1.5 mt-2 text-xs border border-red-400 text-red-500 rounded-full hover:bg-red-50 transition-all cursor-pointer'
                                        >
                                            Cancel Booking
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};

export default MyBookings;