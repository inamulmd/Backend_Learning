// npm init -y
//npm i express
// create file of server.js   
//npm i nodeman 
//npm i mongoose   
//nom i dotenv

const express = require("express");
const app = express();

require("dotenv").config(); //load the config 
const PORT = process.env.PORT || 4000;

//cookie-oarser - what is this and why we need this
//npm i cookie-parser
const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(express.json());


const connectDb = require("./config/database");
connectDb();

//routes import and mount
const user = require("./routes/user");
app.use("/api/v1",user);

//activate

app.listen(PORT, () => {
    console.log(`App is listening at ${PORT}`);
})