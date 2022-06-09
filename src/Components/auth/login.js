import { useDataContext } from "../context";
import { useNavigate } from "react-router-dom";
import "./auth.css";
import { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { Redirect, useHistory} from 'react-router-dom';
import Button from '@mui/material/Button';










export const AuthCheck = () => {

  const {login,setlogin} = useDataContext();

    
  
    const [username,setusername]=useState('')
      const [pass,setpass]=useState('')
      const [err,seterr]=useState(false)
      const navigate = useNavigate();

    async function Authtry() {

      console.log('inside authtry')

     await axios.post('https://universely.herokuapp.com/login', {username: username, password: pass})
      .then(res => {


        setlogin(true)
        reRoute()
      })
      .catch(error => {
        seterr(true)
      })

  }

 function reRoute(){
  console.log('inside reRoute')
  seterr(false)
  navigate("/", { replace: true });
  
 }

 function userSignup (){
  navigate("/signup", { replace: true });
 }



    return(
        <>
     <div>
      <div
        className="main"
          style={{
            width: "auto",
            height: "100vh",
            display: "flex",
          flexDirection: "column",
        }}
      >
        <div>
      {/* <img className="heroimg" src={heroimg}/> */}
      </div>

        <div
          style={{
            width: "700px",
            height: "350px",
            margin: "auto",
            display: "flex",
          }}
        >
            <div className="info-section" style={{ margin: "auto" }}>
              <h3>Welcome to Manager</h3>
              
              <p className="subtext">Please login/Sign UP!</p>
              <br/>
            
              <h5 onClick={userSignup} style={{textDecoration: 'underline',cursor:'pointer'}}>New User ? Sign up!</h5>
            </div>
            

          <div style={{ margin: "auto" }}>
            <div style={{ marginBottom: "1rem" }}>
              {err ? (
                <p class="lbl-red subtext">
                  {" "}
                  Please enter valid username and password!{" "}
                </p>
              ) : (
                ""
              )}
            </div>

            <div>
              
              <input
                // onChange={(event) => setname(event.target.value)}
                placeholder="Username"
                style={{
                  marginBottom: "1rem",
                  width: "200px",
                  height: "30px",
                  borderRadius: "0.5rem",
                }}
                onChange={(e) => setusername(e.target.value)}
              ></input>
            </div>

            <div>
              <input
                type="password"
                // onChange={(event) => setpassword(event.target.value)}
                placeholder="Password"
                style={{
                  marginBottom: "1rem",
                  width: "200px",
                  height: "30px",
                  borderRadius: "0.5rem",
                }}
                onChange={(e) => setpass(e.target.value)}
              ></input>
            </div>

            <div style={{ margin: "auto" }}>
              <Button onClick={Authtry} >
                Login
              </Button>
            </div>
          </div>
        </div>

        <div style={{ margin: "auto" }}>
       
        </div>
      </div>
    </div>
        
        </>
    )
}