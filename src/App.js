import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navbar } from "./Components/Navbar";
import { Home } from "./Components/Home";
import { About } from "./Components/About";
import NoteState from "./Context/NoteState";
import AlertParent from "./Components/AlertParent";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import AlertState from "./Context/AlertState";

function App() {
  return (
    <AlertState>
      <NoteState>
        <Router>
          <Navbar />
          <AlertParent />
          <div className="container">
            <Routes>
              <Route path="/" Component={Home} />
              <Route path="/about" Component={About} />
              <Route path="/login" Component={Login} />
              <Route path="/signup" Component={SignUp} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </AlertState>
  );
}
export default App;
