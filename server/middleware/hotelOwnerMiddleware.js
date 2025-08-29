import User from '../models/User.js';

const hotelOwner = async (req, res, next) => {
  try {
    const userId = req.auth.userId;

    const user = await User.findById(userId);
    if (!user || user.role !== 'hotelOwner') {
      return res.status(403).json({ success: false, message: 'Access denied. Hotel owner role required.' });
    }

    next();
  } catch (error) {
    console.error("Role check error:", error);
    res.status(500).json({ success: false, message: "Server error during role check." });
  }
};

export default hotelOwner;
