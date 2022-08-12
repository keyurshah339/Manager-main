/* eslint-disable react/prop-types */
import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateAccount } from "../userSlice"
export function ProfileData({ account }) {
    const dispatch = useDispatch()
    const { updateAccountStatus, updateAccountError } = useSelector(state => state.user)
    const [newAccountDetails, setNewAccountDetails] = useState({
        newName: account?.name,
        newUsername: account?.username,
        newEmail: account?.email
    })

    function AccountUpdateHandler(event) {
        event.preventDefault()
        dispatch(updateAccount(newAccountDetails))

    }
    return (
        !account ? <h1>loading</h1> :
            <form
                onSubmit={(event) => AccountUpdateHandler(event)}
            >

                <div className="border-4 p-2 theme-color-border flex flex-col justify-between m-4 sm:m-8 breakpoint-acc:m-4  breakpoint-acc:w-[40vw] rounded  breakpoint-acc:my-8">
                    <p className="font-bold text-left text-lg">Account</p>
                    {updateAccountStatus !== "idle" && <p className="font-bold text-success-green ">{updateAccountStatus}</p>}
                    {<p className="font-bold text-red-600">{updateAccountError}</p>}
                    <section className="flex flex-col ">
                        <label className="text-left font-bold" htmlFor="name">
                            Name
                        </label>
                        <input
                            onChange={(e) => setNewAccountDetails({ ...newAccountDetails, newName: e.target.value })}
                            name="name"
                            type="name"
                            className="input-box"
                            placeholder="name"
                            value={newAccountDetails.newName}
                            required
                            autoComplete="off"
                        />
                    </section>
                    <section className="flex flex-col ">
                        <label className="text-left font-bold" htmlFor="username">
                            Username
                        </label>
                        <input
                            onChange={(e) => setNewAccountDetails({ ...newAccountDetails, newUsername: e.target.value })}
                            name="username"
                            type="username"
                            className="input-box"
                            placeholder="username"
                            required
                            value={newAccountDetails.newUsername}
                            autoComplete="off"
                        />
                    </section>
                    <section className="flex flex-col ">
                        <label className="text-left font-bold" htmlFor="email">
                            Email
                        </label>
                        <input
                            onChange={(e) => setNewAccountDetails({ ...newAccountDetails, newEmail: e.target.value })}
                            name="email"
                            type="email"
                            className="input-box"
                            placeholder="email"
                            required
                            value={newAccountDetails.newEmail}
                            autoComplete="off"

                        />
                    </section>
                    <button type="submit" className=" my-2 p-4 w-44 selected self-start rounded">
                        UPDATE
                    </button>
                </div>
            </form >
    )
}