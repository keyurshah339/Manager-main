import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { setUpAuthHeaderForServiceCalls, UserSignUp } from "../../../services/users";
import { setAuth } from "../authSlice";



export function Signup() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({});
  const [error, setError] = useState({ status: "hidden", message: "" });
  const [buttonText, setButtonText] = useState("Sign Up");
  const dispatch = useDispatch();
  function PasswordHandler() {
    if (userDetails.password.length < 6) {
      setError({
        ...error,
        message: "Password must be atleast of 6 characters",
        status: "block",
      });
    } else if (userDetails.password !== userDetails.confirmPassword) {
      setError({
        ...error,
        message: "Passwords didn't match",
        status: "block",
      });
    } else if (userDetails.password.match("[0-9]+") === null) {
      setError({
        ...error,
        message: "Password must contain a number",
        status: "block",
      });
    } else if (userDetails.password.match("(?=.*[A-Z])") === null) {
      setError({
        ...error,
        message: "Password must contain a Capital letter",
        status: "block",
      });
    } else {
      setError({ ...error, status: "hidden" });
      return true;
    }
  }

  async function SignupHandler(e) {
    e.preventDefault();
    const apiCallStatus = PasswordHandler();
    if (apiCallStatus) {
      setButtonText("Signing You Up...");
      const response = await UserSignUp(userDetails);
      setUpAuthHeaderForServiceCalls(response.token);
      setButtonText("Sign Up");
      if (response.status) {
        setUpAuthHeaderForServiceCalls(response.token);
        localStorage.setItem("token", response.token);
        localStorage.setItem("userId", response.userId);
        dispatch(setAuth());
        navigate("/home", { replace: true });
      } else if ("existingField" in response) {
        setError({
          ...error,
          message: `${response.existingField} already exists`,
          status: "block",
        });
      }
    }
  }
  return (
    <div className=" flex justify-center ">
      <main className="flex flex-col p-4 justify-between  mt-4 flex-1 max-w-sm  border-selected-navitem-light dark:border-selected-navitem-dark rounded">
        <h1 className="font-extrabold text-2xl ">Create your account</h1>
        <p className={`${error.status} text-red-600 text-l font-bold`}>{error.message}</p>
        <form
          className="flex flex-col justify-between "
          onSubmit={SignupHandler}
        >
          <div className="flex flex-col">
            <label>Full name</label>
            <input
              type="text"
              name="name"
              className="input-box"
              required
              onChange={(e) =>
                setUserDetails({ ...userDetails, name: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col mt-4">
            <label>Username</label>
            <input
              type="text"
              name="username"
              className="input-box"
              onChange={(e) =>
                setUserDetails({ ...userDetails, username: e.target.value })
              }
              required
            />
          </div>
          <div className="flex flex-col">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="input-box"
              required
              onChange={(e) =>
                setUserDetails({ ...userDetails, email: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="input-box"
              required
              onChange={(e) =>
                setUserDetails({ ...userDetails, password: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col">
            <label>Confirm Password</label>
            <input
              type="password"
              name="password"
              className="input-box"
              required
              onChange={(e) =>
                setUserDetails({
                  ...userDetails,
                  confirmPassword: e.target.value,
                })
              }
            />
          </div>

          <input
            type="submit"
            value={`${buttonText}`}
            className="self-center button selected font-bold mt-4 "
          />
        </form>
        <section className="flex text-blue-light justify-center mt-4">
          <Link to="/login">
            <button className="underline">Already Have an Account?</button>
          </Link>
        </section>
      </main>
    </div>
  );
}
