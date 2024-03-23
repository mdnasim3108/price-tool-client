import { useContext, useState } from "react";
import logo from "../../assets/Halliburton-Emblem.jpg";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import app from "../../../firebase.config";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import Forgot from "./Forgot";
import { Cookies } from "react-cookie";
import Context from "../../globalContextStore/context";
const LogIn = (props) => {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const { fetchEnquiries } = useContext(Context);
  const cookies = new Cookies();
  const submitHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    const auth = getAuth();
    const { email, password } = data;
    await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setLoading(false);
        cookies.set("user", email, {
          path: "/",
          expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        });
        fetchEnquiries(email);
        navigate("/home");
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
      });
  };
  const changeHandler = (e) => {
    setData((previousData) => {
      return { ...previousData, [e.target.id]: e.target.value };
    });
  };
  return (
    <div className="flex flex-col items-center justify-center sm:px-6 sm:py-8 px-3 mx-auto md:h-screen lg:py-0  w-full lg:w-[30rem]">
      <a className="flex items-center mb-6 text-2xl font-semibold text-gray-900 ">
        <img className="w-[4rem] h-[3rem] " src={logo} alt="logo" />
        Infra Pricing Tool
      </a>
      <div className="w-full bg-white rounded-lg shadow border md:mt-0  xl:p-0  ">
        {!showForgot ? (
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={submitHandler}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Your email
                </label>
                <input
                  onChange={changeHandler}
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Password
                </label>
                <input
                  onChange={changeHandler}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 "
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 "
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  className="text-sm font-medium text-primary-600 hover:underline text-primary-500 cursor-pointer"
                  onClick={() => setShowForgot(true)}
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-[#2563eb] hover:bg-[#517edf] focus:ring-4 focus:outline-none focus:ring-[#2563eb] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                {loading ? (
                  <ClipLoader color="white" size={25} className="text-white" />
                ) : (
                  "Sign In"
                )}
              </button>
              <p
                className="text-sm font-light text-gray-500 "
                onClick={() => props.showSignUp()}
              >
                Don’t have an account yet?{" "}
                <a className="font-medium text-primary-600 hover:underline  cursor-pointer">
                  Sign up
                </a>
              </p>
            </form>
          </div>
        ) : (
          <Forgot showLogin={() => setShowForgot(false)} />
        )}
      </div>
    </div>
  );
};
export default LogIn;
