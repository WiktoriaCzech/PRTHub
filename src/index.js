import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./components/login/Login";

import { createBrowserHistory } from "history";
import BaseLayout from "./Layout";
export const history = createBrowserHistory();

function Main() {
  return (
    <BrowserRouter history={history}>
      <Routes>
        <Route path="" element={<Login />}></Route>
        <Route path="/v1/*" element={<BaseLayout />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(Main());
