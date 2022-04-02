import { useState } from "react";
import Header from "./Components/Header";
import Form from "./Components/Form";
import Tags from "./Components/Tags";
import Notes from "./Components/Notes";

import "./App.css";

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

  // console.log(notes)
  return (
    <div
      className="App"
      style={{ backgroundColor: `${color}`, color: `${fontcolor}` }}
    >
      <button className="button" onClick={darkModeHandler}>
        DARK MODE
      </button>

      <Header />
      <div className="form-div">
        <Form
          notes={notes}
          setNotes={(val) => setNotes(val)}
          tags={tags}
          setTags={(val) => setTags(val)}
        />
        <h2>{error}</h2>
        <Tags
          tags={tags}
          setTags={(val) => setTags(val)}
          notes={notes}
          setNotes={(val) => setNotes(val)}
        />
        <Notes notes={notes} setNotes={(val) => setNotes(val)} />
      </div>
    </div>
  );
}

export default App;
