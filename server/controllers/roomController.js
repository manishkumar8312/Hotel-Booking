// /workspaces/Hotel-Booking/server/controllers/roomController.js
export const getRooms = async (req, res) => {
  try {
    // TODO: Replace with real DB query
    const rooms = []; // dummy placeholder
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: "Error fetching rooms" });
  }
};

export const getRoomById = async (req, res) => {
  try {
    // TODO: Replace with real DB query
    const room = null; // dummy placeholder
    if (!room) return res.status(404).json({ message: "Room not found" });
    res.json(room);
  } catch (error) {
    res.status(500).json({ message: "Error fetching room details" });
  }
};
