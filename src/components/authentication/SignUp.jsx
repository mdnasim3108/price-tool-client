import { useState } from "react";
import logo from "../../assets/Halliburton-Emblem.jpg";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import app from "../../../firebase.config";
import { api } from "../../constants";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";
import Verify from "./Verify";
const SignUp = (props) => {
  const auth = getAuth();
  const [data, setData] = useState({ userName: "", email: "", password: "" });
  const [otp, setOtp] = useState();
  const [loading, setLoading] = useState(false);
  const signUpInputs = [
    {
      label: { for: "userName", children: "User Name" },
      input: {
        type: "text",
        name: "userName",
        id: "userName",
        placeholder: "john smith",
        required: true,
      },
    },
    {
      label: { for: "email", children: "Email" },
      input: {
        type: "email",
        name: "email",
        id: "email",
        placeholder: "name@company.com",
        required: true,
      },
    },
    {
      label: { for: "password", children: "Password" },
      input: {
        type: "password",
        name: "password",
        id: "password",
        placeholder: "••••••••",
        required: true,
      },
    },
  ];
  const inputChangeHandler = (event) => {
    setData((previousData) => {
      return { ...previousData, [event.target.id]: event.target.value };
    });
  };
  const createUser = async () => {
    setLoading(true);
    try {
      const { userName, email, password } = data;
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;
      axios.post(`${api}/createUser`, { userName, email }).then((res) => {
        props.toast();
        props.showLogin();
        setOtp(null);
        setLoading(false);
      });
    } catch (er) {
      toast.error(er.message);
      setOtp(null);
      setLoading(false);
    }
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    const { userName, email, password } = data;
    const {data:isUserExist} = await axios.post(`${api}/isUserExist`,{email})
    if(isUserExist){
        toast.success("user already exists")
        return
    }
    axios
      .post(`${api}/verifyUser`, { userName, to: email })
      .then((res) => {
        toast.success("Email sent successfully");
        setOtp(res.data.otp);
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.message);
        setLoading(false);
      });
  };
  return (
    <div className="flex flex-col items-center justify-center sm:px-6 sm:py-8 px-3 mx-auto md:h-[80vh] lg:py-0  w-full lg:w-[30rem]">
      <Toaster />
      <a
        href="#"
        className="flex items-center mb-6 text-2xl font-semibold text-gray-900 "
      >
        <img className="w-[4rem] h-[3rem] " src={logo} alt="logo" />
        Infra Pricing Tool
      </a>
      <div className="w-full bg-white rounded-lg shadow border md:mt-0  xl:p-0 ">
        {!otp ? (
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Sign Up
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={submitHandler}>
              {signUpInputs.map((e) => (
                <div key={e.input.id}>
                  <label
                    htmlFor={e.label.for}
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    {e.label.children}
                  </label>
                  <input
                    type={e.input.type}
                    name={e.input.name}
                    id={e.input.id}
                    placeholder={e.input.placeholder}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    required={e.input.required}
                    onChange={inputChangeHandler}
                  />
                </div>
              ))}

              <button
                type="submit"
                className="w-full text-white bg-[#2563eb] hover:bg-[#517edf] focus:ring-4 focus:outline-none focus:ring-[#2563eb] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                {loading ? (
                  <ClipLoader color="white" size={25} className="text-white" />
                ) : (
                  "Sign Up"
                )}
              </button>
              <p
                className="text-sm font-light text-gray-500 "
                onClick={() => props.showLogin()}
              >
                Already Having An account?{" "}
                <a className="font-medium text-primary-600 hover:underline  cursor-pointer">
                  Sign In
                </a>
              </p>
            </form>
          </div>
        ) : (
          <Verify
            otp={otp}
            email={data.email}
            createUser={createUser}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
};
export default SignUp;
