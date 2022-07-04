import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connection = async() => {
    try {
      const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      };
      await mongoose.connect(process.env.DATABASE_URL, connectionParams);
      // console.log("Connected to Mongo DB..");
    } catch (error) {
        console.log("Could not connect to DataBase. ", error);
    }
};

export default connection;