//import mongoose
const mongoose = require("mongoose");


// route Handler 
const likeSchema = new mongoose.Schema({
      post :{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Post", //refernece to the post model  
        },
        user:{
            type: String,
            required:true,
        },
})

module.exports =mongoose.model("Like",likeSchema);