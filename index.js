
const express = require("express");
const app = express();


//load config from env file
require("dotenv").config();
const PORT = process.env.PORT || 4000;

//middleware to prase json request body
app.use(express.json());

//import routes from TODo API
const todoRoutes = require("./routes/todos");
//mount the todo ASPI routes
app.use("/api/v1",todoRoutes);


//start server
app.listen(PORT,()=> {
    console.log(`SErvere started successfully at ${PORT}`);
})

///connect to the datatbase
const dbConnect = require("./config/database");
dbConnect();

//default Routes
app.get("/",(req,res)=> {
    res.send(`<h1>This is Hompage baby</h1>`)
})


//1.brew services stat mongodb-community
//2.error solving comand -mongod --config /opt/hombrew/etc/mongod.conf