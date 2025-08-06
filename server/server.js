import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from "./controllers/clerkWebhooks.js";
import hotelRoutes from "./routes/hotelRoutes.js";
connectDB();

const app = express();

app.use(cors()); // Enable Cross-Origin Resource Sharing
//MiddleWare
app.use(express.json());
app.use(clerkMiddleware());

//API to listen to clerk Webhooks
app.use('/api/clerk', clerkWebhooks);

//hotel routes
app.use('/api/hotels',hotelRoutes);

//user routes
// import userRoutes from "./routes/userRoutes.js";
// app.use("/api/users", userRoutes);

//test api
app.get('/', (req, res) => {
    res.send("API is Up and running");
});

//404 error handling
app.use((req,res,next)=>{
    res.status(404).json({message:"Route not found"});
   
});

//global error handler
app.use((err,req,res,next)=>{
    console.error(err.stack);
    res.status(500).json({message:"Internal Server Error"});
});
const PORT = process.env.PORT  || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});