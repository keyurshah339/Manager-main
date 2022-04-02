import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbtack } from "@fortawesome/free-solid-svg-icons";

const Form = ({ notes, setNotes, tags, setTags }) => {
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
                  setNote({ ...note, tagsNote: [...note.tagsNote, item] })
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
          tags: note.tagsNote,
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
  };

  function getBorderColor() {
    if (note.pinNote) {
      return "#DC2626";
    }
    return "#6B7280";
  }

  return (
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
      <input
        placeholder="Add Tag"
        type="text"
        onFocus={() => {
          setShow({ ...show, tags: true });
        }}
        value={note.tagsNote}
      ></input>
      {show.tags && showTags()}

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
  );
};

export default Form;
