import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updatePassword } from '../userSlice'

export function PasswordHandler() {
    const { updatePasswordStatus, error } = useSelector(state => state.user)
    const [passwordsError, setPasswordsError] = useState({
        status: "hidden"
    })
    const [passwords, setPasswords] = useState({})
    const dispatch = useDispatch()
    function PasswordHandler() {
        if (passwords.newPassword.length < 6) {
            setPasswordsError({
                ...passwordsError,
                message: "Password must be atleast of 6 characters",
                status: "block",
            });
        } else if (passwords.newPassword !== passwords.confirmNewPassword) {
            setPasswordsError({
                ...passwordsError,
                message: "Passwords didn't match",
                status: "block",
            });
        } else if (passwords.newPassword.match("[0-9]+") === null) {
            setPasswordsError({
                ...passwordsError,
                message: "Password must contain a number",
                status: "block",
            });
        } else if (passwords.newPassword.match("(?=.*[A-Z])") === null) {
            setPasswordsError({
                ...passwordsError,
                message: "Password must contain a Capital letter",
                status: "block",
            });
        } else {
            setPasswordsError({ ...passwordsError, status: "hidden" });
            return true;
        }
    }
    function PasswordResetHandler(event) {
        event.preventDefault()
        const passwordAllowed = PasswordHandler()
        if (passwordAllowed) {
            dispatch(updatePassword({ oldPassword: passwords.currentPassword, newPassword: passwords.newPassword }))

        }

    }
    return (
        <form
            onSubmit={(event) => PasswordResetHandler(event)}
        >
            <div className="border-4 p-2 theme-color-border flex flex-col justify-between m-4 sm:m-8 breakpoint-acc:m-4  breakpoint-acc:w-[40vw] rounded  breakpoint-acc:my-8">
                <p className="font-bold text-lg">Reset Password</p>
                <p className={`${passwordsError.status} text-red-600 font-bold`}>{passwordsError.message}</p>
                {error ?
                    <p className="text-red-600 font-bold">{error}</p> :
                    <p className="text-success-green font-bold">{updatePasswordStatus}</p>
                }

                <div className=" ">
                    <div className="flex flex-col">
                        <label className="font-bold" htmlFor="currentPassword">
                            Current Password
                        </label>
                        <input
                            name="currentPassword"
                            type="password"
                            className="input-box"
                            required
                            onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="font-bold" htmlFor="newPassword">
                            New Password
                        </label>
                        <input
                            name="newPassword"
                            type="password"
                            className="input-box "
                            required
                            onChange={(e) =>
                                setPasswords({ ...passwords, newPassword: e.target.value })
                            }
                        />
                    </div>
                </div>

                <div className="flex flex-col">
                    <label className="font-bold" htmlFor="confirmPassword">
                        Confirm New Password
                    </label>
                    <input
                        name="confirmPassword"
                        type="password"
                        className="input-box"
                        required
                        onChange={(e) =>
                            setPasswords({ ...passwords, confirmNewPassword: e.target.value })
                        }
                    />
                </div>
                <button type="submit" className="my-2 p-4 selected self-start rounded ">
                    UPDATE PASSWORD
                </button>
            </div>
        </form>
    )
}