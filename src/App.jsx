import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Header } from "./common/components/Header";
import { Homepage } from "./common/components/Homepage";
import { Landing } from "./common/components/Landing";
import { PageNotFound } from "./common/components/PageNotFound";
import { ThemeToggle } from "./common/components/ThemeToggle";
import { setAuthSetup } from "./features/auth/authSlice";
import { Login } from "./features/auth/login/Login";
import { Signup } from "./features/auth/signup/Signup";
import { disableNavbar } from "./features/notes/notesSlice";
import { SingleLabelNotes } from "./features/notes/SingleLabelNotes";
import { Account } from "./features/user/Account";
import { setupAuthExceptionHandler, setUpAuthHeaderForServiceCalls } from "./services/users";
const App = () => {
  const { authorized } = useSelector(state => state.auth)
  const { navbar } = useSelector(state => state.notes)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    setupAuthExceptionHandler(dispatch, navigate);
    setUpAuthHeaderForServiceCalls(localStorage.getItem("token"));
    dispatch(setAuthSetup());
  }, [dispatch, navigate]);

  return (
    <main className="text-black dark:text-white min-h-screen" onClick={() => {
      if (navbar) dispatch(disableNavbar())
    }}>
      {!authorized ? (
        <div className="p-2  flex min-w-screen h-9">
          <div className="ml-auto">
            <ThemeToggle />
          </div>

        </div>)
        : (
          <Header />
        )}

      <Routes>
        <Route path="/" element={authorized ? <Homepage /> : <Landing />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/login" element={authorized ? <Homepage /> : <Login />} />
        <Route path="/signup" element={authorized ? <Homepage /> : <Signup />} />
        <Route path="/account" element={<Account />} />
        <Route path="/label/:labelId" element={<SingleLabelNotes />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </main>
  );
};

export default App;
