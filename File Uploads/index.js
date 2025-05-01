// npm init -y
//npm i express
// create file of server.js   
//npm i nodeman 
//npm i mongoose   
//nom i dotenv


//app create
const express = require("express");
const app = express(); 

//PORT find karna h
require("dotenv").config();
const PORT = process.env.PORT || 3000;

//middleware add krna hai
app.use(express.json());
const fileUpload = require("express-fileupload");
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir :"/tmp/",
}));

//db se connect krna hai
const db = require("./config/database");
db.connect();
 
//cloud se connect krna hai
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

//api route mount krna h
const Upload = require("./routes/FileUploads");
app.use('/api/v1/upload', Upload);

//activate server
app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`);
})