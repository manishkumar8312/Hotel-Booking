import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from "@clerk/express";
import clerkWebhooks from "./controllers/clerkWebhooks.js";

// ✅ Import controllers
import { getRooms, getRoomById } from "./controllers/roomController.js";
import { getBookings } from "./controllers/bookingController.js";

// ✅ Connect to MongoDB
connectDB();

const app = express();

// ✅ Middleware
app.use(cors({ origin: process.env.CLIENT_URL || "*", credentials: true })); // Allow frontend URL
app.use(express.json({ limit: "10mb" })); // Handle larger JSON payloads
app.use(clerkMiddleware()); // Clerk authentication middleware

// ✅ Health Check Route
app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "API is Up and Running 🚀" });
});

// ✅ Clerk Webhook (must be BEFORE other routes if it uses raw body)
app.post("/api/clerk", clerkWebhooks);

// ✅ API Routes
app.get("/api/rooms", getRooms);
app.get("/api/rooms/:id", getRoomById);
app.get("/api/bookings", getBookings);

// ✅ 404 Error Handling
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// ✅ Global Error Handler
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err.stack);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

// ✅ Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
