const mongoose = require("mongoose");

require("dotenv").config(); //import  environment file libary 

const connectWithDb =()=>{
    mongoose.connect(process.env.DATABASE_URL,{
           useNewUrlParser:true, //object 
           useUnifiedTopology: true,
    } )
    .then(console.log("DB Connected SUccessfully"))
    .catch((error)=>{
        console.log("Db is facing  Connection Issues");
        console.log(error);
        process.exit(1);
    })
};

module.exports = connectWithDb;