import mongoose from "mongoose";
//connecting to MongoDB
const connectDB = async () => {
 mongoose.connection.on("connected",()=>{
    console.log("MongoDB connected successfully");
 });
 mongoose.connection.on("error", (err) => {
    console.error(`MongoDB connection error: ${err}`);
 });
 try{
    await mongoose.connect(`${process.env.MONGODB_URI}/hotel-booking`,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

 } catch (error) {
    console.error('error connecting to MongoDb:',error.message);
 }
};

export default connectDB;