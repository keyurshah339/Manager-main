import React from "react";
import { useSelector } from "react-redux";
import { ShowNote } from "./ShowNote";
export function UnPinnedNotes() {
  const { allNotes } = useSelector(state => state.notes)
  const unPinnedNotes = allNotes.filter(note => note.pinned === false)
  return (
    unPinnedNotes.length !== 0 &&
    <div className="flex flex-col">
      <h1 className=" self-center font-bold text-yellow-main">Others</h1>
      <div className="flex flex-wrap  justify-center sm:justify-start">


        {unPinnedNotes?.map(note =>
          <div key={note?._id}>
            <ShowNote note={note} />
          </div>
        )}
      </div>
    </div>
  );
}
