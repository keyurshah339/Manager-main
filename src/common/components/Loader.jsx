import React from 'react'
import Loader from "react-loader-spinner";

export function SpinLoader() {
    return (
        <div className="flex items-center justify-center">
            <Loader type="Puff"
                color="#6b7280"
                height={50}
                width={50}
            />
        </div>

    )
}