// server/configs/db.js

import mongoose from "mongoose";

const connectDB = async () => {
    try {
        // Use the CORRECT environment variable name (`MONGO_URI`)
        // and do NOT add the database name again.
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB Connected Successfully!");
    } catch (error) {
        console.error("MongoDB Connection FAILED:", error.message);
        // Exit the process with a failure code if we can't connect to the DB
        process.exit(1); 
    }
};

export default connectDB;