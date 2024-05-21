import mongoose from 'mongoose';

const connectToDatabase = async () => {
    // TO-DO:  set up env variable
    const MONGO_URL = "mongodb://host.docker.internal:27017/cit-4760-final-project";
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