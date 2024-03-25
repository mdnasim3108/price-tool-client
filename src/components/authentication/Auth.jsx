import { useEffect, useState } from "react"
import LogIn from "./LogIn"
import SignUp from "./SignUp"
import toast, { Toaster } from "react-hot-toast"
import { Cookies } from "react-cookie"
import { useNavigate } from "react-router-dom"
const Auth=()=>{
    const cookie=new Cookies()
    const navigate=useNavigate()
    useEffect(()=>{
        if(cookie.get("user")) navigate("/home")
    },[])
    const [showlogin,setShowlogin]=useState(true)
    return <div className="w-full h-screen  ">
        <Toaster/>
            {showlogin?
            <LogIn showSignUp={()=>setShowlogin(false)}/>
            :<SignUp showLogin={()=>setShowlogin(true)} verified={()=>setShowlogin(true)} toast={()=>toast.success("verification successfull!")}/>
        }
        </div>
}
export default Auth