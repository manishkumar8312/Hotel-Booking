import Hotel from "../models/Hotel.js";

export const registerHotel = async (req, res) => {
  try {
    const { name, contact, address, city } = req.body;
    const ownerId = req.auth.userId; // Clerk user ID

    if (!name || !contact || !address || !city) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    const newHotel = new Hotel({
      name,
      contact,
      address,
      city,
      ownerId,
    });

    await newHotel.save();

    return res.status(201).json({ success: true, message: "Hotel registered successfully." });
  } catch (error) {
    console.error("Error in registerHotel:", error);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
};
