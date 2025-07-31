import User from "../models/User.js";
import { clerkClient } from '@clerk/express';

/**
 * Update user role - Admin only function
 * Updates both MongoDB and Clerk's publicMetadata
 */
export const updateUserRole = async (req, res) => {
    try {
        const { userId } = req.params;
        const { role } = req.body;

        // Validate the role value
        const validRoles = ['user', 'hotelOwner'];
        if (!role || !validRoles.includes(role)) {
            return res.status(400).json({
                success: false,
                message: `Invalid role. Must be one of: ${validRoles.join(', ')}`
            });
        }

        // Check if the user exists in MongoDB
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Prevent self-role modification (optional security measure)
        if (req.auth.userId === userId && role !== 'hotelOwner') {
            return res.status(400).json({
                success: false,
                message: "Cannot downgrade your own role"
            });
        }

        // Update user role in MongoDB
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { role: role },
            { new: true, runValidators: true }
        );

        // Update user's publicMetadata in Clerk
        try {
            await clerkClient.users.updateUser(userId, {
                publicMetadata: {
                    role: role
                }
            });
        } catch (clerkError) {
            console.error("Error updating Clerk metadata:", clerkError);
            // Rollback MongoDB change if Clerk update fails
            await User.findByIdAndUpdate(userId, { role: user.role });
            
            return res.status(500).json({
                success: false,
                message: "Failed to update user role in authentication system"
            });
        }

        res.status(200).json({
            success: true,
            message: `User role updated successfully to ${role}`,
            data: {
                userId: updatedUser._id,
                username: updatedUser.username,
                email: updatedUser.email,
                role: updatedUser.role,
                updatedAt: updatedUser.updatedAt
            }
        });

    } catch (error) {
        console.error("Error in updateUserRole:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error while updating user role"
        });
    }
};

/**
 * Get all users - Admin only function
 */
export const getAllUsers = async (req, res) => {
    try {
        const { page = 1, limit = 10, role } = req.query;
        
        // Build filter object
        const filter = {};
        if (role && ['user', 'hotelOwner'].includes(role)) {
            filter.role = role;
        }

        // Calculate skip value for pagination
        const skip = (parseInt(page) - 1) * parseInt(limit);

        // Get users with pagination
        const users = await User.find(filter)
            .select('-recentSearchedCities') // Exclude sensitive data
            .skip(skip)
            .limit(parseInt(limit))
            .sort({ createdAt: -1 });

        // Get total count for pagination info
        const totalUsers = await User.countDocuments(filter);
        const totalPages = Math.ceil(totalUsers / parseInt(limit));

        res.status(200).json({
            success: true,
            data: {
                users,
                pagination: {
                    currentPage: parseInt(page),
                    totalPages,
                    totalUsers,
                    hasNextPage: parseInt(page) < totalPages,
                    hasPrevPage: parseInt(page) > 1
                }
            }
        });

    } catch (error) {
        console.error("Error in getAllUsers:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error while fetching users"
        });
    }
};

/**
 * Get user profile - Accessible by the user themselves or admins
 */
export const getUserProfile = async (req, res) => {
    try {
        const { userId } = req.params;
        
        // Check if user is accessing their own profile or if they're an admin
        if (req.auth.userId !== userId && req.user.role !== 'hotelOwner') {
            return res.status(403).json({
                success: false,
                message: "Access denied - You can only view your own profile"
            });
        }

        const user = await User.findById(userId).select('-recentSearchedCities');
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            data: user
        });

    } catch (error) {
        console.error("Error in getUserProfile:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error while fetching user profile"
        });
    }
};