import React, { useEffect, useRef, useState } from "react"
import { RiPushpin2Line } from 'react-icons/ri'
// import { IoColorPaletteSharp } from 'react-icons/io5'
import { BiImageAlt } from 'react-icons/bi'
import { RiPushpin2Fill } from 'react-icons/ri'
import { LabelModal } from "../../common/components/LabelModal/LabelModal"
import { useDispatch, useSelector } from "react-redux"
import { addNote, removeFromChosenLabels, resetChosenLabels, resetStatus } from "./notesSlice"
import { GiCancel } from "react-icons/gi"
// export function ColorPallate() {
//     const noteColors = ["white", "palette-yellow", "palette-blue", "palette-red", "palette-purple"]
//     return (



//     )
// }
export function CreateNote() {
    const { error, status } = useSelector(state => state.notes)
    const [pinned, setPinned] = useState(false)
    const { chosenLabels, chosenLabelsComponent } = useSelector(state => state.notes)
    const [noteData, setNoteData] = useState({
        title: null,
        content: null,
        image: null,
        pinned,
        labels: [],
        color: null
    })
    const [image, setImage] = useState(null)
    const [imageData, setImageData] = useState({
        url: null,
        showStatus: "hidden",
    });
    const dispatch = useDispatch()
    const imageRef = useRef(null)
    const formRef = useRef(null)
    // const [palatte, setPalatte] = useState(false)
    // const [noteColor, setNoteColor] = useState("white")
    // const noteColors = ["palette-blue", "palette-yellow", "palette-red", "palette-purple"]
    async function submitNote(e) {
        e.preventDefault()
        setNoteData({ ...noteData, color: "white" })
        let formData = new FormData();
        formData.append("title", noteData.title)
        formData.append("content", noteData.content)
        formData.append("image", image)
        formData.append("pinned", pinned)
        formData.append("labels", JSON.stringify(chosenLabels))
        formData.append("color", noteData?.color)
        await dispatch(addNote({ formData }))
    }
    useEffect(() => {
        if (status === "success") {
            formRef.current.reset()
            setImageData({ url: null, showStatus: "hidden" })
            setImage(null)
            setPinned(false)
            dispatch(resetChosenLabels())
        }
    }, [status])
    useEffect(() => {
        if (status === "success") {
            setTimeout(() => dispatch(resetStatus()), 3000)
        }
    }, [status])
    function fileUploadHandler(e) {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0])
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
    return (
        // dark:bg-${noteColor === ("white" || "off-white") ? "dark-1" : noteColor}
        <div className={`self-center m-8 p-2 w-[90%] bg-white dark:bg-dark-1  max-w-[600px] min-h-[152px] rounded-lg  box-shadow-light dark:box-shadow-dark `}>
            {error && <p className="text-red-600 font-bold pl-3">Could not save the note!! Your image size might be too big. Try changing the image or simply try again.</p>}
            <form ref={formRef} className="flex flex-col p-2 outline-none  " onSubmit={(e) => submitNote(e)}>
                <section className="flex mb-1">
                    <input type="text" placeholder="Title" className={`h-[36px] w-full p-2 outline-none bg-white dark:bg-dark-1`} onChange={(e) => setNoteData({ ...noteData, title: e.target.value })} required />
                    <button type="button" className="ml-auto" onClick={() => setPinned(!pinned)}>
                        {pinned ?
                            <RiPushpin2Fill size={28} />
                            :
                            <RiPushpin2Line size={28} />
                        }
                    </button>
                </section>
                <textarea type="text" placeholder="Take a note..." className={`scrollbar leading-[40px] p-2 outline-none  bg-white dark:bg-dark-1 dark:text-white `} onChange={(e) => setNoteData({ ...noteData, content: e.target.value })} required />


                <div className={`${imageData.showStatus} `}>
                    <button className="relative top-11 left-1 bg-red-600 bg-opacity-40 rounded p-2 " onClick={(e) => { e.preventDefault(); setImageData({ url: null, showStatus: "hidden" }); setImage(null) }}> <GiCancel size={26} /></button>

                    <img
                        ref={imageRef}
                        alt="selected file"
                        src={imageData.url}
                        className={`${imageData.showStatus}  self-center mb-4`}
                    />
                </div>
                <div className="flex flex-wrap">
                    {chosenLabelsComponent === "createNote" && chosenLabels?.map(chosenLabel => <div key={chosenLabel?._id} className="text-sm p-1 pt-1 flex rounded-lg m-1 bg-selected-navitem-light dark:bg-selected-navitem-dark">
                        <span className="self-center">{chosenLabel.labelName}</span>
                        <button className="text-xs p-2 self-center" onClick={(e) => { e.preventDefault(); dispatch(removeFromChosenLabels({ removedLabel: chosenLabel })) }}>X</button>
                    </div>)
                    }
                </div>

                <section className="p-2 flex w-[50%] justify-between mt-1">
                    {/* <div title="Change color" className="group" >
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

                    {/* <button title="Add Label">
                        <MdLabel size={22} />
                    </button> */}
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
                    {status === "success" && <p className="text-success-green font-bold">Note saved successfully</p>}

                    {status === "pending" && <p className="text-palette-yellow font-bold">Please wait while we save your note...</p>}
                    <input type="submit" value="Add Note" className="ml-auto bg-selected-navitem-light dark:bg-selected-navitem-dark rounded p-2 cursor-pointer" />

                </div>
            </form>
        </div>
    )
}