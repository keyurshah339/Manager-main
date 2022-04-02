import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbtack } from "@fortawesome/free-solid-svg-icons";

const Note = ({ item, setNotes }) => {
  const { id, notes, color, tags, pin } = item;

  const [inEditMode, setInEditMode] = useState(false);
  const [editNote, setEditNote] = useState(notes);

  console.log(editNote);

  const colorHandler = (item) => {
    setNotes((prev) =>
      prev.map((note, index) => {
        if (note.id === id) {
          return {
            ...note,
            color: {
              lightColor: item.lightColor,
              darkColor: item.darkColor
            }
          };
        }
        return note;
      })
    );
  };

  const pinHandler = () => {
    setNotes((prev) =>
      prev.map((note, index) => {
        if (note.id === id) {
          return { ...note, pin: !pin };
        }
        return note;
      })
    );
  };

  const deleteHandler = () => {
    setNotes((prev) =>
      prev.filter((note) => {
        return note.id !== id;
      })
    );
  };

  const editHandler = (e) => {
    e.preventDefault();
    setInEditMode((prev) => !prev);
    setNotes((prev) =>
      prev.map((note, index) => {
        if (note.id === id) {
          return { ...item, notes: editNote };
        }
        return note;
      })
    );
  };

  return (
    <div
      className="card"
      style={{ background: "white", border: `2px solid ${"black"}` }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%"
        }}
      >
        <h3 style={{ width: "50%", textAlign: "left" }}>{item.title}</h3>
        <button
          style={{
            background: "#996699",
            color: "white",
            padding: "0.5rem"
          }}
          onClick={editHandler}
        >
          {inEditMode ? "Update" : "Edit"}
        </button>
        {pin && (
          <FontAwesomeIcon
            icon={faThumbtack}
            style={{ color: color.darkColor }}
            size="lg"
          />
        )}
      </div>
      {inEditMode ? (
        <textarea
          className="textarea"
          value={editNote}
          onChange={(e) => setEditNote(e.target.value)}
        ></textarea>
      ) : (
        <p onClick={() => setInEditMode((prev) => !prev)}>{item.notes}</p>
      )}
      <div style={{ marginBottom: "0.5rem" }}>
        {tags.map((tag, index) => {
          return (
            <span key={index} style={{ display: "inline" }}>
              #{tag}{" "}
            </span>
          );
        })}
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between"
        }}
      >
        {pin ? (
          <button
            className="pin-btn"
            style={{
              color: "#996699",
              border: `2px solid ${"#996699"}`
            }}
            onClick={pinHandler}
          >
            Unpin
          </button>
        ) : (
          <button
            style={{
              color: "#996699",
              border: `2px solid ${"#996699"}`
            }}
            className="pin-btn"
            onClick={pinHandler}
          >
            {" "}
            pin
          </button>
        )}
        <button className="pinned" onClick={deleteHandler}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Note;
