import { useState } from "react";
import logo from "../../../assets/logo.png";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {

  const { register, loading, error } = useAuth();
  const [userDetails, setUserDetails] = useState({firstname: '',lastname: '' ,phone: '',password: ''});
  
  const naviagate = useNavigate();

  const handlerChange = (e)=>{
    setUserDetails({
        ...userDetails,
        [e.target.name]: e.target.value
    });
  }

  const handlerSubmit = async (e)=>{
    e.preventDefault();
    const check = await register(userDetails);
    if(check){
      alert('You registered');
      naviagate('/login');
    }else{
      alert('This phone number already registered');
    }
    
  }
 

  return (
    <div className="flex pt-[100px] items-center justify-center bg-white py-10  px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full flex max-lg:flex-col items-center ">
        <header className="w-1/2 max-lg:w-full">
          <img src={logo} alt="" className="m-auto h-60" />
        </header>
        <form
          className="py-10 space-y-2 w-1/2 max-lg:w-full font-medium"
          onSubmit={handlerSubmit}
        >
          <h2 className="text-3xl max-lg:text-center font-extrabold text-gray-900">
            Create an Account
          </h2>
          {/* Name */}
          <div className="max-w-md flex justify-between items-center max-lg:space-x-2 max-lg:m-auto">
            <div className="relative mt-2 ">
              <label htmlFor="password" className="py-2 text-sm">
                First Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="firstname"
                  value={userDetails.firstname}
                  id=""
                  onChange={handlerChange}
                  className="block w-full shadow-sm border border-b-black py-3 px-3 bg-white text-gray-900 outline-none placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  placeholder="First name"
                />
              </div>
            </div>
            <div className="relative mt-2 ">
              <label htmlFor="password" className="py-2 text-sm">
                Last Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="lastname"
                  value={userDetails.lastname}
                  id=""
                  onChange={handlerChange}
                  className="block w-full shadow-sm border border-b-black py-3 px-3 bg-white text-gray-900 outline-none placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  placeholder="Last Name"
                />
              </div>
            </div>
          </div>
          {/* Phone */}
          <div className="max-w-md max-lg:m-auto">
            <div className="">
              <label htmlFor="email-address" className="py-2 text-sm">
                Phone number
              </label>
              <div className="flex items-center bg-white w-full border shadow-sm">
                <div className="flex  items-center h-full pl-3 sm:text-sm w-20 max-sm:w-24">
                  <img
                    src="data:image/png;base64,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"
                    alt=""
                    className="h-4"
                  />
                  +855
                </div>
                <input
                  id="number"
                  name="phone"
                  type="text"
                  value={userDetails.phone}
                  onChange={handlerChange}
                  className="block shadow-sm w-full border-l ml-1.5 py-3 pl-1.5 pr-3 bg-white text-gray-900 outline-none placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  placeholder="Phone Number"
                />
              </div>
            </div>
            <div className="relative mt-2">
              <label htmlFor="password" className="py-2 text-sm">
                Create a password
              </label>
              <div className="relative">
                <button
                  className="absolute inset-y-0 right-2 flex items-center"
                >
                  {userDetails.password ? (
                    <EyeIcon className="h-4 w-4 text-gray-600" />
                  ) : (
                    <EyeSlashIcon className="h-4 w-4 text-gray-600" />
                  )}
                </button>
                <input
                  id="password"
                  name="password"
                  type={userDetails.password ? "text" : "password"}
                  autoComplete="current-password"
                  value={userDetails.password}
                  onChange={handlerChange}
                  className="block shadow-sm w-full border border-b-black py-3 pl-3 pr-7 bg-white text-gray-900 outline-none placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  placeholder="Create a password"
                />
              </div>
            </div>
          </div>
          <div className="max-w-md pt-3 max-lg:m-auto">
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border bg-black hover:bg-opacity-90 border-b-black text-sm font-medium text-white"
            >
              {loading ? "Creating..." : "Create Account"}
            </button>
          </div>
          <div className="max-w-md text-center text-xs flex items-center justify-center">
            <p>Already have an account ?</p>
            <Link to="/login">
              <h1 className="ml-1 hover:text-black font-bold py-2 underline">
                Log In
              </h1>
            </Link>
          </div>
          {error && <p>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Register;
