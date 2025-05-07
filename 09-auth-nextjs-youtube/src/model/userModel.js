 import mongoose from "mongoose";;

 const userSchema = new mongoose.Schema({
         username:{
            type: String,
            required : [true, "please provide a username"],
            unique: true,
         },
         email: {
            type: String,
            required: [true, "please provide a username"],
         },
         password : {
            type: String,
            required: [true, "please provide a username"],
         },
         isVerified: {
            type: Boolean,
            default: false,
         },
         isAdmin: {
            type: Boolean,
            default: false,
         },
          forgotPasswordToken: String,
          forgotPasswordTokenExpiry: Date,
          verifyToken : String,
          verifyTokenExpiry: Date,

 })

 const User = mongoose.models.Users || mongoose.model("User", userSchema);

 export default User;