 //auth ,isStudent,isAdmin

 const jwt = require("jsonwebtoken");
 require("dotenv").config();

 exports.auth = (req,res, next) => { // authezation middleware
    try { 
        //exttract JWT token
        //Pending : other ways to fetch token from header
        const token = req.body.token;

        if(!token){
            return res.status(401).json({
                 success:false,
                 messsage:'Token Mising',
            });
        }

        //verify the token
        try {
            const decode = jwt.verify(token, process.env.JSW_SECRET); // provide playload and secreat key
            console.log(decode);

            req.user = decode; // attacth the user to the request object
        }
        catch(error){
             return res.status(401).json({
                success:false,
                message:'token is invalid',
             });
        }
         next(); //call next middleware
    } 
    catch(error){
         return res.status(401).json({
            success:false,
            message:'Something went wrong, while verifying the token',
         })
    }
 }


 exports.isStudent =(req,res,next) => { //authzation middleware
    try{
         if(req.user.role !== "Student"){
            return res.status(401).json({
                success:false,
                message:'This is protected route for students only',
            });
         }
         next(); //call next middleware
    }
    catch(error){
        return res.status(500).json({
           success:false,
           message:' Somethng went wrong in verifying the role',
        })
    }
 }


 exports.isAdmin =(req,res,next) => {
    try{
         if(req.user.role !== "Admin"){
            return res.status(401).json({
                success:false,
                message:'This is protected route for admin only',
            });
         }
         next(); //call next middleware
    }
    catch(error){
        return res.status(500).json({
           success:false,
           message:' Somethng went wrong in verifying the role',
        })
    }
 }