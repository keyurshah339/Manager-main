import React from "react"
import { useSelector } from "react-redux"
import { ShowNote } from "./ShowNote"
export function PinnedNotes() {
    const { allNotes } = useSelector(state => state.notes)
    const pinnedNotes = allNotes.filter(note => note.pinned === true)

    return (
        pinnedNotes?.length !== 0 &&
        <div className="flex flex-col">
            <h1 className="self-center font-bold text-yellow-main">Pinned</h1>
            <div className="flex flex-wrap justify-center sm:justify-start">
                {
                    pinnedNotes?.map(note =>
                        <div key={note?._id}>
                            <ShowNote note={note} />
                        </div>
                    )
                }
            </div>
        </div>
    )
}
