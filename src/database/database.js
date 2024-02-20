import mongoose from "mongoose";
import { config } from "dotenv";

config();

const DATABASE_URL = `mongodb://localhost:27017/${process.env['DATABASE_NAME']}`;

export const connectDatabase = async () => {
  try {
    const db = await mongoose.connect(DATABASE_URL);
    console.log('Database Connected', db.connection.host);
  } catch (error) {
    console.error(error);
  }
}
