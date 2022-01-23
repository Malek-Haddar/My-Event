require("dotenv").config();
const mongoose = require("mongoose");

module.exports = async() => {
    try {
        const connectionParams = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };
        await mongoose.connect(process.env.DATABASE_URL, connectionParams);
        console.log("Connected to Mongo DB..");
    } catch (error) {
        console.log("Could not connect to DataBase. ", error);
    }
};