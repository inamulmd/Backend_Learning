const mongoose = require("mongoose");  // install npm i moongoose

require("dotenv").config(); // all this thing dfined in env will load in process object and we can fetch from process data

const dbConnect = ()=> {
    mongoose.connect(process.env.DATABASE_URL, {  // install npm i dotenv
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(()=> console.log("DB ka Connection is Siccessfull"))
    .catch ( (error) => {
        console.log("Issue in DB Connection")
        console.error(error.message);
        //iska matlab
        process.exit(1);
    }) ;
}

module.exports =dbConnect;