/* eslint-disable react/prop-types */
import React from "react"
import { RiPushpin2Fill, RiPushpin2Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { addToPinned, enableEditModal, removeFromPinned } from "./notesSlice";
export function ShowNote({ note }) {
    const dispatch = useDispatch()
    async function notePinStatusHandler(e, note) {
        e.stopPropagation()
        if (note.pinned) {
            await dispatch(removeFromPinned({ noteId: note._id }))
        }
        else {
            await dispatch(addToPinned({ noteId: note._id }))
        }
    }
    return (
        <div onClick={() => dispatch(enableEditModal({ note }))} className={`m-2 p-3  cursor-pointer note-focus bg-white dark:bg-dark-1  max-w-[300px] min-h-[152px] rounded-lg  box-shadow-light dark:box-shadow-dark `}>

            <div className="flex flex-col p-2 outline-none  " >
                <section className="flex mb-1">
                    <input type="text" placeholder="Title" className={`h-[36px] w-full p-2   outline-none font-medium bg-white dark:bg-dark-1`}
                        value={note?.title}
                        readOnly
                        required />
                    <button className="ml-auto"
                        onClick={(e) => notePinStatusHandler(e, note)}
                    >
                        {note?.pinned ?
                            <RiPushpin2Fill size={28} />
                            :
                            <RiPushpin2Line size={28} />
                        }

                    </button>

                </section>
                {note.image && note.image !== "undefined" && <img src={note.image} />}
                <textarea type="text" placeholder="Take a note..." className={`scrollbar h-[57px] p-2 outline-none  bg-white dark:bg-dark-1 dark:text-white `} value={note?.content} readOnly
                    required />
                <div className="flex flex-wrap">
                    {note?.labels?.map(chosenLabel => <div key={chosenLabel?._id} className="text-sm p-1 pt-1 flex rounded-lg m-1 bg-selected-navitem-light dark:bg-selected-navitem-dark">
                        <span className="self-center">{chosenLabel.labelName}</span>

                    </div>
                    )
                    }
                </div>
            </div>
        </div>

    )
}