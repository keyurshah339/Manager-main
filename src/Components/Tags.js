import React, { useState } from "react";

const Tags = ({ tags, setTags, notes, setNotes }) => {
  const [show, setShow] = useState(true);
  const [newTag, setNewTag] = useState("");

  const showTags = () => {
    return (
      <div className="bordered-container">
        <form className="tag-form">
          <input
            placeholder="Enter a tag name"
            className="tag-input"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
          ></input>
          <button
            className="add-tag"
            style={{ backgroundColor: "#300000 " }}
            onClick={(e) => {
              e.preventDefault();
              if (newTag !== "") {
                setTags([...tags, newTag.toLowerCase()]);
                setNewTag("");
              }
            }}
          >
            Add Tag
          </button>
        </form>
        <div className="tags-flex">
          {tags.sort().map((tag, index) => {
            return (
              <button
                key={index}
                className="tag-btn"
                onClick={(e) => tagClickHandler(e, tag)}
              >
                #{tag}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const tagClickHandler = (e, tag) => {
    e.preventDefault();

    const arr = notes.filter((note) => {
      return note.tags.includes(`${tag}`);
    });

    const newArr = notes.filter((note) => {
      return !note.tags.includes(`${tag}`);
    });

    setNotes([...arr, ...newArr]);
  };

  return (
    <div className="tags-container">
     
      {show && showTags()}
    </div>
  );
};

export default Tags;
