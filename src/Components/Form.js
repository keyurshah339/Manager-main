import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbtack } from "@fortawesome/free-solid-svg-icons";
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import uuid from 'react-uuid'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const Form = ({ notes, setNotes, tags, setTags }) => {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    console.log('event.target.value',event.target.value)
      setChipData(oldFiles => [...oldFiles,{ key: uuid(), label: event.target.value }])
    
  };
  const [chipData, setChipData] = React.useState([
    // { key: 0, label: 'Angular' },
    // { key: 1, label: 'jQuery' },
    // { key: 2, label: 'Polymer' },
    // { key: 3, label: 'React' },
    // { key: 4, label: 'Vue.js' },
  ]);

  console.log('chipData',chipData)

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  };


  const [note, setNote] = useState({
    titleNote: "",
    noteNote: "",
    colorNote: {
      lightColor: "#FEF3C7",
      darkColor: "#F59E0B"
    },
    tagsNote: [],
    pinNote: false
  });

  console.log('note.tagsNote',note.tagsNote)

  const [show, setShow] = useState({
    color: false,
    tags: false
  });

  const [error, setError] = useState("");

  // const [tags,setTags] = useState (tagsData.sort())

  const RemoveTag = (e, item) => {
    e.preventDefault();
    setNote({ ...note, tagsNote: note.tagsNote.filter((i) => i !== item) });
  };

  const showTags = () => {
    return (
      <ul className="tagsList">
        <li
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginRight: "1rem"
          }}
        >
          <button
            style={{ background: "#DC2626", color: "#FFF" }}
            onClick={() => setShow({ ...show, tags: false })}
          >
            x
          </button>
        </li>
        {tags.sort().map((item, index) => {
          return (
            <li key={index} className="tagDropdown">
              <span
                onClick={() =>
                  // setChipData(...chipData,{ key: uuid(), label: 'Angular' })
                  setChipData(oldFiles => [...oldFiles,{ key: uuid(), label: item }])
                  // setNote({ ...note, tagsNote: [...note.tagsNote, item] })
                }
                value={note.tagsNote}
                className="span"
              >
                {item}
              </span>
              <button onClick={(e) => RemoveTag(e, item)}>Remove</button>
            </li>
          );
        })}
      </ul>
    );
  };

  const addNoteHandler = (e) => {
    e.preventDefault();
    let result = chipData.map(a => a.label);
    if (note.titleNote === "") {
      setError("Title Field is Empty");
    } else if (note.noteNote === "") {
      setError("Note Field is Empty");
    } else {
      setNotes([
        {
          id: uuidv4(),
          title: note.titleNote,
          notes: note.noteNote,
          color: note.colorNote,
          tags: result,
          pin: note.pinNote
        },
        ...notes
      ]);

      setNote({
        titleNote: "",
        noteNote: "",
        colorNote: {
          lightColor: "#FEF3C7",
          darkColor: "#F59E0B"
        },
        tagsNote: []
      });

      setError("");
    }
    setChipData([])
    result = null;
  };

  function getBorderColor() {
    if (note.pinNote) {
      return "#DC2626";
    }
    return "#6B7280";
  }

  const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    
  ];

  

  return (
    <div className="bordered-container">
    <form className="form">
      {error && (
        <div className="error" style={{ backgroundColor: "red" }}>
          <p style={{ marginBlockStart: 0, marginBlockEnd: 0 }}>{error}</p>
          <button
            className="x"
            styles={{ backgroundColor: "white" }}
            onClick={(e) => {
              e.preventDefault();
              setError("");
            }}
          >
            x
          </button>
        </div>
      )}

      <div className="pin-title">
        <label htmlFor="title" style={{ marginBottom: 0 }}>
          Title
        </label>

        <div
          className="thumbtack"
          onClick={() => {
            setNote({ ...note, pinNote: !note.pinNote });
          }}
          style={{ border: `1px solid ${getBorderColor()}` }}
        >
          <FontAwesomeIcon
            icon={faThumbtack}
            style={{ color: getBorderColor() }}
            size={note.pinNote ? "lg" : ""}
          />
        </div>
      </div>
      <input
        placeholder="Add Title"
        type="text"
        value={note.titleNote}
        onChange={(e) => setNote({ ...note, titleNote: e.target.value })}
      ></input>
      <label htmlFor="note">Note</label>
      <textarea
        placeholder="Add Note"
        type="text"
        value={note.noteNote}
        onChange={(e) => setNote({ ...note, noteNote: e.target.value })}
        style={{ height: "7rem" }}
      ></textarea>
      <label htmlFor="note">Tags</label>
      <Paper
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        p: 0.5,
        m: 0,
      }}
      component="ul"
    >
      {chipData.map((data) => {
        let icon;

        if (data.label === 'React') {
          icon = <TagFacesIcon />;
        }

        return (
          <ListItem key={data.key}>
            <Chip
              icon={icon}
              label={data.label}
              onDelete={data.label === 'React' ? undefined : handleDelete(data)}
            />
          </ListItem>
        );
      })}
    </Paper>
      <br />
      <FormControl  style={{ width: "5rem" }}>
        <InputLabel id="demo-simple-select-label">
        <AddCircleOutlineIcon  />
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          onChange={handleChange} 
        >
          {tags.sort().map((name) => (
            <MenuItem
            onClick={() =>
              // setChipData(...chipData,{ key: uuid(), label: 'Angular' })
              setChipData(oldFiles => [...oldFiles,{ key: uuid(), label: name }])
              // setNote({ ...note, tagsNote: [...note.tagsNote, item] })
            }
              key={name}
              value=''
            >
              {name}
            </MenuItem>
          ))}
          </Select>
      </FormControl>
      <br/>
      <div className="form-btns">
        <button
          className="add-note"
          style={{ backgroundColor: "#300000 " }}
          onClick={addNoteHandler}
        >
          Add Note
        </button>
      </div>
    </form>
    </div>
  );
};

export default Form;
