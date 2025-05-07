"use client";
import Link from "next/link";
import React from "react";
import { useRouter} from "next/navigation";
import axios from 'axios';
import { useEffect } from "react";
import toast from "react-hot-toast";




export default function LoginPage() {
   const router = useRouter();
    const [user, setUser] = React.useState({
       email: "", 
       password: "",
      
    })

    
        const [buttonDisabled, setButtonDisabled] = React.useState(false);
        const [loading , setLoading]  = React.useState(false);

    const onLogin = async () => {
          try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user); 
            console.log("Loginsuccess", response.data);
            router.push("/profile");
            toast.success("Login successfully");

          } catch (error:any) {
            console.log("Login failed", error.message);
            toast.error(error.message);
          }finally{
            setLoading(false);
          }
    }

    useEffect( ()=> {
      if(user.email.length > 0 && user.password.length > 0 
        ) {
            setButtonDisabled(false);
         }else{
           setButtonDisabled(true);
         }
    }, [user]);


   return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>{loading ? "Processing" : "Login"}</h1>
          <hr />

          <label htmlFor="email">email</label>
          <input 
          className="p- border border-gray-300 rounded-md mb-4 focus:ooutline-none focus:border-gray-600"
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value})}
            placeholder="email"
            />

          <label htmlFor="passwords">passwords</label>
          <input 
          className="p- border border-gray-300 rounded-md mb-4 focus:ooutline-none focus:border-gray-600"
            id="passwords"
            type="password"
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
            placeholder="passwords"
            />

            <button 
            onClick={onLogin} className="p-2 border border-gray-300
            rounded-lg mb-4 focus:outline-none focus:border-gray-600">
               Login here
            </button>
            <Link href="/signup"> Visit Signup page</Link>
    </div>
   )    
}