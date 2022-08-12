import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UnPinnedNotes } from "../../features/notes/UnPinnedNotes";
import { CreateNote } from "../../features/notes/createNote";
import { EditNote } from "../../features/notes/EditNote";
import { fetchNotesData } from "../../features/notes/notesSlice";
import { PinnedNotes } from "../../features/notes/PinnedNotes";
import { SpinLoader } from "./Loader";
export function Homepage() {
  const dispatch = useDispatch()
  const { notesFetchstatus, allNotes } = useSelector(state => state.notes)
  const { authSetupStatus } = useSelector(state => state.auth)
  useEffect(() => {
    if (notesFetchstatus === "idle" && authSetupStatus) {
      dispatch(fetchNotesData())
    }

  }, [notesFetchstatus, authSetupStatus])

  return (
    <div className="flex flex-col ">
      <CreateNote />
      {allNotes ?
        <div>
          <PinnedNotes />
          <UnPinnedNotes />
          <EditNote />
        </div>
        :
        <SpinLoader />
      }

    </div>
  );
}
