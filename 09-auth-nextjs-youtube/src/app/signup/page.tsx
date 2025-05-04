"use client";
import Link from "next/link";
import React from "react";
import { useEffect } from "react";
import { useRouter} from "next/navigation";
import axios from 'axios';
import { on } from "events";
import  toast  from "react-hot-toast";



export default function SignupPage() {
  const router = useRouter();
    const [user, setUser] = React.useState({
       email: "", 
       password: "",
       username: "",
    });

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading , setLoading]  = React.useState(false);

    const onSignup = async () => {
      try {
        setLoading(true);
        const response = await axios.post("/api/users/signup", user); 
        console.log("signup success", response.data);
        console.log(response);
        router.push("/login"); 

      } catch(error: any) {
        console.log("Signup failed", error);
        const errorMessage = error.response?.data?.error || error.message || "Something went wrong";
        toast.error(errorMessage);
        
      }finally {
        setLoading(false);
      }
          
    }

    useEffect(() => {
      if(user.email.length > 0 && user.password.length > 0 &&
        user.username.length > 0 ) {
           setButtonDisabled(false);
        }else{
          setButtonDisabled(true);
        }
    },[user]);


   return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>{loading ?  "Processing" : "Signup"}</h1>
          <hr />
          <label htmlFor="username">username</label>
          <input 
          className="p- border border-gray-300 rounded-md mb-4 focus:ooutline-none focus:border-gray-600"
            id="username"
            type="text"
            value={user.username}
            onChange={(e) => setUser({...user, username: e.target.value})}
            placeholder=" username"
            />

          <label htmlFor="email">email</label>
          <input 
          className="p- border border-gray-300 rounded-md mb-4 focus:ooutline-none focus:border-gray-600"
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value})}
            placeholder="abc@gmail.com"
            />

          <label htmlFor="passwords">passwords</label>
          <input 
          className="p- border border-gray-300 rounded-md mb-4 focus:ooutline-none focus:border-gray-600"
            id="passwords"
            type="password"
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
            placeholder=" 123456"
            />

            <button 
            onClick={onSignup} className="p-2 border border-gray-300
            rounded-lg mb-4 focus:outline-none focus:border-gray-600">  
               {buttonDisabled ? "No signup" : "Signup"}
            </button>
            <Link href="/login"> Visit login page</Link>
    </div>
   )    
}