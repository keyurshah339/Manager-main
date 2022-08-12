import React from "react";
import { useNavigate } from "react-router";
import landing from "../../assets/landing.svg";
export function Landing() {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col min-h-[100vh-36px] sm:justify-center ">
      <div className="flex flex-col-reverse sm:flex-row ">
        <img src={landing} className="mr-4 sm:w-[40%] sm:h-[40%] self-start" />
        <div className="m-2  sm:ml-32">
          <h1 className=" font-extrabold text-4xl lg:text-7xl  text-yellow-main self-end">
            Manager
          </h1>
          <h1 className="font-medium text-2xl lg:text-3xl">All notes at one place</h1>
        </div>
      </div>

      <div className="text-center m-2">
        <p className="text-3xl">Join Now!</p>
        <div className="flex flex-col flex-wrap  items-center">
          <button onClick={() => navigate('/login')} className="button selected hover:bg-opacity-100 m-2">
            Login
          </button>
          <button className="button selected m-2" onClick={() => navigate('/signup')}>Signup</button>
        </div>
      </div>
    </div>
  );
}
