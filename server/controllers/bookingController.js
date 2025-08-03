// /workspaces/Hotel-Booking/server/controllers/bookingController.js
export const getBookings = async (req, res) => {
  try {
    // TODO: Replace with real DB query
    const bookings = []; // dummy placeholder
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings" });
  }
};
