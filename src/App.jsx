import React from "react";
import "./app.scss";
import { BrowserRouter, Routes } from "react-router-dom";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes></Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
