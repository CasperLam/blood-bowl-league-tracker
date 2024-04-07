import React from "react";
import "./app.scss";
import { BrowserRouter, Routes } from "react-router-dom";
import Header from "./components/header/header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes></Routes>
    </BrowserRouter>
  );
}

export default App;
