const bcrypt = require ("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

require("dotenv").config();

//signup route Handler
exports.signup = async (req,res) => {
    try {
        //get data from rwquest body
        const {name,email, password, role} = req.body;
        //check if user already exists
        const existingUser = await User.findOne({email});

        if(existingUser){ 
            return res.status(309).json({
                success:false,
                message:'User already Exists',
            })
        }

        //secure pasword
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password,10)
        }
        catch(error) {
            return res.status(500).json({
               success:false,
               message:'error in hashing Password',
            });
        }


        //create  entry for User
        const user = await User.create ({
            name, email,password:hashedPassword, role
        })
        // send response
        return res.status(200).json({
            success:true,
            message:'User Created Successfully',
    
        })
   
    }
    catch (error) {
          console.error(error);
          return  res.status(500).json({
            success:false,
            message:"User cannot be registtered,[lxx try again later",
           })
    }
}

//login
exports.login = async(req,res) => {
    try{ 
        // data fetch from request body
        const {email,password} = req.body;
         //validation on email and password
         if(!email || !password){
            return res.status(400).json({
                success:false,
                message:'Please fill all the details carefully',
            })
         }

         //check if user exists
         let user = await User.findOne({email});
         //ifn ot registered user
         if(!user) {
            return res.status(401).json({
                success:false,
                message:'user is not registeed',
            })
         }


         const payload ={
            email:user.email,
            id:user._id,
            role:user.role,
         };

         //verify password & generate a JWT token
         if(await bcrypt.compare(password,user.password)) {
              //pasword matched
              let token =  jwt.sign(
                payload,              // payload
                process.env.JSW_SECRET,   // secret key
                {expiresIn:"2h",}         // token expiry (optional)
              );
              
              user = user.toObject();
              user.token = token; // save token in user object
              user.password = undefined; // user ke object se hataya not from database
              console.log(user);
              
              const options ={
                expires:new Date(Date.now() + 3*24*60*60*1000),
                httpOnly:true,            
             }

              res.cookie("token", token,options).status(200).json({
                success:true,
                token,
                user,
                message:'user Logged in successfully',
              });

            // res.status(200).json({
            //     success:true,
            //     token,
            //     user,
            //     message:'user Logged in successfully',
            //   });
         }
         else{
            //passwor d do not match
            return res.status(401).json({
                success:false,
                message:"Password Incorrect",
            });
         }
    }
    catch(error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:'Login Failure',
        })

    }
}