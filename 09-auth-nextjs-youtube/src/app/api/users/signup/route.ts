import {connect} from "@/dbConfig/dbConfig";
import User from "@/model/userModel";
import {NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";


try {
    await connect();
} catch (error) {
    console.error("Database connection failed:", error);
    return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
    );
}


export async function POST(request: NextRequest){
    try{
        //connect database connection
        

          const reqBody = await request.json()
          console.log("Incoming request:", reqBody);

          const {username, email, password} = reqBody
          if (!username || !email || !password) {
            return NextResponse.json(
                { error: "All fields (username, email, password) are required" },
                { status: 400 }
            );
        }
          console.log(reqBody);
         
          //check if User arleady exits 
          const user = await User.findOne({email})

          if(user){
            return NextResponse.json({error: "User already exists"}, {status: 400})
          }

          //hash password 
          const salt = await bcryptjs.genSalt(10)
          const hashedPassword = await bcryptjs.hash(password, salt);

          const newUser = new User ({
            username,
            email,
            password: hashedPassword
          })

          const savedUser = await newUser.save()
          console.log(savedUser);

          return NextResponse.json({message: "user created successfully",
           success:true,
           savedUser
          }, {status:201})


    } catch (error:any) {
        return NextResponse.json({error: error.message},
            {status:500 }
        )
    }
}