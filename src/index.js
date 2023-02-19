import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  BrowserRouter, Route, Routes, Navigate,
} from "react-router-dom";
import MainPanel from "./components/main/MainPanel";
import Login from "./components/login/Login";

import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();


function App() {
  return(
      <BrowserRouter history={history}>
        <Routes>
          <Route path='/main' element={ <MainPanel/> }></Route>
          <Route path='/login' element={ <Login/> }></Route>
          <Route path='*' element={<Navigate to='/main' replace />}></Route>
        </Routes>
      </BrowserRouter>
  )
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 App()
);

