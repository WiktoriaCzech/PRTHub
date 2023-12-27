import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import MainPanel from "./components/main/MainPanel";
import Login from "./components/login/Login";

import { createBrowserHistory } from "history";
import BaseLayout from "./Layout";
export const history = createBrowserHistory();

function Main() {
  return (
    <BrowserRouter history={history}>
      <Routes>
        <Route path="" element={<Login />}></Route>
        <Route path="/central/*" element={<BaseLayout />}></Route>
        {/* <Route path="*" element={<Navigate to="/main" replace />}></Route> */}
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(Main());
