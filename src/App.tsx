import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./Home";
import { Impersonate } from "./Impersonate";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/impersonate" element={<Impersonate />} />
      </Routes>
    </div>
  );
}

export default App;
