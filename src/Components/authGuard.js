import { Navigate } from "react-router-dom";
import { useDataContext } from "./context";


export default function MyAuth({ children }) {

    const {login} = useDataContext();

     console.log('login',login)


    return login ? children : <Navigate to="/login" replace />;
  }