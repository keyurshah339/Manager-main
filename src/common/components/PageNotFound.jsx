import React from "react";
import { Link } from "react-router-dom";
import notfound from '../../assets/notfound.svg'
export function PageNotFound() {
    return (
        <div className=" fixed min-h-[100vh] bg-white dark:bg-dark-1 flex flex-col  items-center md:justify-center">
            <img src={notfound} alt="404 not found" className="h-[30%] w-[30%]" />
            <p className="m-4">Page you were looking for is not found</p>
            <Link to="/">
                <p className="p-4 m-4 bg-selected-navitem-light dark:bg-selected-navitem-dark rounded">Go Back to Homepage</p>
            </Link>
        </div>
    );
}