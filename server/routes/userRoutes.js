import express from "express";
import { 
    updateUserRole, 
    getAllUsers, 
    getUserProfile 
} from "../controllers/userController.js";
import { verifyHotelOwner, verifyUser } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * Admin-only routes (protected with verifyHotelOwner middleware)
 */

// PUT /api/users/:userId/role - Update user role (admin only)
router.put("/:userId/role", verifyHotelOwner, updateUserRole);

// GET /api/users - Get all users with pagination (admin only)
router.get("/", verifyHotelOwner, getAllUsers);

/**
 * User routes (protected with verifyUser middleware)
 */

// GET /api/users/:userId - Get user profile (own profile or admin)
router.get("/:userId", verifyUser, getUserProfile);

export default router;