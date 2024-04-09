import React from "react";
import "./app.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header/header";
import MyLeaguesPage from "./pages/myLeaguesPage/myLeaguesPage";
import Footer from "./components/footer/footer";
import LeagueTablePage from "./pages/leagueTablePage/leagueTablePage";
import TeamDetailsPage from "./pages/teamDetailsPage/teamDetailsPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MyLeaguesPage />} />
        <Route path="/league-table/:league_id" element={<LeagueTablePage />} />
        <Route path="/team-details" element={<TeamDetailsPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
