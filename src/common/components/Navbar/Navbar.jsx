import React from "react";
import "../Navbar/Navbar.css";
import { FiMenu } from "react-icons/fi";
import { AiOutlineHome } from 'react-icons/ai'
import { ImCancelCircle } from "react-icons/im";
import { VscAccount } from 'react-icons/vsc'
import { BiLogOut } from 'react-icons/bi'
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeAuth } from "../../../features/auth/authSlice";
import { MdLabelOutline } from "react-icons/md";
import { disableNavbar, navbarStatus, resetNotes } from "../../../features/notes/notesSlice";
import { resetUser } from "../../../features/user/userSlice";
export function Navbar() {
  const { authorized } = useSelector(state => state.auth)
  const { labels, navbar } = useSelector(state => state.notes)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  async function logoutHandler() {
    localStorage.removeItem("userId")
    localStorage.removeItem("token")
    dispatch(removeAuth())
    dispatch(resetNotes())
    dispatch(resetUser())
    navigate('/', { replace: true })
  }
  return (
    <div className="self-center mt-2">
      <button onClick={() => dispatch(navbarStatus({ navbar }))}>
        <FiMenu size={28} />
      </button>
      <nav
        className={`overflow-y-auto nav-menu bg-white dark:bg-dark-1 border-r border-selected-navitem-light dark:border-selected-navitem-dark fixed no-scrollbar ${navbar ? "active" : ""}`}
      >
        <ul
          className="w-full flex flex-col "
        // onClick={() => dispatch(navbarStatus({ navbar }))}
        >
          <li className="rounded-full  hover:bg-navitem-hover dark:hover:bg-opacity-5 self-end  m-2">
            {" "}
            <button onClick={() => dispatch(disableNavbar())} className="m-2 p-2 ">
              <ImCancelCircle size={18} />
            </button>
          </li>
          <NavLink
            to="/home"
            className="nav-item nav-item-theme"
            activeClassName="selected"
          >
            <li className="flex">
              <AiOutlineHome size={22} />
              <p className="ml-2">Home</p>
            </li>

          </NavLink>
          {labels?.map(label =>
            <NavLink to={`/label/${label._id}`} key={label._id}
              className="nav-item nav-item-theme  "
              activeClassName="label-selected">
              <div className="flex">
                < MdLabelOutline size={22} />
                <p className="truncate ml-2">{label.labelName}</p>
              </div>


            </NavLink>

          )}
          <NavLink to="/account" className="nav-item nav-item-theme"
            activeClassName="selected">
            <li className="flex">
              <VscAccount size={22} />
              <p className="ml-2">Account</p>
            </li>
          </NavLink>

          {authorized && <li className="nav-item nav-item-theme flex" onClick={() => logoutHandler()}>
            <BiLogOut size={22} />
            <p className="ml-2">
              Logout
            </p>
          </li>}
        </ul>
      </nav>
    </div>
  );
}
