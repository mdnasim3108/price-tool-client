import { useState } from "react"
import { sendPasswordResetEmail,getAuth } from "firebase/auth"
import app from "../../../firebase.config"
import toast from "react-hot-toast"
import { Toaster } from "react-hot-toast"
import ClipLoader from "react-spinners/ClipLoader";
const Forgot=(props)=>{
    const [email,setEmail]=useState("")
    const [loading,setLoading]=useState(false)
    
    const submitHandler=async(e)=>{
        const auth=getAuth()
        setLoading(true)
        e.preventDefault()
        sendPasswordResetEmail(auth,email)
        .then(res=>{
            toast.success(`passoword reset link sent to ${email} `)
            props.showLogin()
            setLoading(false)
        })
        .catch(er=>{
            setLoading(false)
            toast.error(er.message)
        })
    }
    return <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
    <Toaster />
    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
      Forgot Password
    </h1>
    <form className="space-y-4 md:space-y-6" onSubmit={submitHandler}>
      <div>
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Enter the registered email
        </label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          name="email"
          id="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter Email"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full text-white bg-[#2563eb] hover:bg-[#517edf] focus:ring-4 focus:outline-none focus:ring-[#2563eb] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        {loading ? (
          <ClipLoader color="white" size={25} className="text-white" />
        ) : (
          "Send Password reset Link"
        )}
      </button>
      <p className="cursor-pointer underline text-center" onClick={props.showLogin}>
            Back to Login
      </p>
    </form>
  </div>
}
export default Forgot;