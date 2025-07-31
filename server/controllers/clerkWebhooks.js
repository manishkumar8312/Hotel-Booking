import User from "../models/User.js";
import { Webhook } from "svix";

const clerkWebhooks = async (req, res) => {
    try {
        // --- 1. Verification ---
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
        const headers = {
            'svix-id': req.headers['svix-id'],
            'svix-timestamp': req.headers['svix-timestamp'],
            'svix-signature': req.headers['svix-signature']
        };
        const payload = req.body;
        await whook.verify(JSON.stringify(payload), headers);

        // --- 2. Get Data and Event Type ---
        const { data, type } = payload;

        console.log(`--- Webhook for event '${type}' received ---`);

        // --- 3. Handle user.created event ---
        if (type === 'user.created') {
            console.log("Processing 'user.created'...");

            // --- THIS IS THE CRITICAL PART ---
            // Construct the new user object EXACTLY matching your schema
            const newUser = {
                _id: data.id,
                email: data.email_addresses[0].email_address,
                username: `${data.first_name} ${data.last_name}`,
                image: data.image_url,
                 recentSearchedCities: [], 
            };

            // Log the object we are about to save
            console.log("Attempting to create user with this data:", newUser);
            
            // Save the user to the database
            await User.create(newUser);
            
            console.log("SUCCESS: User created in database.");
        }

        // --- You can add 'user.updated' and 'user.deleted' logic here if needed ---
        if (type === 'user.updated') {
            console.log("Processing 'user.updated'...");
            const updatedUser = {
                 email: data.email_addresses[0].email_address,
                 username: `${data.first_name} ${data.last_name}`,
                 image: data.image_url,
            }
            await User.findByIdAndUpdate(data.id, updatedUser);
            console.log("SUCCESS: User updated in database.");
        }

        if (type === 'user.deleted') {
            console.log("Processing 'user.deleted'...");
            await User.findByIdAndDelete(data.id);
            console.log("SUCCESS: User deleted in database.");
        }

        // --- 4. Send Success Response ---
        return res.status(200).json({ success: true, message: 'Webhook processed' });

    } catch (error) {
        // --- 5. Error Handling ---
        console.error("!!! ERROR in Webhook Controller !!!");
        console.error(error); // Log the full error to see what's wrong
        return res.status(500).json({ success: false, message: 'Webhook processing failed' });
    }
}

export default clerkWebhooks;