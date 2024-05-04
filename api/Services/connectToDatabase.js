import mongoose from 'mongoose';

import failedBanksSchema from '../Models/FailedBank.js';

const connectToDatabase = async () => {
    // TO-DO:  set up env variable
    const MONGO_URL = "mongodb://localhost:27017/cit-4760-final-project";
    await mongoose.connect(MONGO_URL);
    
    db.once("open", () =>{
      console.log("MongoDB connected successfully");
    });
    db.on('error', (err) =>{
      console.error("MongoDB connection error:", err);
    });
  }
  export const db = mongoose.connection;
  export default connectToDatabase;