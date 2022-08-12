import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { GuestSignIn, setUpAuthHeaderForServiceCalls, UserSignIn } from "../../../services/users";
import { setAuth } from "../authSlice";
export function Login() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({});
  const [error, setError] = useState({ message: "", status: "hidden" });
  const [buttonText, setButtonText] = useState("Login");
  const dispatch = useDispatch();
  async function LoginHandler({ e, guest }) {
    e.preventDefault();
    setButtonText("Logging you in...");
    let response;
    if (guest) {
      response = await GuestSignIn()
    } else {
      response = await UserSignIn(userDetails);

    }
    setButtonText("Login");
    if (response.status && response.allowUser) {
      setUpAuthHeaderForServiceCalls(response.token);
      localStorage.setItem("token", response.token);
      localStorage.setItem("userId", response.userId);
      dispatch(setAuth());
      navigate("/home/", { replace: true });
    }
    if (!response.allowUser) {
      setError({
        ...error,
        message: "username/password incorrect",
        status: "block",
      });
    }
  }
  return (
    <div className="flex-col">
      <div className="flex-col">
        <div className=" flex justify-center ">
          <main className="flex flex-col p-4 justify-between  mt-4 flex-1 max-w-sm  border-selected-navitem-light dark:border-selected-navitem-dark rounded">
            <h1 className="font-extrabold text-2xl ">Login to Manager</h1>
            <form
              className="flex flex-col justify-between   h-80  "
              onSubmit={(e) => LoginHandler({ e })}
            >
              <div className="flex flex-col mt-4">
                <p className={`${error.status} text-red-600 text-lg font-bold`}>{error.message}</p>
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  className="input-box"
                  autoComplete="off"
                  required
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, username: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col">
                <label>Password</label>
                <input
                  required
                  type="password"
                  name="password"
                  className="input-box"
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, password: e.target.value })
                  }
                />
              </div>

              <input
                type="submit"
                value={`${buttonText}`}
                className=" button selected self-center"
              />
            </form>
            <button className="button selected self-center m-2" onClick={(e) => LoginHandler({ e, guest: true })}>Login as Guest</button>

            <section className="flex  justify-center mt-4">
              <p>New Here?</p>

              <span className="pl-1 pr-1">.</span>
              <Link to="/signup">
                <button className="underline ">Sign Up</button>
              </Link>

            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
