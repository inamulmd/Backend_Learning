const mongoose = require("mongoose");

require("dotenv").config();

exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URL, {
        useNEwURlParser: true,
        useUnifiedTopology: true,
    })
    .then(console.log("Db Connnection Successfully"))
    .catch ( (error) => {
        console.log("Db Connection Issues");
        console.error(error);
        process.exit(1);
    } )
}