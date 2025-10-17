import React, { useState } from 'react'
import Title from '../components/Title'
import { assets, userBookingsDummyData, userDummyData } from '../assets/assets'
import { loadRazorpayScript } from '../utils/rzpUitl'

const MyBookings = () => {
    const [bookings, setBookings] = useState(userBookingsDummyData);
    const [error, setError] = useState(null);

     const handlePayment = async () => {
            const isScriptLoaded = await loadRazorpayScript();
            if (!isScriptLoaded) {
              console.error({ type: 'error', message: 'Failed to load Razorpay SDK. Please check your connection.' });
              return;
            }

          try {
            // create the Razorpay booking on the server
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/payment/create-booking`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                amount: userBookingsDummyData[1].totalPrice, // booking amount from dummy data
                currency: 'INR',
                receipt: `booking_${new Date().getTime()}`,
              }),
            });
      
            if (!response.ok) {
              throw new Error('Failed to create Razorpay order.');
            }
      
            const { booking } = await response.json();

            // Now that we've the booking, initiate Razorpay payment
            const razorpayOptions = {
              key: import.meta.env.VITE_APP_RZP_KEY_ID,
              amount: userBookingsDummyData[1].totalPrice * 100,
              currency: 'INR',
              name: 'QuickStay',
              description: 'Booking Payment',
              order_id: booking.id,
              handler: function (response) {
                // Verify the payment signature in backend
                fetch(`${import.meta.env.VITE_BACKEND_URL}/api/payment/verify-payment`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature,
                  }),
                })
                  .then((res) => res.json())
                  .then((data) => {
                    if (data.success) {
                        // Payment is successful, submit the booking to the backend
                        //submitBooking();
                        alert('Payment Successful! Booking has been placed.');
                    } else {
                      alert('Payment verification failed.');
                    }
                  })
                  .catch((err) => {
                    alert('Error verifying payment: ' + err.message);
                  });
              },
              prefill: {
                // User details can be fetched from user profile, currently hardcoded for demo
                name: userDummyData?.username || 'Guest',
                email: userDummyData?.email || 'customer@example.com',
                contact: userDummyData?.contact || '1234567890',
              },
              theme: {
                color: '#663cc79a',
              },
            };
            console.log(razorpayOptions);
      
            const razorpayInstance = new window.Razorpay(razorpayOptions);
            razorpayInstance.open();
          } catch (err) {
            console.error('Error initiating Razorpay payment:', err);
            setError('Payment failed. Please try again.');
          }
      };

    // const submitBooking = async () => {
        // const bookingData = {
        //     hotelId: userBookingsDummyData.hotelId,
        //     roomId: userBookingsDummyData.roomId,
        //     userId: userBookingsDummyData.userId,
        //     guests: userBookingsDummyData.guests,
        //     checkInDate: userBookingsDummyData.checkInDate,
        //     checkOutDate: userBookingsDummyData.checkOutDate,
        //     roomType: userBookingsDummyData.roomType,
        //     totalPrice: userBookingsDummyData.totalPrice,
        //     isPaid: true,
        //     paymentMethod: 'Razorpay',
        //     boookingId: userBookingsDummyData.bookingId,
        //     date: new Date().toLocaleString(),
            
        // };

    //     try {
    //         const response = await fetch('${import.meta.env.VITE_BACKEND_URL}/api/bookings', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(bookingData),
    //         });

    //         if (!response.ok) {
    //             throw new Error(`Failed to submit booking: ${response.statusText}`);
    //         }
    //         const result = await response.json();
    //         console.log('Booking submitted successfully:', result);

    //     } catch (err) {
    //         console.error('Error placing booking:', err);
    //         setError('Failed to place the booking. Please try again later.');
        //     }
    // console.log('Booking Data:', bookingData);

    

  return (
    <div className="pt-20">
      <div className='max-w-6xl mx-auto w-full text-gray-800'>
        <Title title="My Bookings" subTitle="Easily manage your past, current, and upcoming hotel reservations in one place. Plan your trips seamlessly with just a few clicks." align="left"/>
        <div className='hidden md:grid md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 font-medium text-base py-3 mt-6'>
          <div className='w-1/3'>Hotels</div>
          <div className='w-1/3'>Date & Timings</div>
          <div className='w-1/3'>Payment</div>
        </div>
        {bookings.map((booking)=>(
            <div key={booking._id} className='grid grid-cols-1 md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 py-6 first:border-t'>
                {/* Hotel Details */}
                <div className='flex flex-col md:flex-row'>
                    <img src={booking.room.images[0]} alt="hotel-img" className='min-md:w-44 rounded shadow object-cover'/>
                    <div  className='flex flex-col gap-1.5 max-md:mt-3 min-md:ml-4'>
                        <p className='font-playfair text-2xl'>{booking.hotel.name}
                            <span className='font-inter text-sm'> ({booking.room.roomType})</span>
                        </p>
                        <div className='flex items-center gap-1 text-gray-500 text-sm'>
                            <img src={assets.locationIcon} alt="location-icon"/>
                            <span>{booking.hotel.address}</span>
                        </div>
                        <div className='flex items-center gap-1 text-gray-500 text-sm'>
                            <img src={assets.guestsIcon} alt="guest-icon"/>
                            <span>Guests: {booking.guests}</span>
                        </div>
                        <p className='text-base'>Total: ${booking.totalPrice}</p>
                    </div>
                </div>
                {/* Date & Timings */}
                <div className='flex flex-row md:items-center md:gap-12 mt-3 gap-8'>
                  <div>
                    <p>Check-In:</p>
                    <p className='text-gray-500 text-sm'>{new Date(booking.checkInDate).toDateString()}</p>
                  </div>
                  <div>
                    <p>Check-Out:</p>
                    <p className='text-gray-500 text-sm'>{new Date(booking.checkOutDate).toDateString()}</p>
                  </div>

                </div>
                {/* Payment Status */}
                <div className='flex flex-col items-start justify-center pt-3'>
                  <div className='flex items-center gap-2'>
                    <div className={`h-3 w-3 rounded-full ${booking.isPaid ? "bg-green-500" : "bg-red-500"}`}>

                    </div>
                    <p className={`text-sm ${booking.isPaid ? "text-green-500" : "text-red-500"}`}>{booking.isPaid ? "Paid" : "Unpaid"}</p>

                  </div>
                  {!booking.isPaid && (
                    <button onClick={handlePayment} className='px-4 py-1.5 mt-4 text-xs border border-gray-400 rounded-full hover:bg-gray-50 transition-all cursor-pointer'>Pay Now</button>
                  )}
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings