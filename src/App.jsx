import React from "react";
import "./app.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header/header";
import MyLeagues from "./pages/myLeagues/myLeagues";
import Footer from "./components/footer/footer";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MyLeagues />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
