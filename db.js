import mongoose from "mongoose";
import multer from "multer";

const connection = {};

// Multer configuration for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

async function connectDb() {
  try {
    if (connection.isConnected) {
      console.log("Already connected to the DB");
      return;
    }

    if (mongoose.connections.length > 0) {
      connection.isConnected = mongoose.connections[0].readyState;
      if (connection.isConnected === 1) {
        console.log("Use previous connection to the DB");
        return;
      }
      await mongoose.disconnect();
    }

    const db = await mongoose.connect(process.env.MONGODB_URL);

    console.log("New Connection to DB...!!!!");
    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    // Handle the error as needed (log, throw, etc.)
    throw error;
  }
}

async function disconnectDb() {
  try {
    if (connection.isConnected) {
      if (process.env.NODE_ENV === "production") {
        await mongoose.disconnect();
        connection.isConnected = false;
        console.log("Disconnected from the DB");
      } else {
        console.log(
          "Not disconnecting from the DB in non-production environment"
        );
      }
    }
  } catch (error) {
    console.error("Error disconnecting from MongoDB:", error);
    // Handle the error as needed (log, throw, etc.)
    throw error;
  }
}

const db = { connectDb, disconnectDb, upload };

export default db;
