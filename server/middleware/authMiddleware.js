import User from "../models/User.js";

/**
 * Middleware to verify if the logged-in user has the hotelOwner role
 * This middleware protects admin-only API endpoints
 */
export const verifyHotelOwner = async (req, res, next) => {
    try {
        // Check if user is authenticated via Clerk middleware
        if (!req.auth || !req.auth.userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized - Please log in to access this resource"
            });
        }

        // Find the user in MongoDB database using the userId from Clerk
        const user = await User.findById(req.auth.userId);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found in database"
            });
        }

        // Check if the user's role is hotelOwner
        if (user.role !== 'hotelOwner') {
            return res.status(403).json({
                success: false,
                message: "Forbidden - You must be a hotel owner to access this resource"
            });
        }

        // If user is a hotelOwner, attach user info to request and proceed
        req.user = user;
        next();

    } catch (error) {
        console.error("Error in verifyHotelOwner middleware:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error during authorization"
        });
    }
};

/**
 * Middleware to verify if user is authenticated (any role)
 * Useful for protecting routes that require login but not specific roles
 */
export const verifyUser = async (req, res, next) => {
    try {
        // Check if user is authenticated via Clerk middleware
        if (!req.auth || !req.auth.userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized - Please log in to access this resource"
            });
        }

        // Find the user in MongoDB database
        const user = await User.findById(req.auth.userId);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found in database"
            });
        }

        // Attach user info to request and proceed
        req.user = user;
        next();

    } catch (error) {
        console.error("Error in verifyUser middleware:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error during authentication"
        });
    }
};