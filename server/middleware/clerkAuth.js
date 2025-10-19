import { clerkClient } from '@clerk/clerk-sdk-node';

export const requireAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({ 
                success: false, 
                message: 'No authentication token provided' 
            });
        }

        // Verify the token with Clerk
        const session = await clerkClient.sessions.verifyToken(token);
        
        if (!session) {
            return res.status(401).json({ 
                success: false, 
                message: 'Invalid or expired token' 
            });
        }

        // Attach user ID to request
        req.userId = session.userId;
        next();
        
    } catch (error) {
        console.error('Auth error:', error);
        return res.status(401).json({ 
            success: false, 
            message: 'Authentication failed' 
        });
    }
};