const mongoose = require("mongoose");
require('dotenv').config();


const MONGODB_URL = process.env.MONGODB_URL || "mongodb://127.0.01:27017/Instagram_userdata";

const connectDatabase = () => {
    mongoose
    .connect(MONGODB_URL)
    .then((conn) => console.log(`connection to DB:${conn.connection.host}`))
    .catch((err) => console.log(err.message));
}

module.exports = connectDatabase;