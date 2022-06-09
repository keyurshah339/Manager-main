import { useState } from "react";
import Header from "./Components/Header";
import Form from "./Components/Form";
import Tags from "./Components/Tags";
import Notes from "./Components/Notes";
import { Routes, Route } from "react-router-dom"
import "./App.css";
import Testing from "./Components/testing";
import { Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MyAuth from "./Components/authGuard"
import {AuthCheck} from "./Components/auth/login"
import {Signup} from "./Components/auth/signup"
import { useDataContext } from "./Components/context";
import { useNavigate } from "react-router-dom";



const data = [
  {
    id: 1,
    title: "DEMO OTHER NOTES",
    notes: "WELL IT WILL LOOK KINDA LIKE THIS ",
    color: {
      lightColor: "#FEF3C7",
      darkColor: "#F59E0B"
    },
    tags: ["CanBeAnything", "YourChoice"],
    pin: false
  },
  {
    id: 2,
    title: "Demo Pinned Notes",
    notes:
      " Listen Morty, I hate to break it to you, but what people calls love is just a chemical reaction that compels animals to breed. It hits hard, Morty, then it slowly fades, leaving you stranded in a failing marriage",
    color: {
      lightColor: "#DBEAFE",
      darkColor: "#2563EB"
    },
    tags: ["JustSaying"],
    pin: true
  }
];

const tagsData = [
  "very important",
  "important",

  "do it but when you feel like",
  "should it do it?"
];

function App() {
  const {setlogin,login} = useDataContext();
  const navigate = useNavigate();

  const [dark, setdark] = useState(false);
  const [color, setcolor] = useState("");
  const [fontcolor, setfontcolor] = useState("");
  const [error, seterror] = useState("");
  const darkModeHandler = () => {
    setdark(!dark);

    if (dark === true) {
      setcolor("white");
      setfontcolor("black");
      seterror("");
    } else {
      seterror("UNDER CONSTRUCTION 🚧 Bugs will be fixed soon :)");
      setcolor("black");
      setfontcolor("white");
    }
  };

  const [notes, setNotes] = useState(data);
  const [tags, setTags] = useState(tagsData);


  function logMeOut(){
    setlogin(false)
    navigate("/login", { replace: true });

  }

  // console.log(notes)
  return (
    <div
      className="App"
      style={{ backgroundColor: `${color}`, color: `${fontcolor}` }}
    >
     {login == true && <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
            
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          </Typography>
        <Link style={{color:"white",textDecoration:"none"}}  to="/"><Button color="inherit">Home</Button></Link>
        <Link style={{color:"white",textDecoration:"none"}}  to="tags"><Button color="inherit">Tags</Button></Link>
        <Link style={{color:"white",textDecoration:"none"}}  to="notes"><Button color="inherit">Notes</Button></Link>
        <Button variant="contained" color="error" onClick={logMeOut}>LOGOUT</Button>
        </Toolbar>
      </AppBar>
    </Box>}
      {login == true && <Header />}
      <Routes>
        <Route path="/" element={ 
        <MyAuth>
        <Form
          notes={notes}
          setNotes={(val) => setNotes(val)}
          tags={tags}
          setTags={(val) => setTags(val)}
        /> 
        </MyAuth>
        } />

        <Route path="tags" element={ 
        <MyAuth>
        <Tags
          tags={tags}
          setTags={(val) => setTags(val)}
          notes={notes}
          setNotes={(val) => setNotes(val)}
        /> 
        </MyAuth>
        } />
        <Route path="notes" element={
          <MyAuth>
          <Notes notes={notes} setNotes={(val) => setNotes(val)} /> 
          </MyAuth>
          } />
          <Route path="/login" element={<AuthCheck/>} />
          <Route path="/signup" element={<Signup/>} />

      </Routes>

      <div className="form-div">
        
        <h2>{error}</h2>
        
      </div>
    </div>
  );
}

export default App;
