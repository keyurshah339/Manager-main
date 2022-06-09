import { useDataContext } from "../context";
import { useNavigate } from "react-router-dom";
import "./auth.css";
import { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { Redirect, useHistory} from 'react-router-dom';
import Button from '@mui/material/Button';










export  const Signup = () => {

  const {login,setlogin} = useDataContext();

    
  
    const [username,setusername]=useState('')
    const [firstName,setfirstName]=useState('')
    const [lastName,setlastName]=useState('')
    const [email,setemail]=useState('')
    
      const [pass,setpass]=useState('')
      const [err,seterr]=useState(false)
      const navigate = useNavigate();

    async function signMeUp() {

      console.log('inside signMeUp')

     await axios.post('https://agile-headland-48240.herokuapp.com/signup', {username: username, password: pass, email: email, firstName: firstName,lastName:lastName})
      .then(res => {
        reRoute()
      })
      .catch(err => {
        console.log(err)
      })

  }

 function reRoute(){
  navigate("/login", { replace: true });
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
              
              <p className="subtext">Please Sign UP!</p>
              <br/>
              
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

            <div>
              <input
                // onChange={(event) => setpassword(event.target.value)}
                placeholder="First Name"
                style={{
                  marginBottom: "1rem",
                  width: "200px",
                  height: "30px",
                  borderRadius: "0.5rem",
                }}
                onChange={(e) => setfirstName(e.target.value)}
              ></input>
            </div>

            <div>
              <input
                // onChange={(event) => setpassword(event.target.value)}
                placeholder="Last Name"
                style={{
                  marginBottom: "1rem",
                  width: "200px",
                  height: "30px",
                  borderRadius: "0.5rem",
                }}
                onChange={(e) => setlastName(e.target.value)}
              ></input>
            </div>

            <div>
              <input
                // onChange={(event) => setpassword(event.target.value)}
                placeholder="Email"
                style={{
                  marginBottom: "1rem",
                  width: "200px",
                  height: "30px",
                  borderRadius: "0.5rem",
                }}
                onChange={(e) => setemail(e.target.value)}
              ></input>
            </div>

            <div style={{ margin: "auto" }}>
              <Button onClick={signMeUp} >
                Sign Up
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
