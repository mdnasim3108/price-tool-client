import { useState } from "react";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";
const Verify = (props) => {
  const [otp, setOtp] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    if (otp != props.otp) {
      toast.error("Invalid OTP");
      return;
    }
    props.createUser();
  };
  return (
    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
      <Toaster />
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
        OTP verification
      </h1>
      <form className="space-y-4 md:space-y-6" onSubmit={submitHandler}>
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Enter OTP sent to {props.email}
          </label>
          <input
            onChange={(e) => setOtp(e.target.value)}
            type="text"
            name="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
            placeholder="Enter OTP"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full text-white bg-[#2563eb] hover:bg-[#517edf] focus:ring-4 focus:outline-none focus:ring-[#2563eb] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          {props.loading ? (
            <ClipLoader color="white" size={25} className="text-white" />
          ) : (
            "Verify"
          )}
        </button>
      </form>
    </div>
  );
};
export default Verify;
