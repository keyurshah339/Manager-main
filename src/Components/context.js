import { createContext, useContext, useReducer,useState } from "react";

export const DataContext = createContext();
export const useDataContext = () => useContext(DataContext);



export const DataProvider = ({ children }) => {

const [login,setlogin] = useState(false)

return (
  <DataContext.Provider value={{ login,setlogin }}>
    {children}
  </DataContext.Provider>
);
};
