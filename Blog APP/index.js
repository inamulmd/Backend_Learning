// npm init -y
//npm i express

const express = require("express");//express ka frame work lata hai 
const app =express();//server create kiya

require("dotenv").config();
const PORT= process.env.PORT || 3000; // object

//middleware
app.use(express.json());// body json ko pass krne me help karta hai

const blog = require ("./routes/blog")
//mount
app.use("/api/v1",blog);

const connectWithDb = require("./config/database");
connectWithDb();

//start the server
app.listen(PORT, ()=> {
    console.log(`App is started at Port no ${PORT}`);
})

app.get("/",(req,res)=>{
    res.send(`<h1>This i smy home page baby</h1>`)
})