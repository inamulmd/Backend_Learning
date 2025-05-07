import {connect} from "@/dbConfig/dbConfig";
import User from "@/model/userModel";
import {NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";


export async function  POST(request:NextRequest) {
    try{

          
     try {
         await connect();
      }   catch (error) {
         console.error("Database connection failed:", error);
         return NextResponse.json(
           { error: "Internal Server Error" },
           { status: 500 }
        );
   }

        const reqBody = await request.json()
        const {email,password} =reqBody;
        console.log(reqBody);


        //check if user exists 
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({error:"User not found"},{status:400})
        }

        //check if password is correct
        const validPassword = await bcryptjs.compare(password, user.password)
        if(!validPassword){
            return NextResponse.json({error:"Inavalid pasword"},{status:400})
        }
        
        //create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email:user.email
        }
        //create Token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"})

        const response = NextResponse.json({
            message: "Login successfully",
            success: true,
        })
        response.cookies.set("token", token, {
            httpOnly: true,
        })
        return response;

    } catch (error : any) {
        return NextResponse.json({error: error.message}, {status:500})
    }
}
