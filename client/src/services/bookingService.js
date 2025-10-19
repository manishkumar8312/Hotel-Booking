import { useAuth } from '@clerk/clerk-react';

const API_URL = 'http://localhost:5000/api/bookings';

// Helper to get auth token
const getAuthHeader = async (getToken) => {
    const token = await getToken(); // or: await getToken({ template: 'default' })
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
};

export const bookingService = {
    // Create a new booking
    createBooking: async (bookingData, getToken) => {
        try {
            const headers = await getAuthHeader(getToken);
            const response = await fetch(`${API_URL}/create`, {
                method: 'POST',
                headers,
                body: JSON.stringify(bookingData)
            });
            
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Failed to create booking');
            }
            return data;
        } catch (error) {
            console.error('Create booking error:', error);
            throw error;
        }
    },

    // Get all user bookings
    getUserBookings: async (getToken) => {
        try {
            const headers = await getAuthHeader(getToken);
            const response = await fetch(`${API_URL}/user`, {
                method: 'GET',
                headers
            });
            
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Failed to fetch bookings');
            }
            return data;
        } catch (error) {
            console.error('Get bookings error:', error);
            throw error;
        }
    },

    // Update payment status
    updatePaymentStatus: async (bookingId, paymentData, getToken) => {
        try {
            const headers = await getAuthHeader(getToken);
            const response = await fetch(`${API_URL}/${bookingId}/payment`, {
                method: 'PUT',
                headers,
                body: JSON.stringify(paymentData)
            });
            
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Failed to update payment');
            }
            return data;
        } catch (error) {
            console.error('Update payment error:', error);
            throw error;
        }
    },

    // Cancel booking
    cancelBooking: async (bookingId, getToken) => {
        try {
            const headers = await getAuthHeader(getToken);
            const response = await fetch(`${API_URL}/${bookingId}/cancel`, {
                method: 'PUT',
                headers
            });
            
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Failed to cancel booking');
            }
            return data;
        } catch (error) {
            console.error('Cancel booking error:', error);
            throw error;
        }
    }
};