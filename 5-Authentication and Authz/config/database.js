const  mongoose = require("mongoose");

require("dotenv").config();

const connectDb =() => {
    mongoose.connect(process.env.MONGO_URL, {
        useNewUrLParser :true,
        useUnifiedTopology:true,
    })
    .then(() => {console.log("Db connected successfully")})
    .catch((err) =>{
        console.log("Db COnnection Issues");
        console.error(err);
        process.exit(1);
    })
}


module.exports = connectDb;