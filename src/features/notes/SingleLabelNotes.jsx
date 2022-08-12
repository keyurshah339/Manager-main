import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router"
import { Link } from "react-router-dom"
import { SpinLoader } from "../../common/components/Loader"
import { EditNote } from "./EditNote"
import { fetchNotesData, removeLabel } from "./notesSlice"
import { ShowNote } from "./ShowNote"
export function SingleLabelNotes() {
    const { allNotes, labels, notesFetchstatus } = useSelector(state => state.notes)
    const { authSetupStatus } = useSelector(state => state.auth)
    const { labelId } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const label = labels?.find(label => label._id === labelId)
    const thisLabelNotes = allNotes?.filter(note => note.labels?.find(label => label._id === labelId))
    async function deleteLabelHandler() {
        await dispatch(removeLabel({ labelId }))
        navigate('/home')

    }
    useEffect(() => {
        if (notesFetchstatus === "idle" && authSetupStatus) {
            dispatch(fetchNotesData())
        }

    }, [notesFetchstatus, authSetupStatus])
    return (
        allNotes === null ?
            <div className="mt-40">
                <SpinLoader />
            </div>

            :
            <div className="flex flex-col ">
                {label &&
                    <div className="flex my-2">
                        <p className="m-2 self-start text-lg font-medium p-2 rounded bg-selected-navitem-light dark:bg-selected-navitem-dark">{label.labelName}</p>
                        <button onClick={deleteLabelHandler} className="ml-auto mr-2 p-2 text-white rounded bg-red-600 font-medium">Delete Label</button>

                    </div>
                }
                {notesFetchstatus === "success" &&
                    <div className="">
                        {thisLabelNotes.length > 0 ?
                            <div className="flex flex-wrap justify-center sm:justify-start">

                                {thisLabelNotes.map(singleLabelNote =>
                                    <div key={singleLabelNote?._id}>
                                        <ShowNote note={singleLabelNote} />
                                    </div>
                                )

                                }
                            </div> :

                            <div className="flex justify-center items-center min-h-[50vh]">

                                {label ? <h1 className="s text-lg font-medium ">No notes in this label</h1> :
                                    <div>
                                        <h1 className="text-lg font-medium text-center">Label not found</h1>
                                        <Link to="/">
                                            <p className="p-4 m-4 bg-selected-navitem-light dark:bg-selected-navitem-dark rounded">Go Back to Homepage</p>
                                        </Link>
                                    </div>

                                }

                            </div>
                        }


                    </div>

                }

                <EditNote />
            </div>
    )
}