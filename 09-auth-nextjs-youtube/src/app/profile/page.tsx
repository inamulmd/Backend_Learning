"use client";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import React ,{useState} from "react";
import { useRouter }  from "next/navigation";


export default function ProfilePage(){
    const router = useRouter()
    const [data, setData] = useState("nothing")
   const logout = async ()=> {
        try {
            await axios.get("/api/users/logout")
            toast.success("logout successfully")
            router.push('/login')
        }catch(error:any) {
            console.log(error.message);

            toast.error(error.message);
        }
   }

   const getUserDetails = async () => {
     const res  = await axios.get('/api/users/tokeninfo')
     console.log(res.data);
     setData(res.data.data._id)

   }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr/>
            <p>Profle page</p>
            <h2 className="p-3 rounded bg-green-500">{data === 'nothing' ? "Nothing" : 
             <Link href={`/profile/${data}`}>{data}</Link>}</h2>
          <hr/>
          <button 
          onClick={logout}
          className="bg-blue-500 hover:bg-blue-700 mt-4  text-white font-bold py-2 px-4 rounded">
            LogOut
          </button>  

          <button 
          onClick={getUserDetails}
          className="bg-orange-500 hover:bg-orange-700 mt-4  text-white font-bold py-2 px-4 rounded">
           GetUserDetails
          </button>  
        </div>
    )
}