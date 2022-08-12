/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from "react"
import { BiImageAlt } from "react-icons/bi";
import { GiCancel } from "react-icons/gi";
import { TiDocumentDelete } from 'react-icons/ti'
// import { IoColorPaletteSharp } from "react-icons/io5";
import { RiPushpin2Fill, RiPushpin2Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { LabelModal } from "../../common/components/LabelModal/LabelModal";
import { deleteNote, disableEditModal, removeFromChosenLabels, setUpLabelsInEditComponent, updateNote } from "./notesSlice";
export function EditNote() {
    const { noteToEdit, editNoteModalStatus, chosenLabels, chosenLabelsComponent, updateNoteStatus, updateNoteError } = useSelector(state => state.notes)
    const dispatch = useDispatch()
    const formRef = useRef(null)
    const [noteData, setNoteData] = useState(null)
    const [imageData, setImageData] = useState({
        url: null,
        showStatus: "hidden",
    });
    useEffect(() => {
        if (noteToEdit) {
            dispatch(setUpLabelsInEditComponent({ labels: noteToEdit.labels }))
            if (noteToEdit.image && noteToEdit.image !== "undefined") {
                setImageData({
                    url: noteToEdit.image,
                    showStatus: "block"
                })
            }
            setNoteData({ ...noteData, pinned: noteToEdit.pinned })
        }

    }, [noteToEdit])
    useEffect(() => {
        if (noteToEdit) {
            setNoteData({
                ...noteData, title: noteToEdit.title,
                content: noteToEdit.content,
                pinned: noteToEdit.pinned,
                labels: chosenLabels,
                color: null
            })

        }
    }, [noteToEdit])
    async function updateNoteHandler(e) {
        e.preventDefault()
        setNoteData({ ...noteData, color: "white" })
        let formData = new FormData();
        formData.append("title", noteData.title)
        formData.append("content", noteData.content)
        formData.append("image", noteData.image)
        formData.append("pinned", noteData.pinned)
        formData.append("labels", JSON.stringify(chosenLabels))
        formData.append("color", noteData?.color)
        formData.append("noteId", noteToEdit._id)
        await dispatch(updateNote({ formData }))
        setNoteData(null)
        setImageData({
            url: null,
            showStatus: "hidden",
        })
        dispatch(disableEditModal())
    }
    function fileUploadHandler(e) {
        if (e.target.files && e.target.files[0]) {
            setNoteData({ ...noteData, image: e.target.files[0] })
            var reader = new FileReader();
            reader.onload = function (e) {
                setImageData({
                    ...imageData,
                    showStatus: "block",
                    url: e.target.result,
                });
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    }
    function closeModalHandler(e) {
        e.stopPropagation();
        setImageData({
            url: null,
            showStatus: "hidden",
        })
        dispatch(disableEditModal())
    }
    async function deleteNoteHandler(e) {
        e.preventDefault()
        await dispatch(deleteNote({ noteId: noteToEdit._id }))
        dispatch(disableEditModal())

    }
    return (
        editNoteModalStatus && noteData && <div onClick={(e) => closeModalHandler(e)} className="  fixed top-0 left-0 bottom-0 right-0  bg-dark-1 bg-opacity-50 flex items-center justify-center min-h-screen min-w-screen ">
            <div className={`self-center overflow-y-scroll no-scrollbar   max-h-[80%]  p-2 w-[90%] bg-white dark:bg-dark-1  max-w-[600px] min-h-[152px] rounded-lg  box-shadow-light dark:box-shadow-dark `} onClick={(e) => e.stopPropagation()}>
                {updateNoteError && <p className="text-red-600 font-bold pl-3">Could not update the note!! Your image size might be too big. Try changing the image or simply try again.</p>}
                <div className="flex">
                    <button className=" p-1  rounded-full text-gray-500 dark:text-white hover:text-red-600 dark:hover:text-red-600" onClick={(e) => closeModalHandler(e)}>
                        <GiCancel size={26} />
                    </button>
                    <button onClick={(e) => deleteNoteHandler(e)} className="ml-auto text-red-600 p-2 hover:bg-red-600 hover:bg-opacity-40 rounded-full" title="Delete Note" ><TiDocumentDelete size={28} /></button>
                </div>

                <form ref={formRef} className="flex flex-col p-2 outline-none   " onSubmit={(e) => { e.stopPropagation(); updateNoteHandler(e) }}>

                    <section className="flex mb-1">
                        <input type="text" placeholder="Title" className={`h-[36px] w-full p-2 outline-none bg-white dark:bg-dark-1`} value={noteData.title} onChange={(e) => setNoteData({ ...noteData, title: e.target.value })} required />
                        <button type="button" className="ml-auto" onClick={(e) => { e.preventDefault(); setNoteData({ ...noteData, pinned: !noteData.pinned }) }}>
                            {noteData.pinned ?
                                <RiPushpin2Fill size={28} />
                                :
                                <RiPushpin2Line size={28} />
                            }
                        </button>
                    </section>
                    <textarea placeholder="Take a note..." className={`scrollbar leading-[60px]  p-2 outline-none  bg-white dark:bg-dark-1 dark:text-white `} value={noteData.content} onChange={(e) => setNoteData({ ...noteData, content: e.target.value })} required />

                    <div className={`${imageData.showStatus} `}>
                        <button className="relative top-11 left-1 bg-red-600 bg-opacity-40 rounded p-2 " onClick={(e) => { e.preventDefault(); setImageData({ url: null, showStatus: "hidden" }); setNoteData({ ...noteData, image: null }) }}> <GiCancel size={26} /></button>

                        <img
                            alt="selected file"
                            src={imageData.url}
                            className={`${imageData.showStatus}  self-center mb-4`}
                        />
                    </div>
                    <div className="flex flex-wrap">
                        {chosenLabelsComponent === "editNote" && chosenLabels?.map(chosenLabel => <div key={chosenLabel?._id} className="text-sm p-1 pt-1 flex rounded-lg m-1 bg-selected-navitem-light dark:bg-selected-navitem-dark">
                            <span className="self-center">{chosenLabel.labelName}</span>
                            <button className="text-xs p-2 self-center" onClick={(e) => { e.preventDefault(); e.stopPropagation(); dispatch(removeFromChosenLabels({ removedLabel: chosenLabel })) }}>X</button>
                        </div>)
                        }
                    </div>

                    <section className="p-2 flex w-[50%] justify-between mt-1">
                        {/* <div title="Change color">
                            <IoColorPaletteSharp size={22} />
                            <div className=" relative hidden group-hover:block">
                          
                            <div className="flex absolute border-2 rounded border-selected-navitem-light dark:border-selected-navitem-dark">
                                <div onClick={() => setNoteColor(() => localStorage.getItem("theme") === "dark" ? "black" : "white")} className={`${localStorage.getItem("theme") === "dark" ? "text-black" : "text-white"} border border-black dark:border-white rounded-full w-8 h-8 m-1`}>
                                </div>
                                {noteColors.map(singleColor =>
                                
                                    <div onClick={() => setNoteColor(singleColor)} key={singleColor} className={`bg-${singleColor} border border-black dark:border-white  rounded-full w-8 h-8 m-1`}>
                                    </div>
                        
                                )}
                            </div>
                        </div>

                        </div> */}
                        <LabelModal />


                        <label className="cursor-pointer" title="Choose Image">
                            <BiImageAlt size={22} />
                            <input type="file" id="img"
                                name="img"
                                accept="image/*"
                                className="hidden" onChange={fileUploadHandler} />
                        </label>



                    </section>
                    <div className="flex">
                        {updateNoteStatus === "success" && <p className="text-success-green font-bold">Updated successfully</p>}

                        {updateNoteStatus === "pending" && <p className="text-palette-yellow font-bold">Updating your note...</p>}
                        <input type="submit" value="Edit Note" className="ml-auto bg-selected-navitem-light dark:bg-selected-navitem-dark rounded p-2 cursor-pointer" />

                    </div>
                </form>
            </div>
        </div>

    )
}
