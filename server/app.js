
const express = require ("express");
const connectDatabase = require("./config/db");
const userRoute= require("./routes/userRoute")
const app = express();
const cors = require("cors")
const cookieParser =  require("cookie-parser")

app.use(cors({
    origin:"http://localhost:5500",
    credentials:true
}))
app.use(cookieParser())

connectDatabase();

app.use(express.json())

app.use('/', userRoute);

module.exports = app;

