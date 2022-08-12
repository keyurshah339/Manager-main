import React from "react";
import { FiSearch } from "react-icons/fi";
import { Navbar } from "./Navbar/Navbar";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { searchNotes } from "../../features/notes/notesSlice";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const dispatch = useDispatch()
  function searchHandler(e) {
    const searchTitle = e.target.value;
    dispatch(searchNotes({ searchTitle }))
  }
  return (
    <div className="p-2  border-b border-opacity-10 min-w-screen z-50 flex justify-between  sticky top-0 bg-white dark:bg-dark-1">
      <div className="flex justify-between">
        <Navbar />
        <Link to="/home" className="self-center">
          <p className="m-1 self-center text-yellow-main font-bold text-xl">
            Manager
          </p>
        </Link>
      </div>
      <div className="self-center rounded-lg flex p-1 items-center bg-white border dark:border-opacity-0 border-black">
        <div>
          <FiSearch size={28} className=" hidden sm:inline mr-2 dark:text-black  " />
        </div>
        <input
          type="text"
          className="rounded-lg h-9 text-black   outline-none sm:w-[450px] "
          placeholder="Search Notes..."
          onChange={(e) => searchHandler(e)}
        />
      </div>
      <ThemeToggle />
    </div>
  );
}
