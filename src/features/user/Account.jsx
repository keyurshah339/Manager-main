import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SpinLoader } from "../../common/components/Loader";
import { fetchNotesData } from "../notes/notesSlice";
import { PasswordHandler } from "./components/PasswordHandler";
import { ProfileData } from "./components/ProfileDetails";
import { fetchAccount } from "./userSlice";
export function Account() {
    const { account, accountStatus } = useSelector(state => state.user)
    const { authSetupStatus } = useSelector(state => state.auth)
    const { notesFetchstatus } = useSelector(state => state.notes)
    const dispatch = useDispatch()
    useEffect(() => {
        if (accountStatus === "idle" && authSetupStatus) {
            dispatch(fetchAccount())
        }
    }, [accountStatus, authSetupStatus])
    useEffect(() => {
        if (notesFetchstatus === "idle" && authSetupStatus) {
            dispatch(fetchNotesData())
        }

    }, [notesFetchstatus, authSetupStatus])
    return (
        account === null ?
            <div className="mt-40">
                <SpinLoader />
            </div> :
            <div>
                <h1 className="text-palette-yellow text-2xl font-bold m-2">{account.name}</h1>
                <div className="flex flex-col breakpoint-acc:flex-row justify-around  ">
                    <ProfileData account={account} />
                    <PasswordHandler />
                </div>
            </div>

    )
}