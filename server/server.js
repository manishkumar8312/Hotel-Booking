import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from "./controllers/clerkWebhooks.js";
connectDB();

const app = express();

app.use(cors()); // Enable Cross-Origin Resource Sharing
//MiddleWare
app.use(express.json());
app.use(clerkMiddleware());


//API to listen to clerk Webhooks

app.use('/api/clerk', clerkWebhooks);

app.get('/', (req, res) => {
    res.send("API is Up and running");
});

// 404 handler (after all routes)
app.use((req, res, next) => {
    res.status(404).type('application/json').json({
        success: false,
        status: 404,
        message: "Route not found",
        path: req.originalUrl
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    const status = err.status || 500;
    res.status(status).type('application/json').json({
        success: false,
        status,
        message: err.message || "Internal Server Error"
    });
});
const PORT = process.env.PORT  || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});