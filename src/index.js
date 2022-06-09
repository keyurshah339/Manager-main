import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { DataProvider } from "./Components/context"


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <DataProvider>
    <App />
    </DataProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
